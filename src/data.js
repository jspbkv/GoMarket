import { createClient } from "@supabase/supabase-js";

export const CATEGORIES = [
  "Электроника",
  "Дом и интерьер",
  "Одежда и обувь",
  "Хобби и спорт",
  "Транспорт",
  "Детские товары",
  "Книги",
  "Другое",
];

export const REGIONS = [
  { name: "Баткенская область", cities: ["Баткен", "Кызыл-Кыя", "Сүлүктү", "Раззаков", "Айдаркен", "Баткен"] },
  { name: "Джалал-Абадская область", cities: ["Джалал-Абад", "Таш-Көмүр", "Кара-Көл", "Кочкор-Ата", "Базар-Коргон", "Кербен", "Көк-Жаңгак", "Майлуу-Суу", "Токтогул"] },
  { name: "Иссык-Кульская область", cities: ["Каракол", "Балыкчы", "Чолпон-Ата"] },
  { name: "Нарынская область", cities: ["Нарын"] },
  { name: "Ошская область", cities: ["Кара-Суу", "Өзгөн", "Ноокат"] },
  { name: "Таласская область", cities: ["Талас"] },
  { name: "Чуйская область", cities: ["Токмок", "Кара-Балта", "Кант", "Кайыңды", "Кемин", "Орловка", "Шопоков"] },
  { name: "Бишкек", cities: ["Бишкек"] }, 
];

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

function requireSupabase() {
  if (!supabase) {
    throw new Error("Технические ошибки, перепроверьте данные затем перезапустите сервер.");
  }
  return supabase;
}

const fromListingRow = (row) => ({
  ...row,
  sellerName: row.seller_name,
  sellerPhone: row.seller_phone,
  imageUrls: Array.isArray(row.image_urls) && row.image_urls.length ? row.image_urls : row.image_url ? [row.image_url] : [],
  imageUrl: row.image_urls?.[0] || row.image_url || "",
  exchange: row.exchange,
  createdAt: row.created_at,
  userId: row.user_id,
});
const toListingRow = (row, userId) => ({
  id: row.id,
  title: row.title,
  category: row.category,
  price: Number(row.price),
  region: row.region,
  city: row.city,
  description: row.description,
  seller_name: row.sellerName,
  seller_phone: row.sellerPhone,
  exchange: row.exchange,
  image_url: row.imageUrl || "",
  image_urls: row.imageUrls || (row.imageUrl ? [row.imageUrl] : []),
  user_id: userId,
});
const fromAdRow = (row) => ({ ...row, imageUrl: row.image_url || "", userId: row.user_id, createdAt: row.created_at });

async function uploadImage(dataUrl, userId) {
  if (!dataUrl?.startsWith("data:image/")) return dataUrl || "";
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const path = `${userId}/${crypto.randomUUID()}.${blob.type.split("/")[1].replace("jpeg", "jpg")}`;
  const { error } = await supabase.storage.from("listing-images").upload(path, blob, { contentType: blob.type, upsert: false });
  if (error) throw error;
  return supabase.storage.from("listing-images").getPublicUrl(path).data.publicUrl;
}

export const data = {
  async initialize() {
    const client = requireSupabase();
    const [{ data: authData, error: authError }, listingsResponse, adsResponse] = await Promise.all([
      client.auth.getSession(),
      client.from("listings").select("*").order("created_at", { ascending: false }),
      client.from("ads").select("*").order("created_at", { ascending: false }),
    ]);
    if (authError) throw authError;
    if (listingsResponse.error) throw listingsResponse.error;
    if (adsResponse.error) throw adsResponse.error;
    const user = authData.session?.user ?? null;
    let favorites = [];
    if (user) {
      const { data: favoriteRows, error: favoriteError } = await client
        .from("favorites")
        .select("listing_id")
        .eq("user_id", user.id);
      if (favoriteError) throw favoriteError;
      favorites = favoriteRows.map((row) => row.listing_id);
    }
    return {
      user,
      listings: listingsResponse.data.map(fromListingRow),
      ads: adsResponse.data.map(fromAdRow),
      favorites,
    };
  },

  async setFavorite(listingId, user, shouldFavorite) {
    if (!user) throw new Error("Войдите, чтобы сохранять избранное.");
    const client = requireSupabase();
    if (shouldFavorite) {
      const { error } = await client.from("favorites").upsert(
        { user_id: user.id, listing_id: listingId },
        { onConflict: "user_id,listing_id", ignoreDuplicates: true },
      );
      if (error) throw error;
    } else {
      const { error } = await client.from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("listing_id", listingId);
      if (error) throw error;
    }
    return shouldFavorite;
  },

  onAuthChange(callback) {
    if (!supabase) return () => {};
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => callback(session?.user ?? null));
    return () => subscription.subscription.unsubscribe();
  },

  async signInWithGoogle() {
    const { error } = await requireSupabase().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
  },

  async signOut() {
    const { error } = await requireSupabase().auth.signOut();
    if (error) throw error;
  },

  async saveListing(listing, user) {
    if (!user) throw new Error("Войдите, чтобы опубликовать товар.");
    const client = requireSupabase();
    const imageUrls = await Promise.all((listing.imageUrls || []).slice(0, 3).map((image) => uploadImage(image, user.id)));
    const row = toListingRow({ ...listing, imageUrls, imageUrl: imageUrls[0] || "" }, user.id);
    const { data: saved, error } = await client.from("listings").upsert(row).select().single();
    if (error) throw error;
    return fromListingRow(saved);
  },

  async deleteListing(id) {
    const { error } = await requireSupabase().from("listings").delete().eq("id", id);
    if (error) throw error;
  },

  async updateListingStatus(id, status) {
    if (!["active", "sold", "hidden"].includes(status)) {
      throw new Error("Недопустимый статус объявления.");
    }
    const { data: updated, error } = await requireSupabase()
      .from("listings")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return fromListingRow(updated);
  },

  async saveAd(ad, user) {
    if (!user) throw new Error("Войдите, чтобы опубликовать рекламу.");
    const client = requireSupabase();
    const imageUrl = await uploadImage(ad.imageUrl, user.id);
    const row = {
      id: ad.id,
      title: ad.title,
      description: ad.description,
      city: ad.city,
      contact: ad.contact,
      url: ad.url || null,
      image_url: imageUrl,
      user_id: user.id,
    };
    const { data: saved, error } = await client.from("ads").upsert(row).select().single();
    if (error) throw error;
    return fromAdRow(saved);
  },

  async deleteAd(id) {
    const { error } = await requireSupabase().from("ads").delete().eq("id", id);
    if (error) throw error;
  },

  async report(contentType, contentId) {
    const { data: result, error } = await requireSupabase().rpc("report_content", {
      p_content_type: contentType,
      p_content_id: contentId,
    });
    if (error) throw error;
    return result;
  },
};
