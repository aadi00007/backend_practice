const express = require('express');
const {connectToMongoDB} = require('./connect.js');
const URL = require('./models/url.js');
const app = express();
const path = require('path');

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log('mongodb connected'));

const urlRoute = require('./routes/url.js');
const userRoute = require('./routes/user.js');
app.use(express.json());
app.use('/user', userRoute);
app.get('/', async (req, res) => {
    try {
        const urls = await URL.find().sort({ createdAt: -1 });
        res.render('index', { 
            urls: urls,
            baseUrl: `http://localhost:8000`
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});


app.get('/:shortid', async (req, res) => {
    const shortid = req.params.shortid;
    
    try {
        const entry = await URL.findOneAndUpdate(
            {
                shortID: shortid  // Make sure this matches your schema field name
            },
            {
                $push: {
                    visitHistory: {
                        timeStamp: Date.now()
                    }
                }
            },
            { new: true }  // Return updated document
        );
        
        // Check if document was found
        if (!entry) {
            return res.status(404).send('Short URL not found');
        }
        
        // Make sure the field name matches your schema
        res.redirect(entry.redirectUrl);  // or entry.redirectUrl - check your schema
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'))

app.use('/url', urlRoute);
const PORT = 8000;
app.listen(PORT, () => {
    console.log('server running on PORT 8000');
});
