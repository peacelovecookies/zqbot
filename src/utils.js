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
  //ctx.deleteMessage();
  const userName = ctx.from.first_name;
  const message = [
    [`Здравствуйте, ${userName}! Меня зовут ZQ-bot, я ваш личный помощник.`],
    ['Я расскажу вам про наши объекты, покажу фото, подскажу актуальные цены и даже помогу получить скидку!'],
  ].join('\n');
  const menuElements = [
      [
          ['Наши объекты', 'sites'],
          ['Контакты', 'contacts']
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
