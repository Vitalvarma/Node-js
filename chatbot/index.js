const TelegramBot = require('node-telegram-bot-api');
//botname ------ VitalVarmaBot --------
const token = '7602929329:AAFfVAzjIF9VNlsV_vRWAJjfHjWnOGSqnwg';
const bot = new TelegramBot(token, {polling: true});

async function generateInformation(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    if(response.ok){
        const data = await response.json();
        return data.weight;
    }
    else{
        throw new error('invalid pokemon name');
    }
}


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const pokemonName = msg.text.trim();
    try {
        const weight = await generateInformation(pokemonName);
        await bot.sendMessage(chatId, `The weight of ${pokemonName} is ${weight}`);
    } catch (error) {
        await bot.sendMessage(chatId,'INVALID POKEMON NAME');
    }
});