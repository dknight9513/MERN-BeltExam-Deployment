const Pirates = require('../controllers/pirates')


module.exports = (app) => {
    app.get('/api/pirates', Pirates.index)
    app.post('/api/pirates', Pirates.create)
    app.put('/api/pirates/:id',Pirates.update)
    app.get('/api/pirates/:id', Pirates.show)
    app.delete('/api/pirates/:id', Pirates.delete)
}