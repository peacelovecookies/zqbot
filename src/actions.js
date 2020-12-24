import { sendInlineKeyboard, sendLocation, sendVideo, sendPhoto } from './senders.js';
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
        ['Тут будут контакты и возможно локации офисов'],
        ['Например: Чиланзарский район, массив Чиланзар, 17-й квартал, 38'],
      ].join('\n');
    
      const elements = [
        [
          ['Menejer bilan bog\'lanish | Связаться с менеджером', '', 'https://t.me/zamin_qurilish'],
          ['Lokatsiya | Локация', 'locationChilonzorOffice'],
        ],
        [
          ['Bosh sahifa | На главную', 'main'],
        ]
      ];
    
      sendInlineKeyboard(ctx.chat.id, message, elements);
    } catch (err) {}
  },

  // office locations
  locationChilonzorOffice: (ctx) => {
    try {
      ctx.deleteMessage();
      const latitude = 41.270152;
      const longtitude = 69.194564;
      const elements = [
        [
          ['Orqaga | Назад', 'contacts'],
        ],
      ]
      sendLocation(ctx.chat.id, latitude, longtitude, elements);
    } catch (err) {}
  },
};

export default actions;
