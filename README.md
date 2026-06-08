# 🍃 MongoDB CRUD & Aggregation Demo (Node.js)

A clean, lightweight Node.js script demonstrating database operations in MongoDB using **Mongoose**. This project is ideal for understanding how to perform standard CRUD operations, handle database connections, and run aggregations (such as lookup/joins) in a Node.js environment.

---

## 🚀 Features

This project showcases several fundamental MongoDB operations:
- **Connection Management:** Gracefully connecting to and disconnecting from a MongoDB database.
- **Collection Creation:** Creating new collections programmatically.
- **CRUD Operations:**
  - **Create (Insert):** Adding multiple records to collections simultaneously.
  - **Read (Find):** Fetching and displaying records (including commented examples for sorting and limiting).
  - **Update:** Modifying documents using operators like `$set`.
  - **Delete:** Removing documents based on queries.
- **Aggregations (Lookup / Joins):** Merging data from two collections (`user` and `product`) using the `$lookup` aggregation pipeline.
- **Database Administration:** Dropping/deleting databases and collections.

---

## 🛠️ Prerequisites

Before running this script, ensure you have:
1. **Node.js** installed on your system (v14 or higher recommended).
2. **MongoDB** installed locally and running on standard port `27017`.
   - Alternatively, you can use a MongoDB Atlas URI by setting the environment variable.

---

## 📦 Installation & Setup

1. **Clone or download** this repository to your local machine.
2. Open your terminal in the project directory.
3. Install the required NPM packages:
   ```bash
   npm install
   ```

---

## ⚙️ Configuration

By default, the script connects to a local MongoDB database named `c` at:
```
mongodb://localhost:27017/c
```
To use a custom database URI, you can define the `MONGODB_URI` environment variable before running the script.

---

## 🏃‍♂️ How to Run

You can run the script using the following package scripts:

### Start in Production Mode
Runs the script once using standard Node.js:
```bash
npm start
```

### Start in Development Mode (Live Reload)
Runs the script using `nodemon` to automatically restart whenever code changes:
```bash
npm run dev
```

---

## 📂 Project Structure

```
├── node_modules/       # Node.js dependencies (ignored in Git)
├── .gitignore          # Rules for files to ignore when pushing to GitHub
├── index.js            # Main script containing all MongoDB operations
├── package.json        # Project metadata, scripts, and dependency definitions
└── README.md           # Documentation (You are here!)
```


