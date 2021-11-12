const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/piratesdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{console.log('Db Connected')})
.catch((err)=>{console.log('DB Connect error:', err)})