const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const validUrl = require('valid-url');

const Url = require('../models/Url'); // Import the Url model

// @route   POST /api/url/shorten
// @desc    Create short URL
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = process.env.BASE_URL; 

    // Check base url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }

    // Check long url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if (url) {
                res.json(url); // If exists, return existing short URL
            } else {
                const urlCode = shortid.generate();
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server Error');
        }
    } else {
        res.status(401).json('Invalid long url');
    }
});

module.exports = router;