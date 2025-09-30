const express = require('express');
const { nanoid } = require('nanoid');

const URL = require('../models/url.js');

const router = express.Router();



router.post('/', async (req, res) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Check if URL already exists
        const existingUrl = await URL.findOne({ redirectURL: url });
        if (existingUrl) {
            return res.redirect('/');
        }

        const shortID = nanoid(8);
        await URL.create({
            shortId: shortID,
            redirectURL: url,
            visitHistory: [],
            clicks: 0
        });

        res.redirect('/');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
