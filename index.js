const mongoose = require('mongoose');

// Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/c';

/**
 * Connect to MongoDB using Mongoose
 */
async function connect() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected to MongoDB successfully.");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        throw err;
    }
}

/**
 * Create collections: 'user' and 'product'
 */
async function createCollections() {
    try {
        const db = mongoose.connection.db;
        await db.createCollection('user');
        await db.createCollection('product');
        console.log("✅ Collections 'user' and 'product' created successfully.");
    } catch (err) {
        console.error("❌ Error creating collections:", err.message);
    }
}

/**
 * Insert sample data into 'user' and 'product' collections
 */
async function insertData() {
    try {
        const db = mongoose.connection.db;
        const userColl = db.collection('user');
        const productColl = db.collection('product');

        // Sample users
        const users = [
            { name: 'abc', email: 'abc@gmail.com', pid: 1 },
            { name: 'xyz', email: 'xyz@gmail.com', pid: 2 },
            { name: 'def', email: 'def@gmail.com', pid: 3 }
        ];

        // Sample products
        const products = [
            { pid: 1, pname: 'p1' },
            { pid: 2, pname: 'p2' },
            { pid: 3, pname: 'p3' }
        ];

        const userResult = await userColl.insertMany(users);
        const productResult = await productColl.insertMany(products);

        console.log("✅ Users inserted:", userResult.insertedCount);
        console.log("✅ Products inserted:", productResult.insertedCount);
    } catch (err) {
        console.error("❌ Error inserting data:", err.message);
    }
}

/**
 * Find and display data from collections
 */
async function findData() {
    try {
        const db = mongoose.connection.db;
        const userColl = db.collection('user');
        const productColl = db.collection('product');

        const users = await userColl.find().toArray();
        const products = await productColl.find().toArray();

        console.log("\n--- Users List ---");
        console.log(users);

        console.log("\n--- Products List ---");
        console.log(products);

        // Additional Query Examples:
        // 1. Sorting by name:
        // const sortedUsers = await userColl.find().sort({ name: 1 }).toArray();
        // 2. Limiting results:
        // const limitedUsers = await userColl.find().limit(2).toArray();
    } catch (err) {
        console.error("❌ Error finding data:", err.message);
    }
}

/**
 * Update user 'abc' email
 */
async function updateData() {
    try {
        const db = mongoose.connection.db;
        const userColl = db.collection('user');

        const result = await userColl.updateOne(
            { name: "abc" },
            { $set: { email: "abc123@gmail.com" } }
        );

        console.log("✅ User update result:", result);
        
        // Example for updating multiple documents:
        // const resultMany = await userColl.updateMany({ name: "abc" }, { $set: { email: "abc123@gmail.com" } });
    } catch (err) {
        console.error("❌ Error updating data:", err.message);
    }
}

/**
 * Delete user 'abc'
 */
async function deleteData() {
    try {
        const db = mongoose.connection.db;
        const userColl = db.collection('user');

        const result = await userColl.deleteMany({ name: 'abc' });
        console.log("✅ User delete result:", result);

        // Example for deleting a single document:
        // const resultOne = await userColl.deleteOne({ name: 'abc' });
    } catch (err) {
        console.error("❌ Error deleting data:", err.message);
    }
}

/**
 * Perform a Lookup Join between 'product' and 'user' collections
 */
async function joinData() {
    try {
        const db = mongoose.connection.db;
        const joinedResult = await db.collection('product').aggregate([
            {
                $lookup: {
                    from: 'user',
                    localField: 'pid',
                    foreignField: 'pid',
                    as: 'userdetail'
                }
            }
        ]).toArray();

        console.log("\n--- Joined Product & User Details (Aggregate Lookup) ---");
        console.log(JSON.stringify(joinedResult, null, 2));
    } catch (err) {
        console.error("❌ Error performing join aggregation:", err.message);
    }
}

/**
 * Drop the database
 */
async function dropDatabase() {
    try {
        const db = mongoose.connection.db;
        await db.dropDatabase();
        console.log("✅ Database deleted/dropped successfully.");
        
        // Example for dropping a specific collection:
        // await db.dropCollection('user');
    } catch (err) {
        console.error("❌ Error dropping database:", err.message);
    }
}

/**
 * Main Execution Flow
 */
async function main() {
    try {
        await connect();

        // Step 1: Create collections
        await createCollections();

        // Step 2: Insert initial sample data (uncomment if needed)
        // await insertData();

        // Step 3: Find and display data (uncomment if needed)
        // await findData();

        // Step 4: Update data (uncomment if needed)
        // await updateData();

        // Step 5: Delete data (uncomment if needed)
        // await deleteData();

        // Step 6: Perform lookup join aggregation
        await joinData();

        // Step 7: Drop database (uncomment if needed)
        // await dropDatabase();

    } catch (err) {
        console.error("❌ Main flow execution error:", err.message);
    } finally {
        // Always close connection to gracefully exit the script
        await mongoose.connection.close();
        console.log("🔌 Disconnected from MongoDB.");
    }
}

main();
