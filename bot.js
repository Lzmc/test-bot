const mineflayer = require('mineflayer');

const config = {
  host: 'mc.mingxee.xyz',
  port: 9299,
  username: 'MineXeeBot',
  version: '1.21.1',
  reconnectDelay: 5000,
  targetServer: 'smp'
};

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version
  });

  bot.on('login', () => {
    console.log(`[BOT] Logged in as ${bot.username}`);
  });

  bot.on('spawn', () => {
    console.log('[BOT] Spawned.');
    setTimeout(() => {
      bot.chat(`/server ${config.targetServer}`);
      console.log(`[BOT] Switching to ${config.targetServer}.`);
    }, 2000);
  });

  bot.on('end', () => {
    console.log('[BOT] Disconnected. Reconnecting...');
    setTimeout(createBot, config.reconnectDelay);
  });

  bot.on('error', (err) => {
    console.log(`[BOT] Error: ${err.message}`);
  });

  bot.on('kicked', (reason) => {
    console.log(`[BOT] Kicked: ${reason}`);
  });
}

createBot();
