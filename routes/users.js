const express = require("express");
const router = express.Router();
require('dotenv').config();
const { fetchUser, fetchUserbyId, editUserbyId } = require("../controllers/userControllers");

router.get('/', async (req,res) => {
    try {
        const user = await fetchUser();
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const userById = await fetchUserbyId(id);
        res.status(200).json(userById);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const newUserData = req.body;
        editUserbyId(id, newUserData);
        res.status(200).json({message: 'User Updated'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;