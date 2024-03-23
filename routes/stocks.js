const express = require("express");
const router = express.Router();
require('dotenv').config();
const { fetchStock, fetchStockbyId, editStockbyId } = require("../controllers/stockControllers");

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

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const newStockData = req.body;
        await editStockbyId(id, newStockData);
        res.status(200).json({message: 'stock item updated'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;