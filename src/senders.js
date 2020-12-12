import { bot } from '../app.js';
import { createInlineKeyboard } from './utils.js';

export const sendInlineKeyboard = (chatId, message, keyboardElements) => {
  return bot.telegram.sendMessage(chatId, message, createInlineKeyboard(keyboardElements));
};

export const sendLocation = (chatId, latitude, longtitude, keyboardElements) => {
  return bot.telegram.sendLocation(chatId, latitude, longtitude, createInlineKeyboard(keyboardElements));
};

export const sendVideo = (chatId, video, description, keyboardElements) => {
  return bot.telegram.sendVideo(
    chatId,
    video,
    {
      caption: description,
      parse_mode: 'HTML',
      ...createInlineKeyboard(keyboardElements)
    });
};

export const sendPhoto = (chatId, photos, description, keyboardElements) => {
  if (photos.length < 2) {

  }

  return bot.telegram.sendVideo(
    chatId,
    video,
    {
      caption: description,
      parse_mode: 'HTML',
      ...createInlineKeyboard(keyboardElements)
    });
};

export const sendMedia = (chatId, type, media) => {

};
