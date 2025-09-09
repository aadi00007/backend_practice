const { nanoid } = require('nanoid');
const URL = require('../models/url.js');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' });

    const shortID = nanoid(8); 
    try {
        await URL.create({
            shortID: shortID,
            redirectUrl: body.url,    // Fix: Use the user's actual URL here!
            visitHistory: []
        });
        return res.json({ id: shortID });
    } catch (err) {
        return res.status(500).json({ error: "Database error", details: err.message });
    }
}
module.exports = { handleGenerateNewShortURL };
