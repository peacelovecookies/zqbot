import { sendInlineKeyboard } from './senders.js';

export const createInlineKeyboard = (keyboardElements) => {
  const buttons = keyboardElements.map((row) => row.map(([text, callback_data, url]) => {
      const parsed = {
          text,
          callback_data,
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
};

export const deleteTwoLastMessages = (ctx) => {
    const chatId = ctx.chat.id;
    const messageId = ctx.update.callback_query.message.message_id;

    ctx.deleteMessage(messageId, chatId);
    ctx.deleteMessage(messageId - 1, chatId);
};
