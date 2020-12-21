import { bot } from '../app.js';
import { createInlineKeyboard } from './utils.js';

export const sendInlineKeyboard = (chatId, message, keyboardElements) => {
  bot.telegram.sendMessage(chatId, message, createInlineKeyboard(keyboardElements));
};

export const sendLocation = (chatId, latitude, longtitude, keyboardElements) => {
  bot.telegram.sendLocation(chatId, latitude, longtitude, createInlineKeyboard(keyboardElements));
};

export const sendVideo = (chatId, video, description, keyboardElements) => {
  bot.telegram.sendVideo(
    chatId,
    video,
    {
      caption: description,
      parse_mode: 'HTML',
      ...createInlineKeyboard(keyboardElements)
    });
};

export const sendPhoto = (chatId, photo, description, keyboardElements) => {
  bot.telegram.sendPhoto(
    chatId,
    photo,
    {
      caption: description,
      parse_mode: 'HTML',
      ...createInlineKeyboard(keyboardElements)
    });
};

export const sendDocument = (chatId, document, description, keyboardElements) => {
  bot.telegram.sendDocument(
    chatId,
    document,
    {
      caption: description,
      parse_mode: 'HTML',
      ...createInlineKeyboard(keyboardElements)
    });
};
