const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const stockPath = path.join(__dirname, '..', 'data', 'stock.json');
console.log(stockPath);
const stockData = JSON.parse(fs.readFileSync(stockPath));

const fetchStock = () => {
    return stockData;
};

const saveData = (stockData) => {
    fs.writeFileSync(stockPath, JSON.stringify(stockData, null, 1))
}

const fetchStockbyId = (id) => {
    const stockItem = stockData.find(item => item.id === parseInt(id));
        if(stockItem) {
            return stockItem;
        }
        else{
            throw new Error("Stock item Not Found!!")
        }
};

const editStockbyId = (id, newStockData) => {
    let itemFound = false;
    const updatedData = stockData.map(item => {
        if(item.id === parseInt(id)) {
            itemFound = true;
            return { ...item, ...newStockData};
        }
        return item;
    });
    
    if(!itemFound) {
        throw new Error ("Item not found");
    }
    stockData.length = 0;
    stockData.push(...updatedData);
    saveData(stockData);
};
module.exports = {fetchStock, fetchStockbyId, editStockbyId};