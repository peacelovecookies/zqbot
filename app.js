import Telegraf from 'telegraf';
import env from 'dotenv';
env.config();

import actions from './src/actions.js';
import { showMainMenu } from './src/utils.js';

export const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

bot.command('start', (ctx) => {
  ctx.deleteMessage();
  showMainMenu(ctx);
});

Object.keys(actions).map((action) => {
  bot.action(action, actions[action]);
});

bot.launch();
