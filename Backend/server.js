const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const adminRouter = require('./routes/adminRoutes');
const blogRouter = require('./routes/blogRoutes');

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db
const connectDB = require('./configs/db.js');
connectDB();

// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


