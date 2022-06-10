const mongoose = require('mongoose')
const databaseUrl = process.env.DATABASE_URL

const connect = mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado ao banco de dados com sucesso')
}).catch((error) => {
    console.log('Erro ao se conectar com o banco de dados')
    console.log(error)
})

module.exports = connect