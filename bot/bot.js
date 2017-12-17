const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

const token = '456896323:AAHw64stW09wWAKKUJA5LMh9ycfq4Vvr8EQ';
const participants = require('./participants.json')

class FormBot extends TelegramBot {
    constructor(token, options) {
        super(token, options)

        this.participants = participants
    }

    sendGroupMessage(message) {
        this.participants.forEach(participant => {
            this.sendMessage(participant, message, {parse_mode: 'Markdown'})
        })
    }
}

const bot = new FormBot(token, {polling: true});

const participantExist = (list, id) => {
    return list.indexOf(id) >= 0
};

const addParticipant = (list, id) => {
    list.push(id)
    fs.writeFile('participants.json',  JSON.stringify(list), (err) => {
        if (err) throw err
        console.log('added new participant')
    })
};

bot.onText(/\/start/, (msg) => {
    const id = msg.from.id

    if (participantExist(participants, id)) {
        bot.sendMessage(id, "Participant already exist");
    } else {
        addParticipant(participants, id)
        bot.sendMessage(id, "Welcome new member");
    }   
});

module.exports = bot