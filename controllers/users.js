const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const users = await db.collection('users').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'An error occurred', error: err });
    }
};

const getSingle = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const userId = new ObjectId(req.params.id);
        const user = await db.collection('users').findOne({ _id: userId });
        if (user) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occurred', error: err });
    }
};

module.exports = {
    getAll,
    getSingle
};
