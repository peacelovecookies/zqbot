import Telegraf from 'telegraf';
import express from 'express';

import env from 'dotenv';
env.config();

import actions from './src/actions.js';
import { showMainMenu } from './src/utils.js';

const app = express();

const botToken = process.env.TELEGRAM_API_KEY || '';
export const bot = new Telegraf(botToken);

// const url = process.env.BOT_DOMAIN || '';
// const PORT = process.env.PORT || 3000;

//bot.telegram.setWebhook(`${url}/bot${botToken}`);
//bot.startWebhook(, null, 3000);
//app.use(bot.webhookCallback(`/bot${botToken}`));

bot.start((ctx) => {
  showMainMenu(ctx);
});

Object.entries(actions).map(([actionName, actionCB]) => {
  bot.action(actionName, actionCB);
});

bot.launch();
