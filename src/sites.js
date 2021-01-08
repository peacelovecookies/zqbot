import { sendLocation, sendVideo, sendDocument, sendInlineKeyboard } from './senders.js';
import { deleteTwoLastMessages, readFile } from './utils.js';

const file = readFile('files/sites.json');
const sites = JSON.parse(file);

export default () => Object.entries(sites)
  .reduce((acc, [site, params]) => {
    const { video, description, location: [latitude, longtitude] } = params;
    const { catalog, prices, discounts, name } = params;
  
    return {
      ...acc,
      [site]: (ctx) => {
        try {
          deleteTwoLastMessages(ctx);
          const chatId = ctx.chat.id;
          const message = [name, description].join('\n\n');
          const elements = [
            [
              ['Narxlar | Цены', `${site}Price`],
              ['Chegirmalar | Получить скидку', `${site}Discounts`]
            ],
            [
              ['Katalog | Каталог', `${site}Catalog`],
              ['Uy lokatsiyasi | Локация объекта', `${site}Location`],
            ],
            [
              ['Obyektlarga qaytish | Назад к объектам', 'sites'],
            ],
          ];
          return sendVideo(chatId, video, message, elements);
        } catch(err) {}
      },
    
      [`${site}Price`]: async (ctx) => {
        try {
          ctx.deleteMessage();
          const { file_id, message } = prices;
          const chatId = ctx.chat.id;
          const elements = [
            [
              ['Orqaga | Назад', site],
            ],
          ];
  
          if (file_id instanceof Array) {
            await sendDocument(chatId, file_id[0], message, []);
            return sendDocument(chatId, file_id[1], message, elements);
          }
  
          return sendDocument(chatId, file_id, message, elements);
        } catch(err) {}
      },
    
      [`${site}Discounts`]: (ctx) => {
        try {
          ctx.deleteMessage();
          const { message } = discounts;
          const fullMessage = [name, message.join('\n')].join('\n\n');
          const elements = [
            [
              ['Menejer bilan bog\'lanish | Связаться с менеджером', '', 'https://t.me/zamin_qurilish'],
            ],
            [
              ['Orqaga | Назад', site],
            ],
          ];
          const chatId = ctx.chat.id;
          return sendInlineKeyboard(chatId, fullMessage, elements);
        } catch(err) {}
      },
    
      [`${site}Catalog`]: (ctx) => {
        try {
          ctx.deleteMessage();
          const { file_id, message } = catalog;
          const fullMessage = [name, message].join('\n\n');
          const elements = [
            [
              ['Orqaga | Назад', site],
            ],
          ];
          return sendDocument(ctx.chat.id, file_id, fullMessage, elements);
        } catch(err) {}
      },
    
      [`${site}Location`]: (ctx) => {
        try {
          ctx.deleteMessage();
          const elements = [
            [
              ['Orqaga | Назад', site],
            ],
          ];
      
          return sendLocation(ctx.chat.id, latitude, longtitude, elements);
        } catch(err) {}
      },
    };
  }, {})

