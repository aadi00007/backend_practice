const express = require('express');
const app = express();

const urlRoute = require('./routes/url.js')

app.post('/url', urlRoute)
const PORT = 8000;
app.listen(PORT, ()=>{
    console.log('server running on PORT 8000');
});