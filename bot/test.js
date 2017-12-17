const fs = require('fs')

fs.readFile('participants.json', 'utf8', (err,data) => {
    if (err) throw err
    const participants = JSON.parse(data)
    participants.push('123')
    fs.writeFile('participants.json', JSON.stringify(participants), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
})