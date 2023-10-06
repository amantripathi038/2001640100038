require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', (req, res) => {
    res.send(`Server is working fine.`);
})

app.get('/numbers', async (req, res) => {
    let urls = req.query?.url;
    if (!Array.isArray(urls)) urls = [urls];
    const result = []
    await Promise.all(urls.map(async url => {
        try {
            const r = await axios.get(url);
            result.push(...r.data?.numbers)
        }
        catch (err) {
            console.log("Error");
        }
    }));
    console.log(result);
    res.status(200).json({
        message: "success",
        result: result
    });

})


app.listen(process.env.PORT, function () {
    console.log(`Listening on ${process.env.PORT}`);
})