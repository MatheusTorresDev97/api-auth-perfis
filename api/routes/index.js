const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute')
const usuario = require('./usuariosRoute')
const auth = require('./authRoute')
const role = require('./role')
const permissao = require('./permissao')

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    produto,
    usuario,
    role,
    permissao
  )
}