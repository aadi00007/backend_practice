const express = require('express');
const {connectToMongoDB} = require('./connect.js');
const app = express();

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log('mongodb connected'));

const urlRoute = require('./routes/url.js')
app.use(express.json());

app.use('/url', urlRoute);
const PORT = 8000;
app.listen(PORT, ()=>{
    console.log('server running on PORT 8000');
});