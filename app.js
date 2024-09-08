const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

app.use(bodyParser.json());

app.get('/getData', (req, res) => {
    console.log("hello");
    res.status(200).send("Hello, World!");
});

app.post('/getResponse', async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); 
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = req.body.question;
        if (!prompt) {
            return res.status(400).json({ error: "No question provided" });
        }

        const result = await model.generateContent(prompt);
        const response = result.response.text();
        
        res.status(200).json({
            response: response
        });
    } catch (error) {
        console.error("Error in /getResponse:", error);
        res.status(500).json({
            error: "An error occurred while processing your request"
        });
    }
});

module.exports = app;
