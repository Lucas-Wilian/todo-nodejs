const express = require('express')
const routes = require('./routes')
const app = express()

require('./config/dbConfig')

app.use(express.json())
app.use(routes)

app.listen(3333, () => console.log('O servidor esta rodando na porta: 3333 🚀🔥'))