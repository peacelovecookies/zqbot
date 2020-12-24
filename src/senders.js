import { bot } from '../app.js';
import { createInlineKeyboard } from './utils.js';

const sendErrorMessage = (err) => {
  const { method, payload: { chat_id } } = err.on;
  bot.telegram.sendMessage(
    chat_id,
    'We are really sorry, but something went wrong. Please, restart bot',
    createInlineKeyboard([
      [
        ['Restart', 'main'],
      ],
    ]),
    );

  const errMessage = [
    '\nERROR:\n',
    `date:      ${new Date().toString()}`, 
    `chat id:   ${chat_id}`,
    `method:    ${method}`,
  ].join('\n');
  const logGroupId = -463855567;
  bot.telegram.sendMessage(logGroupId, errMessage);
};

export const sendInlineKeyboard = async (chatId, message, keyboardElements) => {
  try {
    await bot.telegram.sendMessage(chatId, message, createInlineKeyboard(keyboardElements));
  } catch (err) {
    sendErrorMessage(err);
  }
};

export const sendLocation = async (chatId, latitude, longtitude, keyboardElements) => {
  try {
    await bot.telegram.sendLocation(chatId, latitude, longtitude, createInlineKeyboard(keyboardElements));
  } catch (err) {
    sendErrorMessage(err.on.payload.chat_id);
  }
};

export const sendVideo = async (chatId, video, description, keyboardElements) => {
  try {
    await bot.telegram.sendVideo(
      chatId,
      video,
      {
        caption: description,
        parse_mode: 'HTML',
        ...createInlineKeyboard(keyboardElements)
      });
  } catch (err) {
    sendErrorMessage(err);
  }
};

export const sendPhoto = async (chatId, photo, description, keyboardElements) => {
  try {
    await bot.telegram.sendPhoto(
    chatId,
      photo,
      {
        caption: description,
        parse_mode: 'HTML',
        ...createInlineKeyboard(keyboardElements)
      });
  } catch (err) {
    sendErrorMessage(err.on.payload.chat_id);
  }
};

export const sendDocument = async (chatId, document, description, keyboardElements) => {
  try {
    await bot.telegram.sendDocument(
      chatId,
      document,
      {
        caption: description,
        parse_mode: 'HTML',
        ...createInlineKeyboard(keyboardElements)
      });
  } catch (err) {
    sendErrorMessage(err);
  }
};
