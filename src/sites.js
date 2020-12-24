import { sendLocation, sendVideo, sendDocument } from './senders.js';
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
      },
    
      [`${site}Price`]: async (ctx) => {
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
      },
    
      [`${site}Discounts`]: (ctx) => {
        ctx.deleteMessage();
        const { file_id, message } = discounts;
        const fullMessage = [name, message].join('\n\n');
        const elements = [
          [
            ['Orqaga | Назад', site],
          ],
        ];
        const chatId = ctx.chat.id;
        return sendDocument(chatId, file_id, fullMessage, elements);
      },
    
      [`${site}Catalog`]: (ctx) => {
        ctx.deleteMessage();
        const { file_id, message } = catalog;
        const fullMessage = [name, message].join('\n\n');
        const elements = [
          [
            ['Orqaga | Назад', site],
          ],
        ];
        return sendDocument(ctx.chat.id, file_id, fullMessage, elements);
      },
    
      [`${site}Location`]: (ctx) => {
        ctx.deleteMessage();
        const elements = [
          [
            ['Orqaga | Назад', site],
          ],
        ];
    
        return sendLocation(ctx.chat.id, latitude, longtitude, elements);
      },
    };
  }, {})

