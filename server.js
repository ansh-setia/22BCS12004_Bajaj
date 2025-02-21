const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});


app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        
        const numbers = data.filter(item => /^[0-9]+$/.test(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

        
        const highestAlphabet = alphabets.length
            ? [alphabets.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()))[0]]
            : [];

        
        const response = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: numbers.length ? numbers : 0,
            alphabets: alphabets,
            highest_alphabet: highestAlphabet
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
