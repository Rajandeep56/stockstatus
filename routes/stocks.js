const express = require("express");
const router = express.Router();
require('dotenv').config();
const { fetchStock, fetchStockbyId } = require("../controllers/stockControllers");

router.get('/', async (req,res) => {
    try {
        const stock = await fetchStock();
        res.status(200).json(stock);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'INternal Server Error'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const stockItem = await fetchStockbyId(id);
        res.status(200).json(stockItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error' });
    }
});

module.exports = router;