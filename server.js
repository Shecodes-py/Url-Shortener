require('dotenv').config();
const express = require('express');
const moongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(express.json()) // middleware-parsing

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('URL Shortener API is running!');
});

app.listen(port, () => {
    console.log(`URL shortener listening at http://localhost:${port}`);
});

// Define Routes
app.use('/api/url', require('./routes/url')); // For shortening
app.use('/', require('./routes/index'));    // For redirection
