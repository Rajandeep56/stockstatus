const express = require("express");
const router = express.Router();
require('dotenv').config();
const { fetchStock } = require("../controllers/stockControllers");

router.get('/', async (req,res) => {
    try {
        const stock = await fetchStock();
        res.status(200).json(stock);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'INternal Server Error'});
    }
});

module.exports = router;