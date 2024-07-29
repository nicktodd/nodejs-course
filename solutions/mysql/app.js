const mysql = require('mysql2/promise');

async function connectToDatabase() {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'c0nygre',
        database: 'conygre'
    });
    return db;
}

async function retrieveCompactDiscs(db) {
    const [rows] = await db.execute('SELECT * FROM compact_discs');
    console.log("Retrieved Compact Discs:");
    rows.forEach(cd => {
        console.log(cd);
    });
}

async function updateCompactDisc(db) {
    const [result] = await db.execute("UPDATE compact_discs SET title = 'New Title' WHERE id = 10");
    console.log(`Updated ${result.affectedRows} row(s)`);
}

async function deleteCompactDisc(db) {
    const [result] = await db.execute("DELETE FROM compact_discs WHERE id = 10");
    console.log(`Deleted ${result.affectedRows} row(s)`);
}

async function insertCompactDisc(db) {
    const [result] = await db.execute("INSERT INTO compact_discs (title, artist, price, tracks) VALUES ('New Disc', 'New Artist', 12.99, 10)");
    console.log(`Inserted ${result.affectedRows} row(s)`);
}

async function testRetrieval() {
    const db = await connectToDatabase();
    await retrieveCompactDiscs(db);
    await db.end();
}

async function testUpdate() {
    const db = await connectToDatabase();
    await updateCompactDisc(db);
    await retrieveCompactDiscs(db);
    await db.end();
}

async function testDeletion() {
    const db = await connectToDatabase();
    await deleteCompactDisc(db);
    await retrieveCompactDiscs(db);
    await db.end();
}

async function testInsertion() {
    const db = await connectToDatabase();
    await insertCompactDisc(db);
    await retrieveCompactDiscs(db);
    await db.end();
}

// Call the desired test function
testRetrieval();
// testUpdate();
// testDeletion();
// testInsertion();