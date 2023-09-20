const { NlpManager } = require('node-nlp')
const readline = require('readline')

console.log('Starting chatbot...')

const manager = new NlpManager({ languages: ['en'] })

manager.load()

const rl = readline.createInterface(process.stdin, process.stdout)

console.log('Chatbot started!')

rl.setPrompt('> ')
rl.prompt()

rl.on('line', async (line) => {
    const response = await manager.process('en', line)
    console.log(response.answer)
    rl.prompt()
}).on('close', () => {
    process.exit(0)
})