const express = require('express')
const routes = express.Router()

const AnnotationsController = require('./controllers/AnnotationController')
const PriorityController = require('./controllers/PriorityController')
const ContentController = require('./controllers/ContentController')

// Rotas para anotaçoes
routes.post('/annotations', AnnotationsController.create)
routes.get('/annotations', AnnotationsController.read)
routes.delete('/annotations/:id', AnnotationsController.delete )

// Rota para prioridade
routes.get('/priorities', PriorityController.read )
routes.post('/priorities/:id', PriorityController.update)

// Rota Update
routes.post('/contents/:id', ContentController.update)

module.exports = routes