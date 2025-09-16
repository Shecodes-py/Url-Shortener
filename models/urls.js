const moongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String, // Will be generated from base URL + urlCode
    date: { type: String, default: Date.now }
});

module.exports = mongoose.model('Url', urlSchema);