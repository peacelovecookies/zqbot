import { sendInlineKeyboard, sendLocation, sendVideo, sendPhoto } from './senders.js';
import { showMainMenu } from './utils.js';
import sites from './sites.js';

const actions = {
  ...sites,
  main: (ctx) => {
    ctx.deleteMessage();
    showMainMenu(ctx);
  },

  sites: (ctx) => {
    ctx.deleteMessage();

    const message = [
      ['Сообщение об объектах: '],
      ['* Выбирите понравившийся объект ниже'],
    ].join('\n');
    const elements = [
      [
        ['Жилой комплекс "Farhod"', 'farhod'],
        ['Объект Б', 'siteB'],
      ],
      [
        ['Объект В', 'siteC'],
        ['Объект Г', 'siteD'],
      ],
      [
        ['На главную', 'main'],
      ],
    ];
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
        ['мы на Чиланзар 17', 'locationChilonzor17'],
        ['мы где-то еще', 'locationSomethingSomething'],
      ],
      [
        ['На главную', 'main'],
      ]
    ];
  
    sendInlineKeyboard(ctx.chat.id, message, elements);
  },

  locationChilonzor17: (ctx) => {
    ctx.deleteMessage();
    const latitude = 41.270152;
    const longtitude = 69.194564;
    const elements = [
      [
        ['Связаться с менеджером', '', 'https://t.me/zamin_qurilish']
      ],
      [
        ['Назад', 'contacts'],
      ],
    ]
    sendLocation(ctx.chat.id, latitude, longtitude, elements);
  },
};

export default actions;
