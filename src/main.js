import { CATEGORIES, REGIONS, data, isSupabaseConfigured } from "./data.js";
import "./style.css";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const elements = {
  auth: $("#auth-button"),
  authDialog: $("#auth-dialog"),
  profileDialog: $("#profile-dialog"),
  profileContent: $("#profile-content"),
  listingDialog: $("#listing-dialog"),
  detailDialog: $("#detail-dialog"),
  adDialog: $("#ad-dialog"),
  listingForm: $("#listing-form"),
  adForm: $("#ad-form"),
  grid: $("#listing-grid"),
  adGrid: $("#ad-grid"),
  count: $("#results-count"),
  empty: $("#empty-state"),
  adEmpty: $("#ad-empty"),
  loadMore: $("#load-more"),
  region: $("#region-filter"),
  city: $("#city-filter"),
  listingRegion: $("#listing-region"),
  listingCity: $("#listing-city"),
  search: $("#search-input"),
  profileButton: $("#profile-button"),
};

const categoryVisuals = {
  "Электроника": ["⌁", "visual-electronics"],
  "Дом и интерьер": ["⌂", "visual-home"],
  "Одежда и обувь": ["◒", "visual-style"],
  "Хобби и спорт": ["✳", "visual-sport"],
  "Транспорт": ["↗", "visual-transport"],
  "Детские товары": ["♡", "visual-kids"],
  "Книги": ["▤", "visual-books"],
  "Другое": ["✦", "visual-other"],
};

const translations = {
  en: {
    "Для бизнеса": "For business", "Мои объявления": "My listings", "Войти": "Sign in", "Разместить": "Post item",
    "Открыть меню": "Open menu", "Закрыть меню": "Close menu",
    "Что ищете?": "What are you looking for?", "СВОИМ — О СВОЁМ": "GOOD THINGS, CLOSE BY",
    "Вещи находят<br>новых <strong>людей.</strong>": "Good things<br>find <strong>new people.</strong>",
    "Покупайте, продавайте и обменивайтесь рядом.<br> Просто, по-человечески, по всему Кыргызстану.": "Buy, sell and trade nearby.<br> Simple, local, all across Kyrgyzstan.",
    "Найти что-то своё": "Find your next thing", "Новые<br>истории<br>старых вещей": "New stories<br>for old things",
    "РАЗМЕЩЕНИЕ<br><b>БЕСПЛАТНО</b><span>для первых пользователей</span>": "POSTING<br><b>IS FREE</b><span>for early users</span>",
    "ЛИСТАЙТЕ НИЖЕ": "SCROLL TO EXPLORE", "Покупка напрямую": "Buy directly",
    "Оплата при встрече": "Pay in person", "Обмен — по договорённости": "Trade by arrangement",
    "Объявления рядом": "Local listings", "ВАША СЛЕДУЮЩАЯ НАХОДКА": "YOUR NEXT GREAT FIND",
    "Ищем и находим": "Find something good", "находок": "items", "находка": "item",
    "ВАШИ ОБЪЯВЛЕНИЯ": "YOUR LISTINGS", "ФИЛЬТРЫ": "FILTERS", "Фильтры": "Filters",
    "Сортировка": "Sort by", "Сначала новые": "Newest first", "Сначала дешевле": "Price: low to high",
    "Сначала дороже": "Price: high to low", "Сбросить": "Reset",
    "Категория": "Category", "Все товары": "All items", "Область": "Region or city",
    "Весь Кыргызстан": "All Kyrgyzstan", "Город": "City", "Все города": "All cities", "Цена, сом": "Price, som",
    "От": "From", "До": "To", "Можно обменять": "Open to trade", "Есть вариант обмена": "Exchange considered",
    "Безопасная сделка": "Stay safe", "Встречайтесь лично и проверяйте товар. Оплата — напрямую продавцу.": "Meet in person and check the item. Pay the seller directly.",
    "На данный момент ничего не найдено": "Nothing found at the moment", "Пока ничего не нашлось": "Nothing found yet", "Пока нет ваших объявлений": "No listings from you yet",
    "Попробуйте изменить фильтры или станьте первым, кто разместит такое объявление.": "Try changing the filters or be the first to post an item like this.",
    "Войдите и разместите товар — ваши публикации появятся здесь.": "Sign in and post an item to see it here.",
    "Разместить товар": "Post an item", "Показать ещё": "Show more", "ХОРОШАЯ ИДЕЯ ДЛЯ БИЗНЕСА": "A GOOD IDEA FOR YOUR BUSINESS",
    "Пусть о вас<br>узнают рядом<span class=\"heading-period\">.</span>": "Let nearby people<br>know about you<span class=\"heading-period\">.</span>",
    "У вас есть дело, которое хочется показать? Разместите рекламную публикацию бесплатно и расскажите о себе людям по соседству.": "Have a business to share? Post a free local ad and introduce yourself to the community.",
    "Добавить рекламу": "Post an ad", "РЕКЛАМА ОТ МЕСТНЫХ": "LOCAL ADVERTISING",
    "ПУБЛИКАЦИИ СООБЩЕСТВА": "COMMUNITY POSTS", "Реклама помечена. Публикации размещают сами авторы.": "Ads are labelled and posted by their owners.",
    "Правила размещения": "Posting guidelines", "Правила сайта": "Site rules",
    "Данные и конфиденциальность": "Data and privacy",
    "Площадка для вещей, которые нужны друг другу.": "A place for things to find their next home.",
    "Dev by jspbkv": "Dev by jspbkv",
    "Объявление": "LISTING", "Новая находка": "New listing", "Что продаёте?": "What are you selling?",
    "Например, плёночный фотоаппарат": "e.g. Film camera", "Цена, сом": "Price, som", "Выберите категорию": "Choose a category",
    "Выберите область": "Choose a region", "Выберите город": "Choose a city", "Расскажите о вещи": "Tell us about the item",
    "Опишите товар, комплектацию и детали…": "Describe the item, what's included and other details…", "Как к вам обращаться?": "Your name",
    "Имя продавца": "Seller name", "Телефон для связи": "Contact phone", "Добавить фотографию": "Add a photo",
    "Рассмотрю обмен": "Open to trade", "Условия можно обсудить напрямую": "Discuss terms directly with the buyer",
    "Оплата проходит напрямую между вами и покупателем — вне GoMarket.": "Payment is handled directly between you and the buyer, outside GoMarket.",
    "Отмена": "Cancel", "Опубликовать": "Publish", "СООБЩИТЕ О СВОЁМ ДЕЛЕ": "TELL PEOPLE ABOUT YOUR BUSINESS",
    "Новая публикация": "New post", "Заголовок": "Title", "Чем вы занимаетесь?": "What do you do?",
    "Коротко расскажите о себе и вашем предложении": "Briefly describe your business and offer",
    "Контакт": "Contact", "Ссылка (необязательно)": "Link (optional)",
    "Реклама бесплатна на старте и публикуется без предварительной проверки. Не публикуйте личные данные других людей.": "Ads are free at launch and published without pre-screening. Never share someone else's personal information.",
    "РАДЫ ВАС ВИДЕТЬ": "WELCOME BACK", "Всё начинается<br />с приветствия.": "Good to<br />see you again.",
    "Войдите, чтобы публиковать свои товары и объявления.": "Sign in to post items and local ads.",
    "Продолжить с Google": "Continue with Google",
    "ПРОСТО И ЧЕСТНО": "CLEAR AND FAIR", "Правила рекламы": "Advertising guidelines",
    "Публикации и баннеры размещаются авторами самостоятельно и бесплатно на старте GoMarket. Публикация помечается «Реклама» и может быть скрыта другими пользователями.": "GoMarket ads are self-published and free at launch. Every post is labelled as advertising and users can report it.",
    "Рассказывайте только о собственном бизнесе и предложении.": "Only promote your own business and offers.",
    "Не размещайте обманные, незаконные или вводящие в заблуждение публикации.": "Do not post deceptive, illegal or misleading content.",
    "Не публикуйте персональные данные без согласия.": "Do not share personal information without consent.",
    "Пожаловаться можно прямо на публикацию. Повторные жалобы скрывают её до проверки.": "Report a post directly. Multiple reports hide it until it can be reviewed.",
    "Информация о GoMarket": "About GoMarket", "Правила сайта": "Site rules",
    "ПРОСТО И ЧЕСТНО": "CLEAR AND FAIR", "ДАННЫЕ И КОНФИДЕНЦИАЛЬНОСТЬ": "DATA AND PRIVACY",
    "ПРОЗРАЧНО О ДАННЫХ": "HOW YOUR DATA IS USED",
    "GoMarket помогает людям находить покупателей и продавцов товаров в Кыргызстане.": "GoMarket helps people in Kyrgyzstan find buyers and sellers for goods. Listings are for products, not services.",
    "Публикуйте точные описания и фотографии товара, которым вы вправе распоряжаться.": "Post accurate descriptions and photos of items you are entitled to sell.",
    "Не размещайте незаконные товары, мошеннические предложения, чужие персональные данные или вводящий в заблуждение контент.": "Do not post illegal goods, scams, other people's personal data, or misleading content.",
    "Обмен — только по договорённости пользователей. GoMarket не участвует в переговорах и не принимает оплату.": "Exchanges are arranged directly by users. GoMarket does not negotiate or process payments.",
    "Проверяйте товар и договаривайтесь о безопасной встрече. Не переводите деньги незнакомым людям заранее.": "Inspect items and arrange safe in-person meetings. Do not send money to strangers in advance.",
    "Жалобы помогают автоматически скрывать публикации.": "Reports can automatically hide posts. The platform currently has no manual review or appeal interface.",
    "UPD 08.11.2026": "These rules are an informational draft and must be reviewed and completed by the platform operator before public launch.",
    "Система тщательно проверяет подозрительные действия и блокирует пользователя автоматически.": "This describes the current GoMarket implementation; it is not an approved legal privacy policy.",
    "При входе Google и Supabase обрабатывают данные аккаунта. Приложение использует идентификатор пользователя и доступные данные профиля.": "Google and Supabase process account data during sign-in. The app uses your user ID and available profile information.",
    "Имя, телефон, описание, цена, город и фотографии товара, а также контакты и ссылки рекламы доступны посетителям сайта. Изображения хранятся в публичном хранилище.": "Your name, phone, item details, price, city, photos, and ad contact details and links are visible to site visitors. Images are stored in public storage.",
    "Избранное доступно только владельцу аккаунта. Жалобы связаны с аккаунтом и публикацией; три уникальные жалобы автоматически скрывают материал. Ручная модерация и апелляции пока не реализованы.": "Favorites are private to your account. Reports are associated with your account and the reported post; three unique reports hide it automatically. Manual moderation and appeals are not yet available.",
    "Язык и тема сохраняются локально в браузере. GoMarket не принимает оплату и не управляет сделками между пользователями.": "Language and theme preferences are stored locally in your browser. GoMarket does not process payments or manage user transactions.",
    "Свои публикации можно редактировать и удалять. Самостоятельное удаление аккаунта и запросов на удаление данных в интерфейсе пока не предусмотрено.": "You can edit or delete your own posts. The interface does not yet support account deletion or data-removal requests.",
    "UPD 08.11.2026": "Before public launch, identify the platform operator and a contact for requests, set retention and deletion procedures, and have this document reviewed by a qualified professional.",
    "Только что": "Just now", "Договорная": "Negotiable", "Обновить": "Refresh",
    "РЕКЛАМА": "ADVERT", "Позвонить": "Call", "Сайт": "Website", "Пожаловаться": "Report",
    "ОБМЕН": "TRADE", "Можно обменять": "Open to trade", "Электроника": "Electronics",
    "Войти через Google": "Sign in with Google",
    "Публикация бесплатна": "Posting is free", "Изменить объявление": "Edit listing",
    "Сохранится текущая фотография или выберите новую": "Current photo is saved; choose another to replace it",
    "Автор объявления": "Posted by", "Оплата напрямую продавцу при личной встрече. GoMarket не принимает платежи.": "Pay the seller directly when you meet. GoMarket does not process payments.",
    "Встречайтесь лично и проверяйте товар. Оплата — напрямую продавцу.": "Meet in person and check the item. Pay the seller directly.",
    "Связаться с продавцом": "Contact seller", "Изменить объявление": "Edit listing", "Удалить": "Delete",
    "Объявление удалено": "Listing deleted",
    "Объявление обновлено": "Listing updated", "Ваш товар опубликован": "Your listing is live",
    "Активно": "Active", "Продано": "Sold", "Скрыто": "Hidden", "Статус объявления": "Listing status",
    "Статус товара обновлён": "Listing status updated", "Не удалось изменить статус товара.": "Could not update listing status.",
    "Связь скрыта, пока товар не активен.": "Contact details are hidden while this listing is inactive.",
    "Этот товар уже продан.": "This item has been sold.",
    "Все мои товары": "All my listings", "Активные": "Active", "Вернуться к каталогу": "Back to marketplace",
    "Добавить товар": "Post an item", "Пока нет ваших объявлений": "No listings from you yet",
    "Можно изменять только свои объявления.": "You can only change the status of your own listings.",
    "Ваша публикация появилась в ленте": "Your post is live", "Публикация удалена": "Post deleted",
    "Можно удалять только свои объявления.": "You can only delete your own listings.",
    "Можно удалять только свои публикации.": "You can only delete your own posts.",
    "Вы уже отправили жалобу на эту публикацию.": "You already reported this post.",
    "Публикация скрыта после жалоб": "The post was hidden after multiple reports.",
    "Жалоба отправлена. Спасибо за сигнал.": "Report submitted. Thanks for letting us know.",
    "Не удалось загрузить данные. Проверьте подключение.": "Could not load data. Check your connection.",
    "Не удалось опубликовать объявление.": "Could not publish the post.",
    "Не удалось удалить объявление.": "Could not delete the listing.",
    "Не удалось удалить публикацию.": "Could not delete the post.",
    "Не удалось отправить жалобу.": "Could not submit the report.",
    "Не удалось войти через Google.": "Could not sign in with Google.",
    "Не удалось выйти из аккаунта.": "Could not sign out.",
    "Вы вышли из аккаунта": "You have signed out.",
    "Публикуем…": "Publishing…",
    "Все для безопасности наших клиентов.<br />Покупки и оплата всегда происходят напрямую.": "Sign-in is secured by Google and Supabase.<br />Payments are always handled directly.",
    "Профиль": "Profile", "Избранное": "Saved items", "Добавить в избранное": "Save to favorites",
    "Удалить из избранного": "Remove from favorites", "Мои товары": "My listings",
    "Управление объявлениями": "Manage listings", "У вас пока нет товаров": "You have no listings yet",
    "Подтвердите удаление товара": "Are you sure you want to delete this listing?",
    "Моя реклама": "My ads", "Настройки": "Settings", "Тема": "Theme", "Язык": "Language",
    "Статистика аккаунта": "Account overview",
    "Звуки интерфейса": "Interface sounds", "Включены": "On", "Выключены": "Off",
    "В избранном": "Favorites", "Пока нет сохранённых товаров": "No saved items yet",
    "Нажмите на сердечко в карточке, чтобы сохранить товар.": "Tap the heart on an item to save it here.",
    "Аккаунт Google": "Google account", "Выйти": "Sign out", "Открыть профиль": "Open profile",
    "Добавлено в избранное": "Saved to favorites", "Удалено из избранного": "Removed from favorites",
    "Не удалось обновить избранное.": "Could not update favorites.",
    "Для запуска GoMarket настройте Supabase: скопируйте .env.example в .env.local, укажите URL и публичный ключ проекта, затем перезапустите npm run dev.": "To launch GoMarket, configure Supabase: copy .env.example to .env.local, add your project URL and public key, then restart npm run dev.",
    "Для запуска GoMarket настройте Supabase: скопируйте .env.example в .env.local, укажите URL и публичный ключ проекта, затем перезапустите npm run dev.": "To launch GoMarket, configure Supabase: copy .env.example to .env.local, add your project URL and public key, then restart npm run dev.",
  },
  ky: {
    "Для бизнеса": "Бизнес үчүн", "Мои объявления": "Менин жарыяларым", "Войти": "Кирүү", "Разместить": "Жайгаштыруу",
    "Открыть меню": "Менюну ачуу", "Закрыть меню": "Менюну жабуу",
    "Что ищете?": "Эмнени издейбиз?", "СВОИМ — О СВОЁМ": "ЖАКЫНДА — КЕРЕКТҮҮ",
    "Вещи находят<br>новых <strong>людей.</strong>": "Буюмдар<br>жаңы <strong>ээлерин табат.</strong>",
    "Покупайте, продавайте и обменивайтесь рядом.<br> Просто, по-человечески, по всему Кыргызстану.": "Сатып алыңыз, сатыңыз жана алмашыңыз.<br> Жөнөкөй, жакын жерде, Кыргызстан боюнча.",
    "Найти что-то своё": "Өзүңүзгө керектүүнү табыңыз", "Новые<br>истории<br>старых вещей": "Эски буюмдарга<br>жаңы<br>окуялар",
    "РАЗМЕЩЕНИЕ<br><b>БЕСПЛАТНО</b><span>для первых пользователей</span>": "ЖАРЫЯЛОО<br><b>АКЫСЫЗ</b><span>алгачкы колдонуучуларга</span>",
    "ЛИСТАЙТЕ НИЖЕ": "ТӨМӨН КАРАҢЫЗ", "Покупка напрямую": "Түз сатып алуу",
    "Оплата при встрече": "Жолугушууда төлөө", "Обмен — по договорённости": "Алмашуу — макулдашуу менен",
    "Объявления рядом": "Жакынкы жарыялар", "ВАША СЛЕДУЮЩАЯ НАХОДКА": "КИЙИНКИ ТАБЫЛГА",
    "Ищем и находим": "Издейбиз жана табабыз", "находок": "табылга", "находка": "табылга",
    "ВАШИ ОБЪЯВЛЕНИЯ": "СИЗДИН ЖАРЫЯЛАРЫҢЫЗ", "ФИЛЬТРЫ": "ЧЫПКАЛАР", "Фильтры": "Чыпкалар",
    "Сортировка": "Иреттөө", "Сначала новые": "Адегенде жаңылары", "Сначала дешевле": "Адегенде арзандары",
    "Сначала дороже": "Адегенде кымбаттары", "Сбросить": "Тазалоо",
    "Категория": "Категория", "Все товары": "Бардык товарлар", "Область": "Облус же шаар",
    "Весь Кыргызстан": "Бүт Кыргызстан", "Город": "Шаар", "Все города": "Бардык шаарлар", "Цена, сом": "Баасы, сом",
    "От": "Баштап", "До": "Чейин", "Можно обменять": "Алмашууга болот", "Есть вариант обмена": "Алмашуу мүмкүнчүлүгү бар",
    "Безопасная сделка": "Коопсуз соода", "Встречайтесь лично и проверяйте товар. Оплата — напрямую продавцу.": "Жеке жолугуп, товарды текшериңиз. Төлөмдү сатуучуга түз бериңиз.",
    "На данный момент ничего не найдено": "Учурда эч нерсе табылган жок", "Пока ничего не нашлось": "Азырынча табылган жок", "Пока нет ваших объявлений": "Азырынча жарыяларыңыз жок",
    "Попробуйте изменить фильтры или станьте первым, кто разместит такое объявление.": "Чыпкаларды өзгөртүңүз же биринчи болуп жарыя бериңиз.",
    "Войдите и разместите товар — ваши публикации появятся здесь.": "Кирип, товар жарыялаңыз — жарыяларыңыз ушул жерде чыгат.",
    "Разместить товар": "Товар жарыялоо", "Показать ещё": "Дагы көрсөтүү", "ХОРОШАЯ ИДЕЯ ДЛЯ БИЗНЕСА": "БИЗНЕС ҮЧҮН ЖАКШЫ МҮМКҮНЧҮЛҮК",
    "Пусть о вас<br>узнают рядом<span class=\"heading-period\">.</span>": "Жергиликтүүлөр<br>сиз жөнүндө билсин<span class=\"heading-period\">.</span>",
    "У вас есть дело, которое хочется показать? Разместите рекламную публикацию бесплатно и расскажите о себе людям по соседству.": "Ишиңизди тааныткыңыз келеби? Акысыз жарнама жарыялап, жакындарыңызга кабарлаңыз.",
    "Добавить рекламу": "Жарнама кошуу", "РЕКЛАМА ОТ МЕСТНЫХ": "ЖЕРГИЛИКТҮҮ ЖАРНАМА",
    "ПУБЛИКАЦИИ СООБЩЕСТВА": "КООМЧУЛУКТУН ЖАРЫЯЛАРЫ", "Реклама помечена. Публикации размещают сами авторы.": "Жарнамалар белгиленет. Авторлор өздөрү жарыялашат.",
    "Правила размещения": "Жарыялоо эрежелери", "Правила сайта": "Сайт эрежелери",
    "Данные и конфиденциальность": "Маалыматтар жана купуялык",
    "Площадка для вещей, которые нужны друг другу.": "Керектүү буюмдарды табыштырган жай.",
    "Dev by jspbkv": "Dev by jspbkv",
    "Объявление": "ЖАРЫЯ", "Новая находка": "Жаңы жарыя", "Что продаёте?": "Эмне сатасыз?",
    "Например, плёночный фотоаппарат": "Мисалы, фотоаппарат", "Цена, сом": "Баасы, сом", "Выберите категорию": "Категорияны тандаңыз",
    "Выберите область": "Облусту тандаңыз", "Выберите город": "Шаарды тандаңыз", "Расскажите о вещи": "Буюм жөнүндө маалымат",
    "Опишите товар, комплектацию и детали…": "Товарды, топтомун жана өзгөчөлүктөрүн сүрөттөңүз…", "Как к вам обращаться?": "Атыңыз ким?",
    "Имя продавца": "Сатуучунун аты", "Телефон для связи": "Байланыш телефону", "Добавить фотографию": "Сүрөт кошуу",
    "Рассмотрю обмен": "Алмашууга даярмын", "Условия можно обсудить напрямую": "Шарттарды түз сүйлөшсө болот",
    "Оплата проходит напрямую между вами и покупателем — вне GoMarket.": "Төлөм сиз менен сатып алуучунун ортосунда түз жүргүзүлөт.",
    "Отмена": "Жокко чыгаруу", "Опубликовать": "Жарыялоо", "СООБЩИТЕ О СВОЁМ ДЕЛЕ": "ИШИҢИЗ ЖӨНҮНДӨ АЙТЫҢЫЗ",
    "Новая публикация": "Жаңы жарыя", "Заголовок": "Аталышы", "Чем вы занимаетесь?": "Ишиңиз жөнүндө",
    "Коротко расскажите о себе и вашем предложении": "Өзүңүз жана сунушуңуз тууралуу кыскача айтыңыз",
    "Контакт": "Байланыш", "Ссылка (необязательно)": "Шилтеме (милдеттүү эмес)",
    "Реклама бесплатна на старте и публикуется без предварительной проверки. Не публикуйте личные данные других людей.": "Башында жарнама акысыз жана текшерүүсүз жарыяланат. Башкалардын жеке маалыматтарын жарыялабаңыз.",
    "РАДЫ ВАС ВИДЕТЬ": "КОШ КЕЛИҢИЗ", "Всё начинается<br />с приветствия.": "Баары<br />саламдашуудан башталат.",
    "Войдите, чтобы публиковать свои товары и объявления.": "Товарыңызды жана жарыяларды кошуу үчүн кириңиз.",
    "Продолжить с Google": "Google менен улантуу",
    "ПРОСТО И ЧЕСТНО": "ЖӨНӨКӨЙ ЖАНА АДИЛЕТТҮҮ", "Правила рекламы": "Жарнама эрежелери",
    "ПРОЗРАЧНО О ДАННЫХ": "МААЛЫМАТТАР КАНТИП КОЛДОНУЛАТ",
    "GoMarket помогает людям находить покупателей и продавцов товаров в Кыргызстане.": "GoMarket Кыргызстандагы адамдарга товар сатып алуучуларды жана сатуучуларды табууга жардам берет. Кызматтар жарыяларга кирбейт.",
    "Публикуйте точные описания и фотографии товара, которым вы вправе распоряжаться.": "Сатууга укугуңуз бар товарды так сүрөттөп, сүрөттөрүн жарыялаңыз.",
    "Не размещайте незаконные товары, мошеннические предложения, чужие персональные данные или вводящий в заблуждение контент.": "Мыйзамсыз товарларды, алдамчылык сунуштарды, башкалардын жеке маалыматтарын же адаштыруучу мазмунду жарыялабаңыз.",
    "Обмен — только по договорённости пользователей. GoMarket не участвует в переговорах и не принимает оплату.": "Алмашууну колдонуучулар өздөрү макулдашат. GoMarket сүйлөшүүлөргө катышпайт жана төлөм кабыл албайт.",
    "Проверяйте товар и договаривайтесь о безопасной встрече. Не переводите деньги незнакомым людям заранее.": "Товарды текшерип, коопсуз жолугушууну макулдашыңыз. Бейтааныш адамдарга алдын ала акча которбоңуз.",
    "Жалобы помогают автоматически скрывать публикации.": "Даттануулар жарыяны автоматтык түрдө жашырат; азыр кол менен текшерүү жана даттанууга каршы кайрылуу функциясы жок.",
    "UPD 08.11.2026": "Бул эрежелердин маалыматтык долбоору. Коомчулукка чыгардан мурун сайттын ээси текшерип, толукташы керек.",
    "Система тщательно проверяет подозрительные действия и блокирует пользователя автоматически.": "Бул GoMarket'тин учурдагы версиясынын сүрөттөлүшү, бекитилген юридикалык купуялык саясаты эмес.",
    "При входе сайт использует идентификатор пользователя и только доступные данные профиля.": "Кирүүдө сайт колдонуучунун ID'син жана жеткиликтүү профиль маалыматын гана колдонот.",
    "Имя, телефон, описание, цена, город и фотографии товара, а также контакты и ссылки рекламы доступны посетителям сайта. Изображения хранятся в публичном хранилище.": "Атыңыз, телефонуңуз, товар тууралуу маалымат, баасы, шаары, сүрөттөрү жана жарнаманын байланыш маалыматтары сайтка киргендерге көрүнөт. Сүрөттөр ачык сактагычта турат.",
    "Избранное доступно только владельцу аккаунта. Жалобы связаны с аккаунтом и публикацией; три уникальные жалобы автоматически скрывают материал. Ручная модерация и апелляции пока не реализованы.": "Тандалгандар аккаунт ээси үчүн гана көрүнөт. Даттануулар аккаунт жана жарыя менен байланышат; үч өзүнчө даттануу материалды автоматтык жашырат. Кол менен модерация жана апелляция азырынча жок.",
    "Язык и тема сохраняются локально в браузере. GoMarket не принимает оплату и не управляет сделками между пользователями.": "Тил жана тема браузерде гана сакталат. GoMarket төлөм кабыл албайт жана колдонуучулардын бүтүмдөрүн башкарбайт.",
    "Свои публикации можно редактировать и удалять. Самостоятельное удаление аккаунта и запросов на удаление данных в интерфейсе пока не предусмотрено.": "Өз жарыяларыңызды өзгөртүп же өчүрө аласыз. Интерфейсте аккаунтту же маалыматтарды өчүрүү өтүнүчү азырынча жок.",
    "UPD 08.11.2026": "UPD 08.11.2026",
    "Публикации и баннеры размещаются авторами самостоятельно и бесплатно на старте GoMarket. Публикация помечается «Реклама» и может быть скрыта другими пользователями.": "Жарыялар жана баннерлер GoMarket баштапкы мезгилинде акысыз. Алар «Жарнама» деп белгиленет жана даттануулар менен жашырылышы мүмкүн.",
    "Рассказывайте только о собственном бизнесе и предложении.": "Өз ишиңиз жана сунушуңуз жөнүндө гана жазыңыз.",
    "Не размещайте обманные, незаконные или вводящие в заблуждение публикации.": "Алдамчы, мыйзамсыз же жаңылыш маалымат жарыялабаңыз.",
    "Не публикуйте персональные данные без согласия.": "Макулдуксуз жеке маалыматтарды жарыялабаңыз.",
    "Пожаловаться можно прямо на публикацию. Повторные жалобы скрывают её до проверки.": "Жарыяга түз даттансаңыз болот. Кайталап даттанганда текшерүүгө чейин жашырылат.",
    "Только что": "Азыр эле", "Договорная": "Макулдашуу боюнча", "Обновить": "Жаңыртуу",
    "РЕКЛАМА": "ЖАРНАМА", "Позвонить": "Чалуу", "Сайт": "Сайт", "Пожаловаться": "Даттануу",
    "ОБМЕН": "АЛМАШУУ", "Войти через Google": "Google менен кирүү",
    "Публикация бесплатна": "Жарыялоо акысыз",
    "Изменить объявление": "Жарыяны өзгөртүү", "Сохранится текущая фотография или выберите новую": "Учурдагы сүрөт сакталат, алмаштыруу үчүн жаңысын тандаңыз",
    "Автор объявления": "Жарыянын автору",
    "Оплата напрямую продавцу при личной встрече. GoMarket не принимает платежи.": "Жолугушууда сатуучуга түз төлөңүз. GoMarket төлөмдөрдү кабыл албайт.",
    "Связаться с продавцом": "Сатуучу менен байланышуу", "Удалить": "Өчүрүү",
    "Объявление удалено": "Жарыя өчүрүлдү",
    "Объявление обновлено": "Жарыя жаңыртылды", "Ваш товар опубликован": "Товарыңыз жарыяланды",
    "Активно": "Активдүү", "Продано": "Сатылды", "Скрыто": "Жашырылган", "Статус объявления": "Жарыянын абалы",
    "Статус товара обновлён": "Жарыянын абалы жаңыртылды", "Не удалось изменить статус товара.": "Жарыянын абалын өзгөртүү ишке ашкан жок.",
    "Связь скрыта, пока товар не активен.": "Жарыя активдүү эмес кезде байланыш маалыматы жашырылат.",
    "Этот товар уже продан.": "Бул товар сатылып кеткен.",
    "Все мои товары": "Бардык жарыяларым", "Активные": "Активдүү", "Вернуться к каталогу": "Каталогго кайтуу",
    "Добавить товар": "Товар кошуу", "Пока нет ваших объявлений": "Азырынча жарыяларыңыз жок",
    "Можно изменять только свои объявления.": "Өз жарыяларыңыздын абалын гана өзгөртө аласыз.",
    "Ваша публикация появилась в ленте": "Жарыяңыз тасмага кошулду", "Публикация удалена": "Жарыя өчүрүлдү",
    "Можно удалять только свои объявления.": "Өз жарыяларыңызды гана өчүрө аласыз.",
    "Можно удалять только свои публикации.": "Өз жарыяларыңызды гана өчүрө аласыз.",
    "Вы уже отправили жалобу на эту публикацию.": "Бул жарыяга даттангансыз.",
    "Публикация скрыта после жалоб": "Кайталап даттануудан кийин жарыя жашырылды.",
    "Жалоба отправлена. Спасибо за сигнал.": "Даттануу жөнөтүлдү. Маалымат үчүн рахмат.",
    "Не удалось загрузить данные. Проверьте подключение.": "Маалымат жүктөлгөн жок. Интернетти текшериңиз.",
    "Не удалось опубликовать объявление.": "Жарыя жарыяланган жок.",
    "Не удалось удалить объявление.": "Жарыя өчүрүлгөн жок.",
    "Не удалось удалить публикацию.": "Жарыя өчүрүлгөн жок.",
    "Не удалось отправить жалобу.": "Даттануу жөнөтүлгөн жок.",
    "Не удалось войти через Google.": "Google аркылуу кирүү ишке ашкан жок.",
    "Не удалось выйти из аккаунта.": "Аккаунттан чыгуу ишке ашкан жок.",
    "Вы вышли из аккаунта": "Аккаунттан чыктыңыз.",
    "Публикуем…": "Жарыяланууда…",
    "Все для безопасности наших клиентов.<br />Покупки и оплата всегда происходят напрямую.": "Кирүү Google жана Supabase менен корголгон.<br />Төлөмдөр түз жүргүзүлөт.",
    "Профиль": "Профиль", "Избранное": "Тандалгандар", "Добавить в избранное": "Тандалгандарга кошуу",
    "Удалить из избранного": "Тандалгандардан өчүрүү", "Мои товары": "Менин товарларым",
    "Управление объявлениями": "Жарыяларды башкаруу", "У вас пока нет товаров": "Азырынча товарларыңыз жок",
    "Подтвердите удаление товара": "Бул жарыяны өчүрүүнү каалайсызбы?",
    "Моя реклама": "Менин жарнамаларым", "Настройки": "Жөндөөлөр", "Тема": "Тема", "Язык": "Тил",
    "Статистика аккаунта": "Аккаунт статистикасы",
    "Звуки интерфейса": "Интерфейс үндөрү", "Включены": "Күйгүзүлгөн", "Выключены": "Өчүрүлгөн",
    "В избранном": "Тандалгандарда", "Пока нет сохранённых товаров": "Азырынча сакталган товар жок",
    "Нажмите на сердечко в карточке, чтобы сохранить товар.": "Товарды сактоо үчүн карточкадагы жүрөкчөнү басыңыз.",
    "Аккаунт Google": "Google аккаунту", "Выйти": "Чыгуу", "Открыть профиль": "Профилди ачуу",
    "Добавлено в избранное": "Тандалгандарга сакталды", "Удалено из избранного": "Тандалгандардан өчүрүлдү",
    "Не удалось обновить избранное.": "Тандалгандар жаңыртылган жок.",
    "Для запуска GoMarket настройте Supabase: скопируйте .env.example в .env.local, укажите URL и публичный ключ проекта, затем перезапустите npm run dev.": "GoMarket'ти иштетүү үчүн Supabase'ти жөндөңүз: .env.example файлын .env.local кылып көчүрүп, долбоордун URL дарегин жана ачык ачкычын кошуп, npm run dev'ди кайра иштетиңиз.",
    "Для запуска GoMarket настройте Supabase: скопируйте .env.example в .env.local, укажите URL и публичный ключ проекта, затем перезапустите npm run dev.": "GoMarket'ти иштетүү үчүн Supabase'ти жөндөңүз: .env.example файлын .env.local кылып көчүрүп, долбоордун URL дарегин жана ачык ачкычын кошуп, npm run dev'ди кайра иштетиңиз.",
  },
};

const categoryNames = {
  en: ["Electronics", "Home & interior", "Clothing & shoes", "Hobbies & sports", "Transport", "Kids", "Books", "Other"],
  ky: ["Электроника", "Үй жана интерьер", "Кийим жана бут кийим", "Хобби жана спорт", "Унаа", "Балдар товарлары", "Китептер", "Башка"],
};
const regionNames = {
  en: ["Batken Region", "Jalal-Abad Region", "Issyk-Kul Region", "Naryn Region", "Osh Region", "Talas Region", "Chuy Region", "Bishkek", "Osh"],
  ky: ["Баткен облусу", "Жалал-Абад облусу", "Ысык-Көл облусу", "Нарын облусу", "Ош облусу", "Талас облусу", "Чүй облусу", "Бишкек", "Ош"],
};
const cityNames = {
  en: ["Batken", "Kyzyl-Kiya", "Suluktu", "Razakov", "Jalal-Abad", "Tash-Komyr", "Kara-Kol", "Kochkor-Ata", "Karakol", "Balykchy", "Cholpon-Ata", "Naryn", "Kara-Suu", "Uzgen", "Nookat", "Talas", "Tokmok", "Kara-Balta", "Kant", "Bishkek", "Osh"],
  ky: ["Баткен", "Кызыл-Кыя", "Сүлүктү", "Раззаков", "Жалал-Абад", "Таш-Көмүр", "Кара-Көл", "Кочкор-Ата", "Каракол", "Балыкчы", "Чолпон-Ата", "Нарын", "Кара-Суу", "Өзгөн", "Ноокат", "Талас", "Токмок", "Кара-Балта", "Кант", "Бишкек", "Ош"],
};
let locale = localStorage.getItem("gomarket-locale") || "ru";
let uiSoundsEnabled = localStorage.getItem("gomarket-sounds") === "true";
let audioContext = null;
let lastClickSoundAt = 0;
let splashShownAt = window.__gomarketBootAt || Date.now();
let splashDismissed = false;
let splashTimer;
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
let listings = [];
let ads = [];
let currentUser = null;
let favoriteIds = [];
let loadError = null;
let visibleLimit = 12;
let currentSearch = "";
let mineOnly = false;
let mineStatusFilter = "all";
let refreshTimer;
let photoUrls = [];
let adPhotoUrl = "";
const carouselTimers = new Map();
const customSelectObservers = new WeakMap();
const scrollLockReasons = new Set();
let lockedScrollY = 0;

const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]);

function normalizedPhone(phone) {
  return String(phone || "").replace(/[^\d+]/g, "");
}

function initials(name = "G") {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toUpperCase();
}

function userLabel(user = currentUser) {
  if (!user) return "";
  return user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Пользователь";
}

function isOwner(item) {
  return Boolean(currentUser && item.userId === currentUser.id);
}

function isFavorite(id) {
  return favoriteIds.includes(id);
}

function playTone(frequency, startAt, duration, volume = 0.025, type = "sine") {
  const context = audioContext;
  if (!context || context.state !== "running") return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.001);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.01);
}

function withAudioContext(callback) {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!uiSoundsEnabled || !AudioContextConstructor) return false;
  if (!audioContext) audioContext = new AudioContextConstructor();
  if (audioContext.state === "suspended") {
    audioContext.resume().then(callback).catch((error) => console.warn("Could not resume interface audio.", error));
    return true;
  }
  callback();
  return true;
}

function playClickSound() {
  withAudioContext(() => {
    const now = audioContext.currentTime;
    if (now - lastClickSoundAt < 0.055) return;
    lastClickSoundAt = now;
    playTone(680, now, 0.035, 1);
  });
}

function playNotificationSound(type = "success") {
  withAudioContext(() => {
    const now = audioContext.currentTime;
    if (type === "error") {
      playTone(330, now, 0.09, 1, "triangle");
      return;
    }
    playTone(660, now, 0.1, 1);
    playTone(880, now + 0.09, 0.13, 1);
  });
}

function handleInterfaceClickSound(event) {
  if (!uiSoundsEnabled || event.target.closest("[data-sound-toggle]")) return;
  if (event.target.closest("button, a[href], [role='button']")) playClickSound();
}

function showToast(message, type = "success") {
  playNotificationSound(type);
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  $("#toast-region").append(toast);
  window.setTimeout(() => toast.remove(), 3700);
}

function openDialog(dialog) {
  if (!dialog.open) {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  setScrollLock(`dialog:${dialog.id}`, true);
}

function closeDialog(dialog) {
  if (dialog.open) {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }
  setScrollLock(`dialog:${dialog.id}`, false);
}

function setScrollLock(reason, shouldLock) {
  if (shouldLock) scrollLockReasons.add(reason);
  else scrollLockReasons.delete(reason);
  if (scrollLockReasons.size) {
    if (!document.body.classList.contains("scroll-locked")) {
      lockedScrollY = window.scrollY;
      document.body.style.top = `-${lockedScrollY}px`;
      document.body.classList.add("scroll-locked");
    }
    return;
  }
  if (document.body.classList.contains("scroll-locked")) {
    document.body.classList.remove("scroll-locked");
    document.body.style.removeProperty("top");
    window.scrollTo(0, lockedScrollY);
  }
}

function closeMenu({ restoreFocus = true } = {}) {
  const panel = $("#menu-panel");
  if (!panel.classList.contains("menu-open")) return;
  panel.classList.remove("menu-open");
  $("#menu-button").setAttribute("aria-expanded", "false");
  $("#menu-button").setAttribute("aria-label", locale === "en" ? "Open menu" : locale === "ky" ? "Менюну ачуу" : "Открыть меню");
  setScrollLock("settings-menu", false);
  if (restoreFocus) $("#menu-button").focus();
}

function toggleMenu() {
  const panel = $("#menu-panel");
  if (panel.classList.contains("menu-open")) {
    closeMenu();
    return;
  }
  panel.classList.add("menu-open");
  $("#menu-button").setAttribute("aria-expanded", "true");
  $("#menu-button").setAttribute("aria-label", locale === "en" ? "Close menu" : locale === "ky" ? "Менюну жабуу" : "Закрыть меню");
  setScrollLock("settings-menu", true);
  $("#auth-button").focus();
}

function requireLogin() {
  if (currentUser) return true;
  openDialog(elements.authDialog);
  return false;
}

function t(text) {
  return translations[locale]?.[text] || text;
}

function translatedCategory(category) {
  const index = CATEGORIES.indexOf(category);
  return locale === "ru" || index < 0 ? category : categoryNames[locale][index];
}

function translatedRegion(region) {
  const index = REGIONS.findIndex((item) => item.name === region);
  return locale === "ru" || index < 0 ? region : regionNames[locale][index];
}

function translatedCity(city) {
  if (locale === "ru") return city;
  const allCities = REGIONS.flatMap((region) => region.cities).filter((value, index, list) => list.indexOf(value) === index);
  const index = allCities.indexOf(city);
  return index < 0 ? city : cityNames[locale][index];
}

function applyTranslations() {
  const setText = (selector, value, html = false) => {
    const element = $(selector);
    if (element) element[html ? "innerHTML" : "textContent"] = value;
  };
  document.documentElement.lang = locale === "ky" ? "ky" : locale;
  const copy = {
    "#search-input": t("Что ищете?"),
    "#ads-nav": `${t("Для бизнеса")} <span class="nav-arrow">↗</span>`,
    "#my-listings-button": t("Мои объявления"),
    "#auth-button": currentUser ? t("Выйти") : `${t("Войти")} <span aria-hidden="true">↗</span>`,
    "#create-button": `<span class="button-plus" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span> ${t("Разместить")}`,
    ".hero .eyebrow": `<span class="pulse-dot"></span> ${t("СВОИМ — О СВОЁМ")}`,
    ".hero h1": t("Вещи находят<br>новых <strong>людей.</strong>"),
    ".hero-content p": t("Покупайте, продавайте и обменивайтесь рядом.<br> Просто, по-человечески, по всему Кыргызстану."),
    "#explore-button": `${t("Найти что-то своё")} <span aria-hidden="true">↘</span>`,
    ".hero-sticker > span:nth-child(2)": t("Новые<br>истории<br>старых вещей"),
    ".hero-note": t("РАЗМЕЩЕНИЕ<br><b>БЕСПЛАТНО</b><span>для первых пользователей</span>"),
    ".scroll-hint": `${t("ЛИСТАЙТЕ НИЖЕ")} <span aria-hidden="true">↓</span>`,
    ".intro-strip > span:nth-child(1)": t("Покупка напрямую"),
    ".intro-strip > span:nth-child(3)": t("Оплата при встрече"),
    ".intro-strip > span:nth-child(5)": t("Обмен — по договорённости"),
    ".intro-strip > span:nth-child(7)": t("Объявления рядом"),
    ".section-heading .muted-eyebrow": t("ВАША СЛЕДУЮЩАЯ НАХОДКА"),
    ".section-heading h2": `${t("Ищем и находим")}<span class="heading-period">.</span>`,
    "#refresh-button": `↻ <span>${t("Обновить")}</span>`,
    "#filter-toggle": `<span aria-hidden="true">☷</span> ${t("Фильтры")} <span class="filter-count hidden" id="filter-count">0</span><span class="filter-chevron" aria-hidden="true">▼</span>`,
    "#sort-label": t("Сортировка"),
    ".filters-title > span": t("ФИЛЬТРЫ"),
    "#reset-filters": t("Сбросить"),
    ".filters-panel label[for='category-filter']": t("Категория"),
    ".filters-panel label[for='region-filter']": t("Область"),
    ".filters-panel label[for='city-filter']": t("Город"),
    ".price-label-row .field-label": t("Цена, сом"),
    ".toggle-row b": t("Можно обменять"),
    ".toggle-row small": t("Есть вариант обмена"),
    ".safe-note b": t("Безопасная сделка"),
    ".safe-note small": t("Встречайтесь лично и проверяйте товар. Оплата — напрямую продавцу."),
    "#empty-state h3": t("На данный момент ничего не найдено"),
    "#load-more": `${t("Показать ещё")} <span aria-hidden="true">↓</span>`,
    ".ad-section-heading .muted-eyebrow": t("ХОРОШАЯ ИДЕЯ ДЛЯ БИЗНЕСА"),
    ".ad-section-heading h2": t("Пусть о вас<br>узнают рядом<span class=\"heading-period\">.</span>"),
    ".ad-section-aside p": t("У вас есть дело, которое хочется показать? Разместите рекламную публикацию бесплатно и расскажите о себе людям по соседству."),
    "#create-ad-button": `${t("Добавить рекламу")} <span aria-hidden="true">↗</span>`,
    ".ad-feed-top > span:first-child": t("РЕКЛАМА ОТ МЕСТНЫХ"),
    ".ad-feed-top > span:last-child": `${t("ПУБЛИКАЦИИ СООБЩЕСТВА")} <i>✳</i>`,
    ".ad-empty p": t("На данный момент ничего не найдено"),
    ".ad-footer > span": t("Реклама помечена. Публикации размещают сами авторы."),
    "#ad-rules-button": `${t("Правила размещения")} ↗`,
    ".footer > span:nth-child(2)": t("Площадка для вещей, которые нужны друг другу."),
    "#site-rules-button": t("Правила сайта"),
    "#privacy-button": t("Данные и конфиденциальность"),
    "#menu-sound-label": t("Звуки интерфейса"),
    "#footer-credit": t("Dev by jspbkv"),
    "#listing-dialog .modal-header .eyebrow": t("Объявление"),
    "#listing-dialog-title": t("Новая находка"),
    "label[for='listing-title']": t("Что продаёте?"),
    "label[for='listing-category']": t("Категория"),
    "label[for='listing-price']": t("Цена, сом"),
    "label[for='listing-region']": t("Область"),
    "label[for='listing-city']": t("Город"),
    "label[for='listing-description']": t("Расскажите о вещи"),
    "label[for='seller-name']": t("Как к вам обращаться?"),
    "label[for='seller-phone']": t("Телефон для связи"),
    ".photo-upload b": t("Добавить фотографию"),
    ".check-row b": t("Рассмотрю обмен"),
    ".check-row small": t("Условия можно обсудить напрямую"),
    "#listing-form .form-note": t("Оплата проходит напрямую между вами и покупателем — вне GoMarket."),
    "#listing-form [data-close]": t("Отмена"),
    "#listing-form button[type='submit']": `${t("Опубликовать")} <span aria-hidden="true">↗</span>`,
    "#ad-dialog .modal-header .eyebrow": t("СООБЩИТЕ О СВОЁМ ДЕЛЕ"),
    "#ad-dialog-title": t("Новая публикация"),
    "label[for='ad-title']": t("Заголовок"),
    "label[for='ad-description']": t("Чем вы занимаетесь?"),
    "label[for='ad-location']": t("Город"),
    "label[for='ad-contact']": t("Контакт"),
    "label[for='ad-link']": t("Ссылка (необязательно)"),
    "#ad-form .form-note": t("Реклама бесплатна на старте и публикуется без предварительной проверки. Не публикуйте личные данные других людей."),
    "#ad-form [data-close]": t("Отмена"),
    "#ad-form button[type='submit']": `${t("Опубликовать")} <span aria-hidden="true">↗</span>`,
    "#auth-dialog .muted-eyebrow": t("РАДЫ ВАС ВИДЕТЬ"),
    "#auth-dialog-title": t("Всё начинается<br />с приветствия."),
    ".auth-copy": t("Войдите, чтобы публиковать свои товары и объявления."),
    "#google-button": `<span class="google-g">G</span> ${t("Продолжить с Google")} <span>↗</span>`,
    ".auth-footnote": isSupabaseConfigured
      ? t("Все для безопасности наших клиентов.<br />Покупки и оплата всегда происходят напрямую.")
      : t("Для запуска GoMarket настройте Supabase: скопируйте .env.example в .env.local, укажите URL и публичный ключ проекта, затем перезапустите npm run dev."),
    "#rules-dialog .muted-eyebrow": t("ПРОСТО И ЧЕСТНО"),
    "#rules-title": t("Правила рекламы"),
    ".rules-copy > p": t("Публикации и баннеры размещаются авторами самостоятельно и бесплатно на старте GoMarket. Публикация помечается «Реклама» и может быть скрыта другими пользователями."),
    ".rules-copy li:nth-child(1)": t("Рассказывайте только о собственном бизнесе и предложении."),
    ".rules-copy li:nth-child(2)": t("Не размещайте обманные, незаконные или вводящие в заблуждение публикации."),
    ".rules-copy li:nth-child(3)": t("Не публикуйте персональные данные без согласия."),
    ".rules-copy li:nth-child(4)": t("Пожаловаться можно прямо на публикацию. Повторные жалобы скрывают её до проверки."),
    "#site-rules-dialog .muted-eyebrow": t("ПРОСТО И ЧЕСТНО"),
    "#site-rules-title": t("Правила сайта"),
    "#site-rules-copy > p:first-child": t("GoMarket помогает людям находить покупателей и продавцов товаров в Кыргызстане."),
    "#site-rules-copy li:nth-child(1)": t("Публикуйте точные описания и фотографии товара, которым вы вправе распоряжаться."),
    "#site-rules-copy li:nth-child(2)": t("Не размещайте незаконные товары, мошеннические предложения, чужие персональные данные или вводящий в заблуждение контент."),
    "#site-rules-copy li:nth-child(3)": t("Обмен — только по договорённости пользователей. GoMarket не участвует в переговорах и не принимает оплату."),
    "#site-rules-copy li:nth-child(4)": t("Проверяйте товар и договаривайтесь о безопасной встрече. Не переводите деньги незнакомым людям заранее."),
    "#site-rules-copy li:nth-child(5)": t("Жалобы помогают автоматически скрывать публикации."),
    "#site-rules-copy .policy-draft-note": t("UPD 08.11.2026"),
    "#privacy-dialog .muted-eyebrow": t("ПРОЗРАЧНО О ДАННЫХ"),
    "#privacy-title": t("Данные и конфиденциальность"),
    "#privacy-copy > p:first-child": t("Система тщательно проверяет подозрительные действия и блокирует пользователя автоматически."),
    "#privacy-copy li:nth-child(1)": t("При входе Google и Supabase обрабатывают данные аккаунта. Приложение использует идентификатор пользователя и доступные данные профиля."),
    "#privacy-copy li:nth-child(2)": t("Имя, телефон, описание, цена, город и фотографии товара, а также контакты и ссылки рекламы доступны посетителям сайта. Изображения хранятся в публичном хранилище."),
    "#privacy-copy li:nth-child(3)": t("Избранное доступно только владельцу аккаунта. Жалобы связаны с аккаунтом и публикацией; три уникальные жалобы автоматически скрывают материал. Ручная модерация и апелляции пока не реализованы."),
    "#privacy-copy li:nth-child(4)": t("Язык и тема сохраняются локально в браузере. GoMarket не принимает оплату и не управляет сделками между пользователями."),
    "#privacy-copy li:nth-child(5)": t("Свои публикации можно редактировать и удалять. Самостоятельное удаление аккаунта и запросов на удаление данных в интерфейсе пока не предусмотрено."),
    "#privacy-copy .policy-draft-note": t("UPD 08.11.2026"),
  };
  for (const [selector, value] of Object.entries(copy)) {
    const element = $(selector);
    if (element) element.innerHTML = value;
  }
  $(".footer-links").setAttribute("aria-label", locale === "en" ? "GoMarket information" : locale === "ky" ? "GoMarket тууралуу маалымат" : "Информация о GoMarket");
  $("#search-input").setAttribute("aria-label", t("Что ищете?"));
  $("#search-input").placeholder = t("Что ищете?");
  $("#price-min").placeholder = t("От");
  $("#price-max").placeholder = t("До");
  $("#listing-title").placeholder = t("Например, плёночный фотоаппарат");
  $("#listing-description").placeholder = t("Опишите товар, комплектацию и детали…");
  $("#seller-name").placeholder = t("Имя продавца");
  $("#seller-phone").placeholder = t("Телефон для связи");
  $("#ad-title").placeholder = locale === "en" ? "e.g. Phone repair nearby" : locale === "ky" ? "Мисалы, телефон оңдоочу жай" : "Например, ремонт телефонов рядом";
  $("#ad-description").placeholder = t("Коротко расскажите о себе и вашем предложении");
  $("#ad-contact").placeholder = t("Телефон для связи");
  $("#listing-price").placeholder = "0";
  $("#ad-link").placeholder = locale === "en" ? "" : "";
  $("#theme-label").textContent = locale === "en" ? "Theme" : locale === "ky" ? "Тема" : "Тема";
  $("#language-label").textContent = locale === "en" ? "Language" : locale === "ky" ? "Тил" : "Язык";
  const themeNames = locale === "en"
    ? { system: "System theme", light: "Light theme", dark: "Dark theme", systemText: "System", lightText: "Light", darkText: "Dark" }
    : locale === "ky"
      ? { system: "Тутум темасы", light: "Жарык тема", dark: "Караңгы тема", systemText: "Система", lightText: "Жарык", darkText: "Караңгы" }
      : { system: "Системная тема", light: "Светлая тема", dark: "Тёмная тема", systemText: "Система", lightText: "Светлая", darkText: "Тёмная" };
  for (const [value, name, text] of [
    ["system", themeNames.system, themeNames.systemText],
    ["light", themeNames.light, themeNames.lightText],
    ["dark", themeNames.dark, themeNames.darkText],
  ]) {
    const option = $(`[data-theme-choice="${value}"]`);
    option.setAttribute("aria-label", name);
    option.title = name;
    $(".choice-text", option).textContent = text;
  }
  for (const [value, name] of [["ru", "Русский"], ["ky", "Кыргызча"], ["en", "English"]]) {
    $(`[data-language-choice="${value}"]`).setAttribute("aria-label", locale === "en" ? name === "Русский" ? "Russian" : name === "Кыргызча" ? "Kyrgyz" : name : name);
  }
  syncPreferenceControls();
  $("#menu-button").setAttribute("aria-label", t($("#menu-panel").classList.contains("menu-open") ? "Закрыть меню" : "Открыть меню"));
  elements.profileButton.setAttribute("aria-label", t("Открыть профиль"));
  elements.profileButton.title = t("Открыть профиль");
  elements.profileDialog.setAttribute("aria-label", t("Профиль"));
  $(".filters-panel").setAttribute("aria-label", t("ФИЛЬТРЫ"));
  $("#listing-dialog .modal-header button").setAttribute("aria-label", locale === "en" ? "Close" : locale === "ky" ? "Жабуу" : "Закрыть");
  $("#ad-dialog .modal-header button").setAttribute("aria-label", locale === "en" ? "Close" : locale === "ky" ? "Жабуу" : "Закрыть");
  const splashCaption = $("#splash-caption");
  if (splashCaption) splashCaption.textContent = locale === "en" ? "Finding great things nearby" : locale === "ky" ? "Жакынкы товарларды издеп жатабыз" : "Подбираем товары рядом с вами";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", document.documentElement.dataset.theme === "dark" ? "#171717" : "#f5f5f5");
  document.title = locale === "en" ? "GoMarket" : locale === "ky" ? "GoMarket" : "GoMarket — найдите своё";
  setupLocations();
  syncCustomSelects();
  if (elements.profileDialog.open) renderProfile();
  renderAdPhotoPreview();
  renderAll();
}

function buildSelectOptions(select, options, placeholder) {
  select.innerHTML = `<option value="">${escapeHTML(placeholder)}</option>${options.map((option) => `<option value="${escapeHTML(option)}">${escapeHTML(option)}</option>`).join("")}`;
}

function setupLocations() {
  const regionOptions = REGIONS.map((region) => region.name);
  const allCities = REGIONS.flatMap((region) => region.cities).filter((city, index, list) => list.indexOf(city) === index);
  const cityOptions = [...allCities].sort((a, b) => a.localeCompare(b, "ru"));
  const categoryFilter = $("#category-filter").value;
  const listingCategory = $("#listing-category").value;
  const selectedRegion = elements.region.value;
  const listingRegion = elements.listingRegion.value;
  const adCity = $("#ad-location").value;
  buildSelectOptions(elements.region, regionOptions, t("Весь Кыргызстан"));
  buildSelectOptions(elements.listingRegion, regionOptions, t("Выберите область"));
  [elements.region, elements.listingRegion].forEach((select) => {
    [...select.options].slice(1).forEach((option, index) => { option.textContent = translatedRegion(regionOptions[index]); });
  });
  buildSelectOptions($("#ad-location"), cityOptions, t("Выберите город"));
  [...$("#ad-location").options].slice(1).forEach((option) => { option.textContent = translatedCity(option.value); });
  buildSelectOptions($("#listing-category"), CATEGORIES, t("Выберите категорию"));
  buildSelectOptions($("#category-filter"), CATEGORIES, t("Все товары"));
  [$("#listing-category"), $("#category-filter")].forEach((select) => {
    [...select.options].slice(1).forEach((option) => { option.textContent = translatedCategory(option.value); });
  });
  elements.region.value = selectedRegion;
  elements.listingRegion.value = listingRegion;
  $("#category-filter").value = categoryFilter;
  $("#listing-category").value = listingCategory;
  $("#ad-location").value = adCity;
  refreshCityOptions(elements.listingRegion.value, elements.listingCity, locale === "ru" ? "Сначала выберите область" : t("Выберите город"));
  refreshCityOptions(elements.region.value, elements.city, t("Все города"));
  const sortSelect = $("#sort-select");
  if (sortSelect) {
    const sort = sortSelect.value;
    sortSelect.innerHTML = `<option value="newest">${t("Сначала новые")}</option><option value="price-asc">${t("Сначала дешевле")}</option><option value="price-desc">${t("Сначала дороже")}</option>`;
    sortSelect.value = sort || "newest";
  }
  syncCustomSelects();
}

function refreshCityOptions(regionName, select, placeholder = "Все города") {
  const region = REGIONS.find((item) => item.name === regionName);
  const selectedCity = select.value;
  select.disabled = !region;
  buildSelectOptions(select, region?.cities || [], region ? placeholder : "Все города");
  [...select.options].slice(1).forEach((option) => { option.textContent = translatedCity(option.value); });
  if ([...select.options].some((option) => option.value === selectedCity)) select.value = selectedCity;
  syncCustomSelect(select);
}

function enhanceCustomSelects(root = document) {
  $$("select:not([data-customized])", root).forEach((select) => {
    const wrapper = document.createElement("div");
    wrapper.className = "custom-select";
    select.before(wrapper);
    wrapper.append(select);
    select.dataset.customized = "true";
    select.classList.add("native-select-hidden");
    select.tabIndex = -1;
    select.setAttribute("aria-hidden", "true");

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "custom-select-trigger";
    trigger.id = `${select.id}-trigger`;
    trigger.setAttribute("role", "combobox");
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", `${select.id}-options`);
    const associatedLabel = $$(`label[for="${select.id}"]`).find(Boolean)
      || select.closest("label")
      || (select.id === "sort-select" ? $("#sort-label") : null);
    if (associatedLabel) {
      trigger.setAttribute("aria-label", associatedLabel.textContent.trim());
      associatedLabel.addEventListener("click", (event) => {
        event.preventDefault();
        trigger.focus();
        openCustomSelect(wrapper);
      });
    } else if (select.getAttribute("aria-label")) {
      trigger.setAttribute("aria-label", select.getAttribute("aria-label"));
    }

    const value = document.createElement("span");
    value.className = "custom-select-value";
    const chevron = document.createElement("span");
    chevron.className = "custom-select-chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "▲";
    trigger.append(value, chevron);

    const listbox = document.createElement("div");
    listbox.className = "custom-select-options";
    listbox.id = `${select.id}-options`;
    listbox.setAttribute("role", "listbox");
    listbox.hidden = true;
    wrapper.append(trigger, listbox);

    select.addEventListener("change", () => syncCustomSelect(select));
    select.addEventListener("invalid", (event) => {
      event.preventDefault();
      trigger.classList.add("is-invalid");
      trigger.focus();
    });
    const observer = new MutationObserver(() => syncCustomSelect(select));
    observer.observe(select, { subtree: true, childList: true, characterData: true, attributes: true });
    customSelectObservers.set(select, observer);
    syncCustomSelect(select);
  });
}

function syncCustomSelect(select) {
  if (!select?.dataset.customized) return;
  const wrapper = select.closest(".custom-select");
  if (!wrapper) return;
  const trigger = $(".custom-select-trigger", wrapper);
  const listbox = $(".custom-select-options", wrapper);
  const label = $$(`label[for="${select.id}"]`).find(Boolean)
    || (select.id === "sort-select" ? $("#sort-label") : null);
  if (label) {
    trigger.setAttribute("aria-label", label.textContent.trim());
    listbox.setAttribute("aria-label", label.textContent.trim());
  }
  const selectedOption = select.options[select.selectedIndex];
  $(".custom-select-value", trigger).textContent = selectedOption?.textContent || "";
  trigger.disabled = select.disabled || select.options.length === 0;
  trigger.classList.toggle("is-invalid", false);
  listbox.replaceChildren();
  [...select.options].forEach((option, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "custom-select-option";
    item.setAttribute("role", "option");
    item.setAttribute("aria-selected", String(option.selected));
    item.disabled = option.disabled;
    item.dataset.optionIndex = String(index);
    item.textContent = option.textContent;
    listbox.append(item);
  });
}

function syncCustomSelects(root = document) {
  $$("select[data-customized]", root).forEach(syncCustomSelect);
}

function closeCustomSelect(wrapper, { restoreFocus = false } = {}) {
  const trigger = $(".custom-select-trigger", wrapper);
  const listbox = $(".custom-select-options", wrapper);
  trigger.setAttribute("aria-expanded", "false");
  listbox.hidden = true;
  wrapper.classList.remove("is-open");
  if (restoreFocus) trigger.focus();
}

function openCustomSelect(wrapper) {
  $$(".custom-select.is-open").forEach((open) => {
    if (open !== wrapper) closeCustomSelect(open);
  });
  const trigger = $(".custom-select-trigger", wrapper);
  const listbox = $(".custom-select-options", wrapper);
  if (trigger.disabled) return;
  listbox.hidden = false;
  wrapper.classList.add("is-open");
  trigger.setAttribute("aria-expanded", "true");
  const selected = $('[aria-selected="true"]', listbox) || $(".custom-select-option:not(:disabled)", listbox);
  selected?.focus();
}

function selectCustomOption(optionButton) {
  const wrapper = optionButton.closest(".custom-select");
  const select = $("select", wrapper);
  const index = Number(optionButton.dataset.optionIndex);
  if (!Number.isInteger(index) || !select.options[index] || select.options[index].disabled) return;
  select.selectedIndex = index;
  select.dispatchEvent(new Event("change", { bubbles: true }));
  closeCustomSelect(wrapper, { restoreFocus: true });
}

function handleCustomSelectKeydown(event) {
  const trigger = event.target.closest(".custom-select-trigger");
  const option = event.target.closest(".custom-select-option");
  if (trigger && ["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
    event.preventDefault();
    openCustomSelect(trigger.closest(".custom-select"));
    return;
  }
  if (!option) {
    if (event.key === "Escape") $$(".custom-select.is-open").forEach((wrapper) => closeCustomSelect(wrapper));
    return;
  }
  const options = $$(".custom-select-option:not(:disabled)", option.closest(".custom-select-options"));
  const index = options.indexOf(option);
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    options[(index + (event.key === "ArrowDown" ? 1 : options.length - 1)) % options.length]?.focus();
  } else if (event.key === "Home" || event.key === "End") {
    event.preventDefault();
    (event.key === "Home" ? options[0] : options.at(-1))?.focus();
  } else if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    selectCustomOption(option);
  } else if (event.key === "Escape") {
    event.preventDefault();
    closeCustomSelect(option.closest(".custom-select"), { restoreFocus: true });
  } else if (event.key === "Tab") {
    closeCustomSelect(option.closest(".custom-select"));
  }
}

function formatPrice(price) {
  const numeric = Number(price);
  if (!numeric) return t("Договорная");
  const numberLocale = locale === "ky" ? "ky-KG" : locale === "en" ? "en-US" : "ru-RU";
  const currency = locale === "en" ? "KGS" : locale === "ky" ? "сом" : "сом";
  return `${new Intl.NumberFormat(numberLocale).format(numeric)} ${currency}`;
}

function formatDate(date) {
  const diff = Date.now() - new Date(date).getTime();
  const numberLocale = locale === "ky" ? "ky-KG" : locale === "en" ? "en-US" : "ru-RU";
  if (!Number.isFinite(diff) || diff < 0 || diff > 86_400_000) {
    return new Intl.DateTimeFormat(numberLocale, { day: "numeric", month: "short" }).format(new Date(date || Date.now()));
  }
  if (diff < 60_000) return t("Только что");
  if (diff < 3_600_000) {
    const minutes = Math.max(1, Math.floor(diff / 60_000));
    return locale === "en" ? `${minutes} min ago` : locale === "ky" ? `${minutes} мүнөт мурун` : `${minutes} мин. назад`;
  }
  const hours = Math.floor(diff / 3_600_000);
  return locale === "en" ? `${hours} hr ago` : locale === "ky" ? `${hours} саат мурун` : `${hours} ч. назад`;
}

function listingVisual(item, large = false) {
  const [symbol, visualClass] = categoryVisuals[item.category] || categoryVisuals["Другое"];
  const images = (item.imageUrls || (item.imageUrl || item.image_url ? [item.imageUrl || item.image_url] : [])).slice(0, 3);
  if (images.length) {
    return `<div class="listing-visual ${large ? "visual-large" : ""}${images.length > 1 ? " has-carousel" : ""}"${images.length > 1 ? ` data-carousel="${images.length}" data-carousel-index="0"` : ""}>
      <div class="carousel-track" data-carousel-track>${images.map((image, index) => `<div class="carousel-slide" style="background-image:url('${escapeHTML(image)}')" role="img" aria-label="${locale === "en" ? `Product photo ${index + 1}` : locale === "ky" ? `Товардын сүрөтү ${index + 1}` : `Фото товара ${index + 1}`}"></div>`).join("")}</div>
      <span class="image-scrim"></span>${item.exchange ? `<span class="image-tag">${t("ОБМЕН")}</span>` : ""}
      ${images.length > 1 ? `<span class="carousel-counter">1 / ${images.length}</span>` : ""}
    </div>`;
  }
  return `<div class="listing-visual ${visualClass} ${large ? "visual-large" : ""}"><span class="visual-corner" aria-hidden="true">✳</span><span class="visual-glyph" aria-hidden="true">${symbol}</span><span class="visual-caption">${escapeHTML(translatedCategory(item.category || "НАХОДКА"))}</span>${item.exchange ? `<span class="image-tag">${t("ОБМЕН")}</span>` : ""}</div>`;
}

function renderCarouselControls(total, variant) {
  const label = locale === "en" ? "Product photo" : locale === "ky" ? "Товардын сүрөтү" : "Фото товара";
  const dots = Array.from({ length: total }, (_, index) =>
    `<button class="carousel-dot${index === 0 ? " active" : ""}" type="button" data-carousel-dot="${index}" aria-label="${label} ${index + 1}" aria-current="${index === 0 ? "true" : "false"}"></button>`,
  ).join("");
  return `<div class="carousel-controls carousel-controls-${variant}" aria-label="${locale === "en" ? "Photo gallery" : locale === "ky" ? "Сүрөттөр" : "Галерея фотографий"}">
    ${variant === "detail" ? `<button class="carousel-arrow" type="button" data-carousel-prev aria-label="${locale === "en" ? "Previous photo" : locale === "ky" ? "Мурунку сүрөт" : "Предыдущее фото"}">‹</button>` : ""}
    <span class="carousel-dots">${dots}</span>
    ${variant === "detail" ? `<button class="carousel-arrow" type="button" data-carousel-next aria-label="${locale === "en" ? "Next photo" : locale === "ky" ? "Кийинки сүрөт" : "Следующее фото"}">›</button>` : ""}
  </div>`;
}

function updateCarousel(carousel, index) {
  const total = Number(carousel.dataset.carousel);
  const nextIndex = (index + total) % total;
  carousel.dataset.carouselIndex = String(nextIndex);
  $("[data-carousel-track]", carousel).style.transform = `translateX(-${nextIndex * 100}%)`;
  const wrapper = carousel.closest(".listing-card, .detail-visual");
  if (!wrapper) return;
  $$(".carousel-dot", wrapper).forEach((dot, dotIndex) => {
    const active = dotIndex === nextIndex;
    dot.classList.toggle("active", active);
    dot.setAttribute("aria-current", String(active));
  });
  const counter = $(".carousel-counter", carousel);
  if (counter) counter.textContent = `${nextIndex + 1} / ${total}`;
}

function initializeCarousels(root = document) {
  for (const timer of carouselTimers.values()) window.clearInterval(timer);
  carouselTimers.clear();
  $$("[data-carousel]", root).forEach((carousel) => {
    const total = Number(carousel.dataset.carousel);
    updateCarousel(carousel, Number(carousel.dataset.carouselIndex) || 0);
    if (total < 2) return;
    const timer = window.setInterval(() => {
      if (carousel.isConnected && !document.hidden) {
        updateCarousel(carousel, Number(carousel.dataset.carouselIndex) + 1);
      }
    }, 4200);
    carouselTimers.set(carousel, timer);
  });
}

function renderPhotoPreviews() {
  const container = $("#photo-preview-grid");
  container.innerHTML = photoUrls.map((url, index) => `<div class="photo-preview"><img src="${escapeHTML(url)}" alt="${locale === "en" ? `Selected photo ${index + 1}` : locale === "ky" ? `Тандалган сүрөт ${index + 1}` : `Выбранное фото ${index + 1}`}"><button class="photo-remove" type="button" data-remove-photo="${index}" aria-label="${locale === "en" ? `Remove photo ${index + 1}` : locale === "ky" ? `Сүрөттү өчүрүү ${index + 1}` : `Удалить фото ${index + 1}`}">×</button><span class="photo-index">${index + 1}</span></div>`).join("");
  const addLabel = locale === "en" ? "Add photos" : locale === "ky" ? "Сүрөт кошуу" : "Добавить фотографии";
  const remain = 3 - photoUrls.length;
  $("#image-filename").textContent = photoUrls.length
    ? `${photoUrls.length} / 3 · ${remain ? (locale === "en" ? `${remain} more allowed` : locale === "ky" ? `Дагы ${remain} кошсо болот` : `Можно добавить ещё ${remain}`) : (locale === "en" ? "Maximum reached" : locale === "ky" ? "Чеги толду" : "Максимум достигнут")}`
    : `${addLabel} · ${locale === "en" ? "JPG, PNG or WebP · 2 MB each" : locale === "ky" ? "JPG, PNG же WebP · ар бири 2 МБ" : "JPG, PNG или WebP · до 2 МБ каждая"}`;
  $("#listing-images").disabled = photoUrls.length >= 3;
}

function renderAdPhotoPreview() {
  const preview = $("#ad-photo-preview");
  if (!preview) return;
  const filename = $("#ad-image-filename");
  const label = $("#ad-image-label");
  label.textContent = locale === "en" ? (adPhotoUrl ? "Change photo" : "Add a photo") : locale === "ky" ? (adPhotoUrl ? "Сүрөттү алмаштыруу" : "Сүрөт кошуу") : (adPhotoUrl ? "Заменить фотографию" : "Добавить фотографию");
  filename.textContent = adPhotoUrl
    ? (locale === "en" ? "1 photo selected · up to 2 MB" : locale === "ky" ? "1 сүрөт тандалды · 2 МБ чейин" : "1 фотография выбрана · до 2 МБ")
    : (locale === "en" ? "One photo · JPG, PNG or WebP · up to 2 MB" : locale === "ky" ? "Бир сүрөт · JPG, PNG же WebP · 2 МБ чейин" : "Одна фотография · JPG, PNG или WebP · до 2 МБ");
  preview.innerHTML = adPhotoUrl
    ? `<div class="photo-preview"><img src="${escapeHTML(adPhotoUrl)}" alt="${locale === "en" ? "Advertisement photo preview" : locale === "ky" ? "Жарнаманын сүрөтүн алдын ала көрүү" : "Предпросмотр фотографии рекламы"}"><button class="photo-remove" type="button" data-remove-ad-photo aria-label="${locale === "en" ? "Remove photo" : locale === "ky" ? "Сүрөттү өчүрүү" : "Удалить фотографию"}">×</button></div>`
    : "";
}

function filteredListings() {
  const category = $("#category-filter").value;
  const region = elements.region.value;
  const city = elements.city.value;
  const min = Number($("#price-min").value) || 0;
  const maxInput = $("#price-max").value;
  const max = maxInput === "" ? Number.POSITIVE_INFINITY : Number(maxInput);
  const exchangeOnly = $("#exchange-filter").checked;
  const needle = currentSearch.trim().toLocaleLowerCase("ru");
  return listings.filter((item) => {
    const matchesText = !needle || [item.title, item.description, item.category, item.city, item.region].join(" ").toLocaleLowerCase("ru").includes(needle);
    const status = item.status || "active";
    const isPubliclyAvailable = status === "active" || status === "sold" || (mineOnly && isOwner(item));
    return isPubliclyAvailable
      && matchesText
      && (!category || item.category === category)
      && (!region || item.region === region)
      && (!city || item.city === city)
      && Number(item.price || 0) >= min
      && Number(item.price || 0) <= max
      && (!exchangeOnly || item.exchange)
      && (!mineOnly || isOwner(item))
      && (!mineOnly || mineStatusFilter === "all" || status === mineStatusFilter);
  }).sort((a, b) => {
    const sort = $("#sort-select")?.value || "newest";
    if (sort === "price-asc") return Number(a.price || 0) - Number(b.price || 0);
    if (sort === "price-desc") return Number(b.price || 0) - Number(a.price || 0);
    return new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0);
  });
}

function renderListingCard(item, index) {
  const owner = isOwner(item);
  const initialsText = escapeHTML(initials(item.sellerName || item.seller_name));
  const category = escapeHTML(translatedCategory(item.category || "Другое"));
  const title = item.title;
  const location = `${translatedCity(item.city || "")}${item.region && item.region !== item.city ? `, ${translatedRegion(item.region).replace(/ область$| Region$| облусу$/, "")}` : ""}`;
  const publishedAt = new Date(item.createdAt || item.created_at || Date.now());
  const dateIsValid = Number.isFinite(publishedAt.getTime());
  const machineDate = dateIsValid ? publishedAt.toISOString() : "";
  const fullDate = dateIsValid
    ? new Intl.DateTimeFormat(locale === "ky" ? "ky-KG" : locale === "en" ? "en-US" : "ru-RU", { dateStyle: "medium", timeStyle: "short" }).format(publishedAt)
    : "";
  const contactAction = (item.status || "active") === "active"
    ? `<button class="quick-contact" type="button" data-contact="${escapeHTML(item.id)}" aria-label="Связаться с продавцом">↗</button>`
    : "";
  const saved = isFavorite(item.id);
  const statusOptions = ["active", "sold", "hidden"].map((status) =>
    `<option value="${status}"${(item.status || "active") === status ? " selected" : ""}>${t(status === "active" ? "Активно" : status === "sold" ? "Продано" : "Скрыто")}</option>`,
  ).join("");
  return `<article class="listing-card" style="--card-delay:${Math.min(index, 9) * 55}ms">
    <button class="listing-open" type="button" data-open-listing="${escapeHTML(item.id)}" aria-label="Подробнее: ${escapeHTML(item.title)}">
      ${listingVisual(item)}
      <div class="card-content">
        <div class="card-meta"><span>${category}</span><time${machineDate ? ` datetime="${machineDate}" title="${escapeHTML(fullDate)}"` : ""}>${formatDate(item.createdAt || item.created_at)}</time></div>
        <h3>${escapeHTML(title)}</h3>
        <div class="card-price">${formatPrice(item.price)}</div>
        <div class="card-bottom"><span class="seller-avatar">${initialsText}</span><span class="seller-name">${escapeHTML(item.sellerName || item.seller_name)}</span><span class="card-location">⌖ ${escapeHTML(location)}</span></div>
      </div>
    </button>
    ${item.imageUrls?.length > 1 ? renderCarouselControls(item.imageUrls.length, "card") : ""}
    ${mineOnly && owner
      ? `<div class="listing-card-manager"><label><span>${t("Статус объявления")}</span><select data-listing-status="${escapeHTML(item.id)}" aria-label="${t("Статус объявления")}: ${escapeHTML(item.title)}">${statusOptions}</select></label><button class="quick-edit" type="button" data-edit-listing="${escapeHTML(item.id)}" aria-label="${t("Изменить объявление")}">✎</button></div>`
      : `<div class="card-quick-actions">
      <button class="favorite-button${saved ? " is-favorite" : ""}" type="button" data-favorite="${escapeHTML(item.id)}" aria-label="${t(saved ? "Удалить из избранного" : "Добавить в избранное")}" title="${t(saved ? "Удалить из избранного" : "Добавить в избранное")}" aria-pressed="${saved}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 8.8c0 4.1-8.4 10-8.4 10s-8.4-5.9-8.4-10A4.4 4.4 0 0 1 12 6.7a4.4 4.4 0 0 1 8.4 2.1Z"/></svg></button>
      ${contactAction}
      ${owner ? `<button class="quick-edit" type="button" data-edit-listing="${escapeHTML(item.id)}" aria-label="Изменить объявление">✎</button>` : ""}
    </div>`}
  </article>`;
}

function renderListings() {
  const matched = filteredListings();
  const visible = matched.slice(0, visibleLimit);
  const management = $("#my-listings-toolbar");
  const owned = mineOnly ? listings.filter(isOwner) : [];
  if (mineOnly && currentUser) {
    const statusCounts = {
      all: owned.length,
      active: owned.filter((item) => (item.status || "active") === "active").length,
      sold: owned.filter((item) => item.status === "sold").length,
      hidden: owned.filter((item) => item.status === "hidden").length,
    };
    const statusTabs = [
      ["all", "Все мои товары"],
      ["active", "Активные"],
      ["sold", "Продано"],
      ["hidden", "Скрыто"],
    ].map(([status, label]) => `<button class="my-listings-tab${mineStatusFilter === status ? " is-selected" : ""}" type="button" data-mine-status="${status}" aria-pressed="${mineStatusFilter === status}"><span>${t(label)}</span><b>${statusCounts[status]}</b></button>`).join("");
    management.innerHTML = `<div class="my-listings-toolbar-top"><div><span class="eyebrow muted-eyebrow">${t("ВАШИ ОБЪЯВЛЕНИЯ")}</span><p>${statusCounts.all} · ${t("Мои объявления")}</p></div><div class="my-listings-toolbar-actions"><button class="button button-outline" type="button" data-view-catalog>${t("Вернуться к каталогу")}</button><button class="button button-dark" type="button" data-create-listing>${t("Добавить товар")} <span aria-hidden="true">＋</span></button></div></div><div class="my-listings-tabs" role="group" aria-label="${t("Статус объявления")}">${statusTabs}</div>`;
  } else {
    management.innerHTML = "";
  }
  management.classList.toggle("hidden", !mineOnly || !currentUser);
  elements.grid.innerHTML = visible.map(renderListingCard).join("");
  initializeCarousels(elements.grid);
  const activeCount = [
    $("#category-filter").value,
    elements.region.value,
    elements.city.value,
    $("#price-min").value,
    $("#price-max").value,
    $("#exchange-filter").checked,
  ].filter(Boolean).length;
  $("#filter-count").textContent = String(activeCount);
  $("#filter-count").classList.toggle("hidden", activeCount === 0);
  $(".market-layout").classList.toggle("filters-open", !$("#filters-panel").hidden);
  elements.count.textContent = mineOnly
    ? locale === "en" ? `${matched.length} of your listings` : locale === "ky" ? `${matched.length} жарыяңыз` : `${matched.length} ваших объявлений`
    : locale === "en" ? `${matched.length} ${matched.length === 1 ? "item" : "items"}`
      : locale === "ky" ? `${matched.length} табылга` : `${matched.length} ${matched.length === 1 ? "находка" : "находок"}`;
  elements.empty.classList.toggle("hidden", matched.length > 0);
  elements.grid.classList.toggle("hidden", matched.length === 0);
  elements.loadMore.classList.toggle("hidden", matched.length <= visibleLimit);
  $("h3", elements.empty).textContent = mineOnly && owned.length === 0
    ? t("Пока нет ваших объявлений")
    : t("На данный момент ничего не найдено");
  $(".empty-state-note", elements.empty).classList.add("hidden");
  $("#retry-load").classList.add("hidden");
  const active = [];
  if (currentSearch) active.push(`Поиск: ${currentSearch}`);
  if ($("#category-filter").value) active.push($("#category-filter").value);
  if (elements.region.value) active.push(elements.region.value);
  if (mineOnly) active.push(t("Мои объявления"));
  $("#active-filters").innerHTML = active.map((filter) => `<span class="filter-chip">${escapeHTML(filter)}</span>`).join("");
  syncCustomSelects();
}

function renderLoadError(error) {
  const message = isSupabaseConfigured
    ? error.message || (locale === "en" ? "Check your connection and Supabase settings." : locale === "ky" ? "Интернет байланышын жана Supabase жөндөөлөрүн текшериңиз." : "Проверьте подключение и настройки Supabase.")
    : t("Для запуска GoMarket настройте Supabase: скопируйте .env.example в .env.local, укажите URL и публичный ключ проекта, затем перезапустите npm run dev.");
  const heading = locale === "en" ? "Could not load listings" : locale === "ky" ? "Жарыялар жүктөлгөн жок" : "Не удалось загрузить объявления";
  const retry = locale === "en" ? "Try again" : locale === "ky" ? "Кайра аракет кылуу" : "Попробовать ещё раз";
  elements.grid.innerHTML = "";
  elements.grid.classList.add("hidden");
  elements.empty.classList.remove("hidden");
  $("h3", elements.empty).textContent = t("На данный момент ничего не найдено");
  const note = $(".empty-state-note", elements.empty);
  note.textContent = `${heading}. ${message}`;
  note.classList.remove("hidden");
  $("#retry-load").textContent = `${retry} ↻`;
  $("#retry-load").classList.toggle("hidden", !isSupabaseConfigured);
  elements.loadMore.classList.add("hidden");
  elements.count.textContent = locale === "en" ? "Connection required" : locale === "ky" ? "Туташуу керек" : "Требуется подключение";
  elements.adGrid.innerHTML = "";
  elements.adGrid.classList.add("hidden");
  elements.adEmpty.classList.remove("hidden");
  $("p", elements.adEmpty).textContent = t("На данный момент ничего не найдено");
}

function renderAds() {
  $("p", elements.adEmpty).textContent = t("На данный момент ничего не найдено");
  elements.adGrid.innerHTML = ads.map((ad, index) => {
    const owner = isOwner(ad);
    const url = /^https?:\/\//i.test(ad.url || "") ? ad.url : "";
    const contact = `<a class="button ad-contact" href="tel:${escapeHTML(normalizedPhone(ad.contact))}">${t("Позвонить")} <span aria-hidden="true">↗</span></a>`;
    return `<article class="ad-card ad-tone-${index % 3}${ad.imageUrl ? " has-image" : ""}">
      ${ad.imageUrl ? `<img class="ad-photo" src="${escapeHTML(ad.imageUrl)}" alt="" loading="lazy">` : ""}
      <div class="ad-card-top"><span class="ad-label"><span>✳</span> ${t("РЕКЛАМА")}</span><span class="ad-card-location">⌖ ${escapeHTML(translatedCity(ad.city))}</span></div>
      <div class="ad-card-content"><div class="ad-orbit" aria-hidden="true"></div><h3>${escapeHTML(ad.title)}</h3><p>${escapeHTML(ad.description)}</p><div class="ad-card-actions">
        ${contact}
        ${url ? `<a class="ad-link" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${t("Сайт")}</a>` : ""}
        ${owner ? `<button class="icon-button ad-edit" data-edit-ad="${escapeHTML(ad.id)}" aria-label="Изменить публикацию">✎</button><button class="icon-button ad-delete" data-delete-ad="${escapeHTML(ad.id)}" aria-label="Удалить публикацию">×</button>` : ""}
      </div></div><button class="report-button" type="button" data-report="ad" data-id="${escapeHTML(ad.id)}">${t("Пожаловаться")} <span aria-hidden="true">↗</span></button>
    </article>`;
  }).join("");
  elements.adEmpty.classList.toggle("hidden", ads.length > 0);
  elements.adGrid.classList.toggle("hidden", ads.length === 0);
}

function updateHeader() {
  elements.profileButton.classList.toggle("hidden", !currentUser);
  elements.profileButton.innerHTML = currentUser
    ? `<span class="user-avatar">${escapeHTML(initials(userLabel()))}</span>`
    : "";
  if (!currentUser) {
    elements.auth.innerHTML = `${t("Войти")} <span aria-hidden="true">↗</span>`;
    elements.auth.title = t("Войти через Google");
    $("#create-button").title = t("Публикация бесплатна");
    return;
  }
  elements.auth.innerHTML = t("Выйти");
  elements.auth.title = locale === "en" ? `Sign out of ${userLabel()}` : locale === "ky" ? `${userLabel()} аккаунтунан чыгуу` : `Выйти из аккаунта ${userLabel()}`;
}

function renderProfile() {
  if (!currentUser) return;
  const ownedListings = listings.filter(isOwner);
  const ownedAds = ads.filter(isOwner);
  const savedListings = favoriteIds.map(getListing).filter(Boolean);
  const email = currentUser.email || t("Аккаунт Google");
  const themeNames = locale === "en"
    ? [["system", "◐", "System"], ["light", "☼", "Light"], ["dark", "◑", "Dark"]]
    : locale === "ky"
      ? [["system", "◐", "Система"], ["light", "☼", "Жарык"], ["dark", "◑", "Караңгы"]]
      : [["system", "◐", "Система"], ["light", "☼", "Светлая"], ["dark", "◑", "Тёмная"]];
  const favoriteRows = savedListings.length
    ? savedListings.map((item) => {
      const title = item.title;
      const location = `${translatedCity(item.city || "")}${item.region && item.region !== item.city ? ` · ${translatedRegion(item.region)}` : ""}`;
      const thumbnail = item.imageUrls?.[0]
        ? `<img src="${escapeHTML(item.imageUrls[0])}" alt="" loading="lazy">`
        : `<span class="profile-favorite-glyph" aria-hidden="true">${escapeHTML((categoryVisuals[item.category] || ["⌂"])[0])}</span>`;
      return `<article class="profile-favorite-row">
        <button class="profile-favorite-open" type="button" data-open-profile-listing="${escapeHTML(item.id)}">
          ${thumbnail}<span class="profile-favorite-info"><b>${escapeHTML(title)}</b><small>${escapeHTML(location)}</small><strong>${formatPrice(item.price)}</strong></span>
        </button>
        <button class="favorite-button is-favorite profile-favorite-remove" type="button" data-favorite="${escapeHTML(item.id)}" aria-label="${t("Удалить из избранного")}" title="${t("Удалить из избранного")}" aria-pressed="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 8.8c0 4.1-8.4 10-8.4 10s-8.4-5.9-8.4-10A4.4 4.4 0 0 1 12 6.7a4.4 4.4 0 0 1 8.4 2.1Z"/></svg></button>
      </article>`;
    }).join("")
    : `<div class="profile-favorites-empty"><span aria-hidden="true">♡</span><b>${t("Пока нет сохранённых товаров")}</b><small>${t("Нажмите на сердечко в карточке, чтобы сохранить товар.")}</small></div>`;
  const listingRows = ownedListings.length
    ? ownedListings.map((item) => {
    const status = item.status || "active";
    const thumbnail = item.imageUrls?.[0] || item.imageUrl
      ? `<img src="${escapeHTML(item.imageUrls?.[0] || item.imageUrl)}" alt="" loading="lazy">`
      : `<span class="profile-favorite-glyph" aria-hidden="true">${escapeHTML((categoryVisuals[item.category] || ["⌂"])[0])}</span>`;
    const statusOptions = ["active", "sold", "hidden"].map((value) =>
      `<option value="${value}"${status === value ? " selected" : ""}>${t(value === "active" ? "Активно" : value === "sold" ? "Продано" : "Скрыто")}</option>`,
    ).join("");
    return `<article class="profile-listing-row">
      <button class="profile-listing-open" type="button" data-open-profile-listing="${escapeHTML(item.id)}">
        ${thumbnail}<span class="profile-listing-info"><b>${escapeHTML(item.title)}</b><small>${escapeHTML(translatedCity(item.city || ""))}${item.region && item.region !== item.city ? ` · ${escapeHTML(translatedRegion(item.region))}` : ""}</small><strong>${formatPrice(item.price)}</strong></span>
      </button>
      <div class="profile-listing-actions">
        <label><span>${t("Статус объявления")}</span><select data-listing-status="${escapeHTML(item.id)}" aria-label="${t("Статус объявления")}: ${escapeHTML(item.title)}">${statusOptions}</select></label>
        <button class="text-button profile-listing-edit" type="button" data-edit-listing="${escapeHTML(item.id)}" aria-label="${t("Изменить объявление")}: ${escapeHTML(item.title)}">${t("Изменить объявление")}</button>
        <button class="text-button danger-text profile-listing-delete" type="button" data-delete-listing="${escapeHTML(item.id)}" aria-label="${t("Удалить")}: ${escapeHTML(item.title)}">${t("Удалить")}</button>
      </div>
    </article>`;
    }).join("")
    : `<div class="profile-favorites-empty"><span aria-hidden="true">＋</span><b>${t("У вас пока нет товаров")}</b></div>`;
  elements.profileContent.innerHTML = `
    <div class="profile-modal-header">
      <div class="profile-identity"><span class="user-avatar profile-avatar">${escapeHTML(initials(userLabel()))}</span><span><span class="eyebrow muted-eyebrow">${t("Профиль")}</span><h2>${escapeHTML(userLabel())}</h2><small>${escapeHTML(email)}</small></span></div>
      <button class="icon-button" data-close="profile-dialog" aria-label="${locale === "en" ? "Close" : locale === "ky" ? "Жабуу" : "Закрыть"}">×</button>
    </div>
    <section class="profile-section">
      <h3>${t("Статистика аккаунта")}</h3>
      <div class="profile-stats">
        <div><strong>${ownedListings.length}</strong><span>${t("Мои товары")}</span></div>
        <div><strong>${ownedAds.length}</strong><span>${t("Моя реклама")}</span></div>
        <div><strong>${savedListings.length}</strong><span>${t("В избранном")}</span></div>
      </div>
    </section>
    <section class="profile-section profile-settings">
      <h3>${t("Настройки")}</h3>
      <div class="profile-setting-row"><span>${t("Тема")}</span><div class="choice-segment">${themeNames.map(([value, icon, label]) => `<button type="button" class="choice-button" data-theme-choice="${value}" aria-label="${escapeHTML(label)}" aria-pressed="${(localStorage.getItem("gomarket-theme") || "system") === value}"><span aria-hidden="true">${icon}</span><span class="choice-text">${label}</span></button>`).join("")}</div></div>
      <div class="profile-setting-row"><span>${t("Язык")}</span><div class="choice-segment">${[["ru", "RU"], ["ky", "KG"], ["en", "EN"]].map(([value, label]) => `<button type="button" class="choice-button${locale === value ? " is-selected" : ""}" data-language-choice="${value}" aria-pressed="${locale === value}">${label}</button>`).join("")}</div></div>
      <div class="profile-setting-row"><span id="profile-sound-label">${t("Звуки интерфейса")}</span><button class="sound-toggle${uiSoundsEnabled ? " is-enabled" : ""}" type="button" data-sound-toggle aria-labelledby="profile-sound-label" aria-pressed="${uiSoundsEnabled}">${t(uiSoundsEnabled ? "Включены" : "Выключены")}</button></div>
    </section>
    <section class="profile-section profile-listings-section">
      <div class="profile-section-heading"><h3>${t("Управление объявлениями")}</h3><div class="profile-listing-heading-actions"><span>${ownedListings.length}</span><button class="button button-outline" type="button" data-profile-create-listing>${t("Добавить товар")} <span aria-hidden="true">＋</span></button></div></div>
      <div class="profile-listing-list">${listingRows}</div>
    </section>
    <section class="profile-section profile-favorites-section">
      <div class="profile-section-heading"><h3>${t("Избранное")}</h3><span>${savedListings.length}</span></div>
      <div class="profile-favorite-list">${favoriteRows}</div>
    </section>
    <div class="profile-modal-footer"><button class="button button-outline" id="profile-signout" type="button">${t("Выйти")}</button></div>`;
  syncPreferenceControls();
}

function renderAll() {
  updateHeader();
  if (loadError) {
    renderLoadError(loadError);
    if (elements.profileDialog.open) renderProfile();
    return;
  }
  renderListings();
  renderAds();
  if (elements.profileDialog.open) renderProfile();
}

function applyTheme() {
  const preference = localStorage.getItem("gomarket-theme") || "system";
  const resolvedTheme = preference === "system" ? (systemThemeQuery.matches ? "dark" : "light") : preference;
  document.documentElement.dataset.theme = resolvedTheme;
  syncPreferenceControls();
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute("content", resolvedTheme === "dark" ? "#171717" : "#f5f5f5");
}

function syncPreferenceControls() {
  const theme = localStorage.getItem("gomarket-theme") || "system";
  $$("[data-theme-choice]").forEach((button) => {
    const selected = button.dataset.themeChoice === theme;
    button.setAttribute("aria-pressed", String(selected));
    button.classList.toggle("is-selected", selected);
  });
  $$("[data-language-choice]").forEach((button) => {
    const selected = button.dataset.languageChoice === locale;
    button.setAttribute("aria-pressed", String(selected));
    button.classList.toggle("is-selected", selected);
  });
  $$("[data-sound-toggle]").forEach((soundToggle) => {
    soundToggle.setAttribute("aria-pressed", String(uiSoundsEnabled));
    soundToggle.classList.toggle("is-enabled", uiSoundsEnabled);
    soundToggle.textContent = t(uiSoundsEnabled ? "Включены" : "Выключены");
  });
}

function finishSplash() {
  if (splashDismissed) return;
  splashDismissed = true;
  window.clearTimeout(splashTimer);
  const splash = $("#splash-screen");
  const delay = Math.max(0, 950 - (Date.now() - splashShownAt));
  window.setTimeout(() => {
    splash.classList.add("splash-hidden");
    splash.setAttribute("aria-hidden", "true");
    document.documentElement.classList.add("app-ready");
    window.setTimeout(() => splash.remove(), 500);
  }, delay);
}

function updateFilterCity() {
  const region = elements.region.value;
  refreshCityOptions(region, elements.city);
  elements.city.disabled = !region;
  renderListings();
}

function imageToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Не удалось прочитать фотографию."));
    reader.readAsDataURL(file);
  });
}

function getListing(id) {
  return listings.find((item) => item.id === id);
}

function getAd(id) {
  return ads.find((item) => item.id === id);
}

function openListingForm(listing = null) {
  if (!requireLogin()) return;
  elements.listingForm.reset();
  photoUrls = [...(listing?.imageUrls || (listing?.imageUrl ? [listing.imageUrl] : []))].slice(0, 3);
  elements.listingForm.elements.id.value = listing?.id || "";
  $("#listing-dialog-title").textContent = listing ? t("Изменить объявление") : t("Новая находка");
  elements.listingForm.elements.title.value = listing?.title || "";
  elements.listingForm.elements.category.value = listing?.category || "";
  elements.listingForm.elements.price.value = listing?.price ?? "";
  elements.listingForm.elements.description.value = listing?.description || "";
  elements.listingForm.elements.sellerName.value = listing?.sellerName || userLabel();
  elements.listingForm.elements.sellerPhone.value = listing?.sellerPhone || currentUser.phone || "";
  elements.listingForm.elements.exchange.checked = Boolean(listing?.exchange);
  $("#listing-region").value = listing?.region || "";
  refreshCityOptions($("#listing-region").value, $("#listing-city"), "Выберите город");
  $("#listing-city").value = listing?.city || "";
  renderPhotoPreviews();
  openDialog(elements.listingDialog);
}

function openAdForm(ad = null) {
  if (!requireLogin()) return;
  elements.adForm.reset();
  elements.adForm.elements.id.value = ad?.id || "";
  $("#ad-dialog-title").textContent = ad ? t("Изменить объявление") : t("Новая публикация");
  elements.adForm.elements.title.value = ad?.title || "";
  elements.adForm.elements.description.value = ad?.description || "";
  elements.adForm.elements.city.value = ad?.city || "";
  elements.adForm.elements.contact.value = ad?.contact || "";
  elements.adForm.elements.url.value = ad?.url || "";
  adPhotoUrl = ad?.imageUrl || "";
  renderAdPhotoPreview();
  syncCustomSelects(elements.adForm);
  openDialog(elements.adDialog);
}

function showSkeletons() {
  elements.grid.innerHTML = Array.from({ length: 6 }, () => '<div class="skeleton-card"><div class="skeleton skeleton-picture"></div><div class="skeleton-line skeleton-short"></div><div class="skeleton-line skeleton-long"></div><div class="skeleton-line skeleton-medium"></div></div>').join("");
  elements.adGrid.innerHTML = Array.from({ length: 2 }, () => '<div class="ad-skeleton"><div class="skeleton skeleton-short"></div><div class="skeleton skeleton-line skeleton-long"></div><div class="skeleton skeleton-line skeleton-medium"></div></div>').join("");
  elements.adGrid.classList.remove("hidden");
  elements.adEmpty.classList.add("hidden");
  elements.count.textContent = locale === "en" ? "Loading listings…" : locale === "ky" ? "Жарыялар жүктөлүүдө…" : "Обновляем объявления…";
}

async function loadData({ refreshing = false } = {}) {
  if (refreshTimer) window.clearTimeout(refreshTimer);
  elements.grid.classList.add("refreshing");
  elements.adGrid.classList.add("refreshing");
  $("#loading-indicator").classList.remove("hidden");
  if (!refreshing) showSkeletons();
  try {
    const next = await data.initialize();
    currentUser = next.user || currentUser;
    listings = next.listings;
    ads = next.ads;
    favoriteIds = next.favorites || [];
    loadError = null;
    renderAll();
    if (refreshing) showToast(locale === "en" ? "Listings refreshed" : locale === "ky" ? "Жарыялар жаңыртылды" : "Объявления обновлены");
  } catch (error) {
    console.error("Could not load GoMarket data.", error);
    loadError = error;
    renderAll();
    showToast(t("Не удалось загрузить данные. Проверьте подключение."), "error");
  } finally {
    refreshTimer = window.setTimeout(() => {
      elements.grid.classList.remove("refreshing");
      elements.adGrid.classList.remove("refreshing");
      $("#loading-indicator").classList.add("hidden");
    }, 320);
    finishSplash();
  }
}

async function handleListingSubmit(event) {
  event.preventDefault();
  if (!requireLogin()) return;
  const form = elements.listingForm;
  const submit = $('button[type="submit"]', form);
  const original = submit.innerHTML;
  submit.disabled = true;
  submit.innerHTML = t("Публикуем…");
  try {
    const fields = new FormData(form);
    const id = fields.get("id");
    const existing = id ? getListing(id) : null;
    const saved = await data.saveListing({
      id: id || undefined,
      title: String(fields.get("title")).trim(),
      category: fields.get("category"),
      price: Number(fields.get("price")),
      region: fields.get("region"),
      city: fields.get("city"),
      description: String(fields.get("description")).trim(),
      sellerName: String(fields.get("sellerName")).trim(),
      sellerPhone: String(fields.get("sellerPhone")).trim(),
      exchange: fields.has("exchange"),
      imageUrls: photoUrls.slice(0, 3),
      createdAt: existing?.createdAt,
    }, currentUser);
    listings = [saved, ...listings.filter((item) => item.id !== saved.id)];
    closeDialog(elements.listingDialog);
    if (!elements.profileDialog.open) mineOnly = true;
    renderAll();
    showToast(t(id ? "Объявление обновлено" : "Ваш товар опубликован"));
    if (!elements.profileDialog.open) $("#market").scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error("Could not save listing.", error);
    showToast(error.message || "Не удалось опубликовать объявление.", "error");
  } finally {
    submit.disabled = false;
    submit.innerHTML = original;
  }
}

async function handleAdSubmit(event) {
  event.preventDefault();
  if (!requireLogin()) return;
  const form = elements.adForm;
  const submit = $('button[type="submit"]', form);
  const original = submit.innerHTML;
  submit.disabled = true;
  submit.innerHTML = t("Публикуем…");
  try {
    const fields = new FormData(form);
    const ad = await data.saveAd({
      id: fields.get("id") || undefined,
      title: String(fields.get("title")).trim(),
      description: String(fields.get("description")).trim(),
      city: fields.get("city"),
      contact: String(fields.get("contact")).trim(),
      url: String(fields.get("url")).trim(),
      imageUrl: adPhotoUrl,
    }, currentUser);
    ads = [ad, ...ads.filter((item) => item.id !== ad.id)];
    closeDialog(elements.adDialog);
    renderAds();
    showToast(t("Ваша публикация появилась в ленте"));
    $("#advertising").scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error("Could not save advertisement.", error);
    showToast(error.message || "Не удалось опубликовать объявление.", "error");
  } finally {
    submit.disabled = false;
    submit.innerHTML = original;
  }
}

async function toggleFavorite(id) {
  const item = getListing(id);
  if (!item || !requireLogin()) return;
  const shouldFavorite = !isFavorite(id);
  try {
    await data.setFavorite(id, currentUser, shouldFavorite);
    favoriteIds = shouldFavorite
      ? [...favoriteIds, id]
      : favoriteIds.filter((favoriteId) => favoriteId !== id);
    renderAll();
    showToast(t(shouldFavorite ? "Добавлено в избранное" : "Удалено из избранного"));
  } catch (error) {
    console.error("Could not update favorite.", error);
    showToast(error.message || "Не удалось обновить избранное.", "error");
  }
}

function openProfile() {
  if (!requireLogin()) return;
  closeMenu({ restoreFocus: false });
  renderProfile();
  openDialog(elements.profileDialog);
}

async function signOutCurrentUser() {
  if (!currentUser) return;
  try {
    await data.signOut();
    currentUser = null;
    favoriteIds = [];
    if (elements.profileDialog.open) closeDialog(elements.profileDialog);
    updateHeader();
    renderAll();
    showToast(t("Вы вышли из аккаунта"), "info");
  } catch (error) {
    console.error("Could not sign out.", error);
    showToast(error.message || "Не удалось выйти из аккаунта.", "error");
  }
}

function openDetails(id) {
  const item = getListing(id);
  if (!item) return;
  const owner = isOwner(item);
  const status = item.status || "active";
  const phone = normalizedPhone(item.sellerPhone || item.seller_phone);
  const whatsapp = `https://wa.me/${phone.replace("+", "")}`;
  $("#detail-body").innerHTML = `
    <div class="detail-visual">${listingVisual(item, true)}${item.imageUrls?.length > 1 ? renderCarouselControls(item.imageUrls.length, "detail") : ""}<button class="icon-button detail-close" data-close="detail-dialog" aria-label="${locale === "en" ? "Close" : locale === "ky" ? "Жабуу" : "Закрыть"}">×</button></div>
    <div class="detail-content">
      <div class="detail-kicker">${escapeHTML(translatedCategory(item.category))} <span>·</span> ${formatDate(item.createdAt || item.created_at)}</div>
      <h2>${escapeHTML(item.title)}</h2><div class="detail-price">${formatPrice(item.price)}</div>
      <p class="detail-description">${escapeHTML(item.description)}</p>
      <div class="detail-place">⌖ ${escapeHTML(translatedCity(item.city))}${item.region && item.region !== item.city ? `, ${escapeHTML(translatedRegion(item.region))}` : ""}${item.exchange ? `<span class="exchange-pill">${t("Можно обменять")}</span>` : ""}</div>
      <div class="seller-card"><span class="seller-avatar seller-avatar-large">${escapeHTML(initials(item.sellerName || item.seller_name))}</span><span class="seller-details"><b>${escapeHTML(item.sellerName || item.seller_name)}</b><small>${t("Автор объявления")}</small></span>${owner ? `<span class="owner-marker">${locale === "en" ? "YOURS" : locale === "ky" ? "СИЗДИКИ" : "ВАШЕ"}</span>` : ""}</div>
      ${status === "active" ? `<div class="detail-contact"><a class="button button-dark contact-phone" href="tel:${escapeHTML(phone)}">${t("Позвонить")} <span aria-hidden="true">↗</span></a><a class="button button-outline contact-whatsapp" href="${escapeHTML(whatsapp)}" target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">↗</span></a></div>
      <div class="payment-note"><span>↗</span> ${t("Оплата напрямую продавцу при личной встрече. GoMarket не принимает платежи.")}</div>` : `<p class="listing-inactive-note">${status === "sold" ? t("Этот товар уже продан.") : t("Связь скрыта, пока товар не активен.")}</p>`}
      <div class="detail-footer"><button class="favorite-action${isFavorite(item.id) ? " is-favorite" : ""}" type="button" data-favorite="${escapeHTML(item.id)}" aria-pressed="${isFavorite(item.id)}"><span aria-hidden="true">♡</span> ${t(isFavorite(item.id) ? "Удалить из избранного" : "Добавить в избранное")}</button>${owner ? `<button class="text-button" data-edit-listing="${escapeHTML(item.id)}">${t("Изменить объявление")} ✎</button><button class="text-button danger-text" data-delete-listing="${escapeHTML(item.id)}">${t("Удалить")}</button>` : `<button class="text-button report-detail" data-report="listing" data-id="${escapeHTML(item.id)}">${t("Пожаловаться")} ↗</button>`}</div>
    </div>`;
  openDialog(elements.detailDialog);
  initializeCarousels(elements.detailDialog);
}

async function updateListingStatus(id, status, control) {
  const item = getListing(id);
  if (!item || !isOwner(item)) {
    showToast(t("Можно изменять только свои объявления."), "error");
    return;
  }
  control.disabled = true;
  try {
    const updated = await data.updateListingStatus(id, status);
    listings = listings.map((listing) => listing.id === id ? updated : listing);
    renderAll();
    if (control.closest("#detail-dialog")) openDetails(id);
    showToast(t("Статус товара обновлён"));
  } catch (error) {
    console.error("Could not update listing status.", error);
    control.disabled = false;
    control.value = item.status || "active";
    showToast(error.message || t("Не удалось изменить статус товара."), "error");
  }
}

async function deleteListing(id) {
  if (!requireLogin()) return;
  const item = getListing(id);
  if (!item || !isOwner(item)) return showToast(t("Можно удалять только свои объявления."), "error");
  if (!window.confirm(t("Подтвердите удаление товара"))) return;
  try {
    await data.deleteListing(id);
    listings = listings.filter((listing) => listing.id !== id);
    closeDialog(elements.detailDialog);
    renderAll();
    showToast(t("Объявление удалено"));
  } catch (error) {
    console.error("Could not delete listing.", error);
    showToast(error.message || "Не удалось удалить объявление.", "error");
  }
}

async function deleteAd(id) {
  if (!requireLogin()) return;
  const ad = getAd(id);
  if (!ad || !isOwner(ad)) return showToast(t("Можно удалять только свои публикации."), "error");
  if (!window.confirm("Удалить рекламную публикацию?")) return;
  try {
    await data.deleteAd(id);
    ads = ads.filter((item) => item.id !== id);
    renderAds();
    showToast(t("Публикация удалена"));
  } catch (error) {
    console.error("Could not delete advertisement.", error);
    showToast(error.message || "Не удалось удалить публикацию.", "error");
  }
}

async function reportContent(type, id) {
  if (!requireLogin()) return;
  if (!window.confirm("Пожаловаться на эту публикацию? Повторные подтверждённые жалобы скрывают контент до проверки.")) return;
  try {
    const result = await data.report(type, id);
    if (result.duplicate) return showToast(t("Вы уже отправили жалобу на эту публикацию."), "info");
    if (result.hidden) {
      if (type === "listing") listings = listings.filter((item) => item.id !== id);
      else ads = ads.filter((item) => item.id !== id);
      renderAll();
      closeDialog(elements.detailDialog);
      showToast(t("Публикация скрыта после жалоб"));
    } else {
      showToast(t("Жалоба отправлена. Спасибо за сигнал."));
    }
  } catch (error) {
    console.error("Could not report content.", error);
    showToast(error.message || "Не удалось отправить жалобу.", "error");
  }
}

function connectEvents() {
  document.addEventListener("click", handleInterfaceClickSound, true);
  $("#search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    currentSearch = elements.search.value;
    visibleLimit = 12;
    mineOnly = false;
    renderListings();
    $("#market").scrollIntoView({ behavior: "smooth" });
  });
  elements.search.addEventListener("input", () => {
    currentSearch = elements.search.value;
    visibleLimit = 12;
    mineOnly = false;
    renderListings();
  });
  const handlePreferenceChoice = (event) => {
    const soundToggle = event.target.closest("[data-sound-toggle]");
    if (soundToggle) {
      uiSoundsEnabled = !uiSoundsEnabled;
      localStorage.setItem("gomarket-sounds", String(uiSoundsEnabled));
      syncPreferenceControls();
      if (uiSoundsEnabled) playNotificationSound("success");
      return;
    }
    const languageChoice = event.target.closest("[data-language-choice]");
    if (languageChoice) {
      locale = languageChoice.dataset.languageChoice;
      localStorage.setItem("gomarket-locale", locale);
      applyTranslations();
      return;
    }
    const themeChoice = event.target.closest("[data-theme-choice]");
    if (themeChoice) {
      localStorage.setItem("gomarket-theme", themeChoice.dataset.themeChoice);
      applyTheme();
    }
  };
  $("#menu-panel").addEventListener("click", handlePreferenceChoice);
  elements.profileContent.addEventListener("click", handlePreferenceChoice);
  systemThemeQuery.addEventListener("change", () => {
    if ((localStorage.getItem("gomarket-theme") || "system") === "system") applyTheme();
  });
  $("#category-filter").addEventListener("change", () => {
    $$(".category-pill").forEach((pill) => pill.classList.toggle("active", pill.dataset.category === $("#category-filter").value));
    mineOnly = false;
    renderListings();
  });
  elements.region.addEventListener("change", updateFilterCity);
  elements.city.addEventListener("change", renderListings);
  ["#price-min", "#price-max", "#exchange-filter"].forEach((selector) => $(selector).addEventListener("input", renderListings));
  $("#reset-filters").addEventListener("click", () => {
    $("#category-filter").value = "";
    elements.region.value = "";
    updateFilterCity();
    $("#price-min").value = "";
    $("#price-max").value = "";
    $("#exchange-filter").checked = false;
    elements.search.value = "";
    currentSearch = "";
    mineOnly = false;
    $$(".category-pill").forEach((pill) => pill.classList.toggle("active", !pill.dataset.category));
    renderListings();
  });
  $("#filter-toggle").addEventListener("click", () => {
    const panel = $("#filters-panel");
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    $("#filter-toggle").setAttribute("aria-expanded", String(!isOpen));
    $("#filter-toggle").classList.toggle("is-active", !isOpen);
    $(".market-layout").classList.toggle("filters-open", !isOpen);
    if (!isOpen) $("#category-filter-trigger").focus({ preventScroll: true });
  });
  $("#sort-select").addEventListener("change", renderListings);
  elements.listingRegion.addEventListener("change", () => refreshCityOptions(elements.listingRegion.value, elements.listingCity, "Выберите город"));
  $("#listing-images").addEventListener("change", async (event) => {
    const files = [...event.target.files || []];
    event.target.value = "";
    if (!files.length) return;
    if (photoUrls.length + files.length > 3) {
      showToast(locale === "en" ? "You can add up to 3 photos." : locale === "ky" ? "Үч сүрөткө чейин кошсо болот." : "Можно добавить не более 3 фотографий.", "error");
    }
    const allowed = files.slice(0, 3 - photoUrls.length);
    try {
      for (const file of allowed) {
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error(locale === "en" ? "Use JPG, PNG, or WebP photos." : locale === "ky" ? "JPG, PNG же WebP сүрөттөрүн колдонуңуз." : "Поддерживаются только фотографии JPG, PNG и WebP.");
        if (file.size > 2 * 1024 * 1024) throw new Error(locale === "en" ? "Each photo must be under 2 MB." : locale === "ky" ? "Ар бир сүрөт 2 МБдан аз болушу керек." : "Размер каждой фотографии должен быть не более 2 МБ.");
      }
      photoUrls = [...photoUrls, ...await Promise.all(allowed.map(imageToDataURL))];
      renderPhotoPreviews();
    } catch (error) {
      showToast(error.message, "error");
    }
  });
  $("#ad-image").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        throw new Error(locale === "en" ? "Use a JPG, PNG, or WebP photo." : locale === "ky" ? "JPG, PNG же WebP сүрөтүн колдонуңуз." : "Поддерживаются только фотографии JPG, PNG и WebP.");
      }
      if (file.size > 2 * 1024 * 1024) {
        throw new Error(locale === "en" ? "The photo must be under 2 MB." : locale === "ky" ? "Сүрөт 2 МБдан аз болушу керек." : "Размер фотографии должен быть не более 2 МБ.");
      }
      adPhotoUrl = await imageToDataURL(file);
      renderAdPhotoPreview();
    } catch (error) {
      showToast(error.message, "error");
    }
  });
  elements.listingForm.addEventListener("submit", handleListingSubmit);
  elements.adForm.addEventListener("submit", handleAdSubmit);
  [elements.listingForm, elements.adForm].forEach((form) => {
    form.addEventListener("reset", () => window.setTimeout(() => syncCustomSelects(form)));
  });
  document.addEventListener("click", (event) => {
    const option = event.target.closest(".custom-select-option");
    if (option) {
      selectCustomOption(option);
      return;
    }
    const trigger = event.target.closest(".custom-select-trigger");
    if (trigger) {
      const wrapper = trigger.closest(".custom-select");
      if (wrapper.classList.contains("is-open")) closeCustomSelect(wrapper);
      else openCustomSelect(wrapper);
      return;
    }
    $$(".custom-select.is-open").forEach((wrapper) => closeCustomSelect(wrapper));
  });
  document.addEventListener("keydown", handleCustomSelectKeydown);
  $("#create-button").addEventListener("click", () => openListingForm());
  $("#create-ad-button").addEventListener("click", () => openAdForm());
  $("#ads-nav").addEventListener("click", () => {
    closeMenu({ restoreFocus: false });
    $("#advertising").scrollIntoView({ behavior: "smooth" });
  });
  $("#my-listings-button").addEventListener("click", () => {
    closeMenu({ restoreFocus: false });
    if (!requireLogin()) return;
    currentSearch = "";
    elements.search.value = "";
    $("#category-filter").value = "";
    elements.region.value = "";
    refreshCityOptions("", elements.city);
    elements.city.value = "";
    $("#price-min").value = "";
    $("#price-max").value = "";
    $("#exchange-filter").checked = false;
    $$(".category-pill").forEach((pill) => pill.classList.toggle("active", !pill.dataset.category));
    mineOnly = true;
    mineStatusFilter = "all";
    visibleLimit = 12;
    renderListings();
    $("#market").scrollIntoView({ behavior: "smooth" });
  });
  $("#my-listings-toolbar").addEventListener("click", (event) => {
    const statusTab = event.target.closest("[data-mine-status]");
    if (statusTab) {
      mineStatusFilter = statusTab.dataset.mineStatus;
      visibleLimit = 12;
      renderListings();
      return;
    }
    if (event.target.closest("[data-create-listing]")) {
      openListingForm();
      return;
    }
    if (event.target.closest("[data-view-catalog]")) {
      mineOnly = false;
      mineStatusFilter = "all";
      renderListings();
    }
  });
  $("#explore-button").addEventListener("click", () => $("#market").scrollIntoView({ behavior: "smooth" }));
  $("#refresh-button").addEventListener("click", () => loadData({ refreshing: true }));
  $("#menu-button").addEventListener("click", toggleMenu);
  elements.profileButton.addEventListener("click", openProfile);
  $("#menu-backdrop").addEventListener("click", () => closeMenu());
  $("#load-more").addEventListener("click", () => {
    visibleLimit += 12;
    renderListings();
  });
  $("#ad-rules-button").addEventListener("click", () => openDialog($("#rules-dialog")));
  $("#site-rules-button").addEventListener("click", () => openDialog($("#site-rules-dialog")));
  $("#privacy-button").addEventListener("click", () => openDialog($("#privacy-dialog")));
  $("#google-button").addEventListener("click", async () => {
    try {
      await data.signInWithGoogle();
    } catch (error) {
      console.error("Google sign-in failed.", error);
      showToast(error.message || "Не удалось войти через Google.", "error");
    }
  });
  elements.auth.addEventListener("click", async () => {
    closeMenu({ restoreFocus: false });
    if (!currentUser) {
      openDialog(elements.authDialog);
      return;
    }
    await signOutCurrentUser();
  });
  document.addEventListener("click", async (event) => {
    const favorite = event.target.closest("[data-favorite]");
    if (favorite) {
      event.preventDefault();
      event.stopPropagation();
      await toggleFavorite(favorite.dataset.favorite);
      return;
    }
    const profileListing = event.target.closest("[data-open-profile-listing]");
    if (profileListing) {
      const { openProfileListing } = profileListing.dataset;
      closeDialog(elements.profileDialog);
      openDetails(openProfileListing);
      return;
    }
    if (event.target.closest("#profile-signout")) {
      await signOutCurrentUser();
      return;
    }
    if (event.target.closest("[data-profile-create-listing]")) {
      openListingForm();
      return;
    }
    if (event.target.closest("[data-remove-ad-photo]")) {
      adPhotoUrl = "";
      renderAdPhotoPreview();
    }
    const removePhoto = event.target.closest("[data-remove-photo]");
    if (removePhoto) {
      photoUrls.splice(Number(removePhoto.dataset.removePhoto), 1);
      renderPhotoPreviews();
    }
    const carouselControl = event.target.closest("[data-carousel-prev], [data-carousel-next], [data-carousel-dot]");
    if (carouselControl) {
      event.preventDefault();
      event.stopPropagation();
      const wrapper = carouselControl.closest(".listing-card, .detail-visual");
      const carousel = $("[data-carousel]", wrapper);
      if (carousel) {
        const index = Number(carousel.dataset.carouselIndex) || 0;
        const next = carouselControl.hasAttribute("data-carousel-prev") ? index - 1
          : carouselControl.hasAttribute("data-carousel-next") ? index + 1
            : Number(carouselControl.dataset.carouselDot);
        updateCarousel(carousel, next);
      }
    }
    const close = event.target.closest("[data-close]");
    if (close) closeDialog($(`#${close.dataset.close}`));
    const open = event.target.closest("[data-open-listing]");
    if (open) openDetails(open.dataset.openListing);
    const contact = event.target.closest("[data-contact]");
    if (contact) {
      const item = getListing(contact.dataset.contact);
      if (item) window.location.href = `tel:${normalizedPhone(item.sellerPhone || item.seller_phone)}`;
    }
    const edit = event.target.closest("[data-edit-listing]");
    if (edit) openListingForm(getListing(edit.dataset.editListing));
    const remove = event.target.closest("[data-delete-listing]");
    if (remove) await deleteListing(remove.dataset.deleteListing);
    const adEdit = event.target.closest("[data-edit-ad]");
    if (adEdit) openAdForm(getAd(adEdit.dataset.editAd));
    const adRemove = event.target.closest("[data-delete-ad]");
    if (adRemove) await deleteAd(adRemove.dataset.deleteAd);
    const report = event.target.closest("[data-report]");
    if (report) await reportContent(report.dataset.report, report.dataset.id);
    if (event.target.id === "retry-load") loadData();
    if (event.target.closest("#menu-panel") && !event.target.closest("#menu-button")) {
      const actionId = event.target.closest("button, select")?.id;
      if (actionId === "ads-nav" || actionId === "my-listings-button" || actionId === "auth-button") closeMenu({ restoreFocus: false });
    }
  });
  document.addEventListener("change", async (event) => {
    const statusControl = event.target.closest("[data-listing-status]");
    if (statusControl) await updateListingStatus(statusControl.dataset.listingStatus, statusControl.value, statusControl);
  });
  [elements.listingDialog, elements.detailDialog, elements.adDialog, elements.authDialog, elements.profileDialog, $("#rules-dialog"), $("#site-rules-dialog"), $("#privacy-dialog")].forEach((dialog) => {
    dialog.addEventListener("close", () => setScrollLock(`dialog:${dialog.id}`, false));
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });
  });
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      elements.search.focus();
    }
    if (event.key === "Escape") {
      if ($("#menu-panel").classList.contains("menu-open")) {
        closeMenu();
        return;
      }
      [elements.listingDialog, elements.detailDialog, elements.adDialog, elements.authDialog, elements.profileDialog, $("#rules-dialog"), $("#site-rules-dialog"), $("#privacy-dialog")]
        .forEach((dialog) => { if (dialog.open) closeDialog(dialog); });
    }
  });
}

async function start() {
  try {
    localStorage.removeItem("gomarket-demo-v1");
  } catch (error) {
    console.warn("Could not clear obsolete local listing data.", error);
  }
  applyTheme();
  setupLocations();
  enhanceCustomSelects();
  applyTranslations();
  connectEvents();
  if (!isSupabaseConfigured) {
    $("#google-button").disabled = true;
    $("#google-button").title = t("Для запуска GoMarket настройте Supabase: скопируйте .env.example в .env.local, укажите URL и публичный ключ проекта, затем перезапустите npm run dev.");
    ["#create-button", "#create-ad-button"].forEach((selector) => { $(selector).disabled = true; });
  }
  splashTimer = window.setTimeout(finishSplash, 5000);
  data.onAuthChange((user) => {
    currentUser = user;
    if (!user) {
      mineOnly = false;
      mineStatusFilter = "all";
    }
    updateHeader();
    loadData();
  });
  await loadData();
}

start();
