const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Redoing backend');
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})