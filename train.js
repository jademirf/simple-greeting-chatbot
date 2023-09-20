const { NlpManager } = require('node-nlp');
const fs = require('fs')

const manager = new NlpManager({ languages: ['en']})

const files = fs.readdirSync('./intents')

files.map(file => {
    console.log('Starting chat training...')
    let data = fs.readFileSync(`./intents/${file}`)

    data = JSON.parse(data)

    const intent = file.replace('.json', '')
    for (const question of data.questions) {
        manager.addDocument('en', question, intent)
    }
    console.log('Questions loaded...')
    for (const answer of data.answers) {
        manager.addAnswer('en', intent, answer)
    }
    console.log('Answers loaded...')
})

const train_save = async () => {
    await manager.train()
    manager.save()
}

train_save()
console.log('Train saved...')