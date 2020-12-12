import { sendInlineKeyboard, sendLocation, sendVideo, sendPhoto } from './senders.js';

const info = {
  farhod: {
    video: 'BAACAgIAAxkBAAEIE-xfz60ECr1H_W0BAAHfAk6S8uNL73oAAtwFAAIokiFKXoJe6qJRHRUeBA',
    photo: [],
    prices: [],
    discounts: [],
    description: 'Farhod Kompleks info block',
    location: [41.282189, 69.186509], // [latitude, longtitude]
  },
  shohona: {
    video: '', // link to the video
    description: '',
    location: [], // [latitude, longtitude]
  },
};

const sites = Object.entries(info).reduce((acc, [site, params]) => {
  const { video, description, location: [latitude, longtitude] } = params;

  return {
    ...acc,
    [site]: (ctx) => {
      ctx.deleteMessage();
  
      const chatId = ctx.chat.id;
  
      
      const elements = [
        [
          ['Цены', `${site}Price`],
          ['Получить скидку', `${site}Discount`]
        ],
        [
          ['Фото', `${site}Photo`],
          ['Локация объекта', `${site}Location`],
        ],
        [
          ['Назад к объектам', 'sites'],
        ],
      ];
      sendVideo(chatId, video, description, elements);
    },
  
    [`${site}Price`]: (ctx) => {
      const chatId = ctx.chat.id;
      //sendPhoto(chatId, photo)
    },
  
    [`${site}Discount`]: (ctx) => {
  
    },
  
    [`${site}Photo`]: (ctx) => {
  
    },
  
    [`${site}Location`]: (ctx) => {
      ctx.deleteMessage();
  
      const elements = [
        [
          ['Назад', site],
        ],
      ];
  
      return sendLocation(ctx.chat.id, latitude, longtitude, elements);
    },
  };
}, {});

export default sites;