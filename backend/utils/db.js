const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// This is a simplified query function for MongoDB
// For complex queries, use the Mongoose models directly
const query = async (query, values) => {
    try {
        // For simple queries, you can use mongoose.connection.db
        // For complex queries, it's better to use the Mongoose models directly
        const db = mongoose.connection.db;
        
        // This is a basic implementation - you might need to adjust based on your specific needs
        if (typeof query === 'string') {
            // If it's a string query, you might want to use native MongoDB driver
            return await db.collection('your_collection').find(query).toArray();
        } else {
            // If it's an object, treat it as a MongoDB query
            return await db.collection('your_collection').find(query).toArray();
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    query
};