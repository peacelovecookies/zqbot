import { sendInlineKeyboard } from './senders.js';

import fs from 'fs';
import path from 'path';

export const createInlineKeyboard = (keyboardElements) => {
  const buttons = keyboardElements.map((row) => row.map(([text, callback_data, url, disable_notification = false]) => {
      const parsed = {
          text,
          callback_data,
          disable_notification,
      };
      if (url) {
          parsed.url = url;
      }
      return parsed;
  }));
  return { 
      reply_markup: {
          inline_keyboard: buttons,
      },
  }
};

export const showMainMenu = (ctx) => {
  try {
    ctx.deleteMessage();
    // const userName = ctx.from.first_name;
    const message = [
      ['Ассалому алайкум "Zamin Qurilish " компаняси сизга Ж/К "Chilonzor Grand Park", Ж/К "Farhod" ва  Ж/К "Shohona" турар жой мажмуаларини таклиф килади.\n'],
      ['Сизга кушимча маьлумот сифатида Нарх, Каталог, Геопозиция ва 3D вариантдаги видео роликларни юбордим куриб чикиб саволларингиз булса мурожат килинг.\n'],
      ['СИЗНИ СОТУВ БУЛИМЛАРИМИЗДА КУТАМИЗ.'],
    ].join('\n');
    const menuElements = [
        [
            ['Bizning uylar | Наши объекты', 'sites'],
            ['Kontaktlar | Контакты', 'contacts']
        ],
    ];
    return sendInlineKeyboard(ctx.chat.id, message, menuElements);
  } catch (err) {}
};

export const deleteTwoLastMessages = async (ctx) => {
  try {
      const chatId = ctx.chat.id;
      const messageId = ctx.update.callback_query.message.message_id;
      await ctx.deleteMessage(messageId, chatId);
      await ctx.deleteMessage(messageId - 1, chatId);
    } catch (err) {
      // console.log(err);
    }
};

export const readFile = (filepath) => {
  const currentDir = process.cwd();
  const fullpath = path.resolve(currentDir, filepath);
  const file = fs.readFileSync(fullpath, 'utf-8');
  return file;
};

export const sendToLog = (ctx) => {
  try {
    const { id, first_name, last_name, username } = ctx.from;
    const msg = [
      [`user id: ${id}`],
      [`first name: ${first_name}`],
      [`last name: ${last_name}`],
      [`username: ${username}`],
    ].join('\n');
    const logGroupId = -463855567;
    sendInlineKeyboard(logGroupId, msg, null, true);
  } catch(e) {}
};
