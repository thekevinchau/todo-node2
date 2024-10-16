const express = require('express');
const app = express();
const router = require('./routes/router')
const cors = require('cors')

require('dotenv').config();
console.log(__dirname)
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api', router)


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})