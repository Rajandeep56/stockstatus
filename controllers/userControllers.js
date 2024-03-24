const fs = require("fs");
const path = require("path");

const userDataPath = path.join(__dirname, '..', 'data', 'users.json');
console.log(userDataPath);
const userData = JSON.parse(fs.readFileSync(userDataPath));

const fetchUser = () => {
    return userData;
};

const saveData = (userData) => {
    fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 1))
}

const fetchUserbyId = (id) => {
    const user = userData.find(item => item.id === parseInt(id));
        if(user) {
            return user;
        }
        else{
            throw new Error("User Not Found!!")
        }
};

const editUserbyId = (id, newUserData) => {
    let userFound = false;
    const updatedData = userData.map(item => {
        if(item.id === parseInt(id)) {
            userFound = true;
            return { ...item, ...newUserData};
        }
        return item;
    });
    
    if(!userFound) {
        throw new Error ("User not found");
    }
    userData.length = 0;
    userData.push(...updatedData);
    saveData(userData);
};
module.exports = {fetchUser, fetchUserbyId, editUserbyId};