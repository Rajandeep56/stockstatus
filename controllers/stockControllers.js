const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const stockPath = path.join(__dirname, '..', 'data', 'stock.json');
console.log(stockPath);
const stockData = JSON.parse(fs.readFileSync(stockPath)).paint_stock;

const fetchStock = () => {
    return stockData;
};

const fetchStockbyId = (id) => {
    const stockItem = stockData.find(item => item.id === parseInt(id));
        if(stockItem) {
            return stockItem;
        }
        else{
            throw new Error("Stock item Not Found!!")
        }
};
module.exports = {fetchStock, fetchStockbyId};