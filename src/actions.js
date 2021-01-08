import { sendInlineKeyboard, sendLocation } from './senders.js';
import { showMainMenu, readFile } from './utils.js';
import sitesAction from './sites.js';

const file = readFile('files/sites.json');
const sites = JSON.parse(file);

const actions = {
  // adding all sites actions
  ...sitesAction(),

  main: (ctx) => {
    showMainMenu(ctx);
  },

  sites: (ctx) => {
    try {
      ctx.deleteMessage();
  
      const message = [
        ['Zamin Qurilish kompaniyasi  sizga zamonaviy, havfsiz, ko\'rkam va eng asosiysi shinam uylarni taklif etadi.\n'],
        ['Bo\'lajak uyingizni tanlang:'],
      ].join('\n');
      const elements = Object.entries(sites)
        .map(([actionName, { name: siteName }]) => [[siteName, actionName]]);
      elements.push([['Bosh sahifa | На главную', 'main']]);
      sendInlineKeyboard(ctx.chat.id, message, elements);
    } catch (err) {}
  },

  contacts: (ctx) => {
    try {
      ctx.deleteMessage();
    
      const message = [
        ['ZQ menejerlari sizni barcha qiziqtirgan savollaringizga javob berishga tayyor, buning uchun bizning ofislarimizdan biriga tashrif buyuring yoki telefon orqali bog\'laning.'],
        ['\n☎️ Tel:'],
        ['\n📞   +998 97 777 72 21'],
        ['\n📞   +998 99 006 66 66'],
        ['\n📞   +998 95 363 55 55'],
        ['\n📞   +998 95 323 55 55'],
        ['\n🏠 Manzil: Chilonzor 17 kvartal'],
        ['📌 Or-r:  (Kafe Yagona, kollej Yunus Rajabiy, Mevazor)'],
      ].join('\n');
    
      const elements = [
        [
          ['Ofis Chilonzor 17 | Офис Чиланзар 17', 'locationChilonzor17Office'],
        ],
        [
          ['Ofis Uchtepa 12 | Офис Учтепа 12', 'locationUchtepa12Office'],
        ],
        [
          ['Bosh sahifa | На главную', 'main'],
        ]
      ];
    
      sendInlineKeyboard(ctx.chat.id, message, elements);
    } catch (err) {}
  },

  // office locations
  locationChilonzor17Office: (ctx) => {
    try {
      ctx.deleteMessage();
      const latitude = 41.270152;
      const longtitude = 69.194564;
      const elements = [
        [
          ['Menejer bilan bog\'lanish | Связаться с менеджером', '', 'https://t.me/zamin_qurilish'],
        ],
        [
          ['Orqaga | Назад', 'contacts'],
        ],
      ]
      sendLocation(ctx.chat.id, latitude, longtitude, elements);
    } catch (err) {}
  },
  locationUchtepa12Office: (ctx) => {
    try {
      ctx.deleteMessage();
      const latitude = 41.2820240;
      const longtitude = 69.187515;
      const elements = [
        [
          ['Menejer bilan bog\'lanish | Связаться с менеджером', '', 'https://t.me/zamin_qurilish_uchtepa12'],
        ],
        [
          ['Orqaga | Назад', 'contacts'],
        ],
      ]
      sendLocation(ctx.chat.id, latitude, longtitude, elements);
    } catch (err) {}
  },

  confirmFixation: (ctx) => {
    try {
      const [, chatId] = ctx.update.callback_query.data.split(' ');
      ctx.deleteMessage();
      const msg = [
        ['Ботдаги хатога дуч келган эдингиз. Биз барчасини тамирладик. Илтимос кайтадан кайтадан уруниб куринг.'],
        ['\nРанее вы столкнулись с ошибкой. Мы ее исправили. Пожалуйста, попробуйте еще раз.'],
      ].join('\n');
      sendInlineKeyboard(chatId, msg, [ [ ['Okay', 'deleteLastMsg'] ] ]);
    } catch(err) {}
  },
  deleteLastMsg: (ctx) => {
    try {
      ctx.deleteMessage();
    } catch(err) {}
  },
};

export default actions;
