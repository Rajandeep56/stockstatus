const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const stockPath = path.join(__dirname, '..', 'data', 'stock.json');
console.log(stockPath);

const fetchStock = () => {
    return JSON.parse(fs.readFileSync(stockPath));
};

module.exports = {fetchStock};