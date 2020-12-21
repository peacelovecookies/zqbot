import { sendInlineKeyboard, sendLocation, sendVideo, sendPhoto } from './senders.js';
import { showMainMenu } from './utils.js';
import Sites from './sites.js';

const actions = {
  // adding all sites actions
  ...Sites.makeActions(),

  main: (ctx) => {
    ctx.deleteMessage();
    showMainMenu(ctx);
  },

  sites: (ctx) => {
    ctx.deleteMessage();

    const message = [
      ['Zamin Qurilish kompaniyasi  sizga zamonaviy, havfsiz, ko\'rkam va eng asosiysi shinam uylarni taklif etadi.\n'],
      ['Bo\'lajak uyingizni tanlang:'],
    ].join('\n');
    const elements = Object.entries(Sites.info)
      .map(([actionName, { name: siteName }]) => [[siteName, actionName]]);
    elements.push([['Bosh sahifa | На главную', 'main']]);
    sendInlineKeyboard(ctx.chat.id, message, elements);
  },

  contacts: (ctx) => {
    ctx.deleteMessage();
  
    const message = [
      ['Тут будут контакты и возможно локации офисов'],
      ['Например: Чиланзарский район, массив Чиланзар, 17-й квартал, 38'],
    ].join('\n');
  
    const elements = [
      [
        ['Lokatsiya | Локация', 'locationChilonzorOffice'],
      ],
      [
        ['Bosh sahifa | На главную', 'main'],
      ]
    ];
  
    sendInlineKeyboard(ctx.chat.id, message, elements);
  },

  // locations
  locationChilonzorOffice: (ctx) => {
    ctx.deleteMessage();
    const latitude = 41.270152;
    const longtitude = 69.194564;
    const elements = [
      [
        ['Menejer bilan bog\'lanish | Связаться с менеджером', '', 'https://t.me/zamin_qurilish']
      ],
      [
        ['Orqaga | Назад', 'contacts'],
      ],
    ]
    sendLocation(ctx.chat.id, latitude, longtitude, elements);
  },
};

export default actions;
