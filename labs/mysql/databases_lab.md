## Accessing Compact Discs Table with Python Script Exercise

In this exercise, you will write a JavaScript file to access and manipulate the `compact_discs` table in the existing MySQL database. 

Follow the steps below to complete the exercise.

### Prerequisites

Before starting the exercise, ensure that you have the following:

- NodeJS is installed on your machine


### Step 0: Setting up the Database

The following instructions involve the command prompt. You can also use MySQL Workbench if you prefer. The script is located here:  labs\mysql\createTables.sql.

1.	MySQL should be installed and running on your machine. The script for creating the Compact Disc tables can be found in <LAB_HOME>labs\mysql \createTables.sql, so launch a command prompt in this folder.

2.	Type ```mysql  –u root -p``` and press enter.

3.	Enter the database password, which if you are using the course VM, will be ```c0nygre```.

4.	To run the script, enter ```\. createTables.sql```. See Figure 1. Note that the path might be different depending upon where you created the command prompt.

![Running the MySQL Script](./images/mysql-script.png)

5.	To confirm the tables have been created, in the console, type select * from compact_discs; to see the listing, and then select * from tracks; to see the second listing.


### Part 1: Setting Up the Project

1. Create a new folder on your machine for the exercise.
2. Open a text editor (e.g. Visual Studio Code).
3. Create a new JavaScript file with a `.js` extension (e.g., `access_compact_discs.js`).
4. Create an NodeJS project using ```npm init```
5. Use the default options
6. Install the database library using ```npm install```:

```
npm install mysql2
```

### Part 2: Importing Required Modules

1. At the beginning of the script, import the necessary modules:
   
   ```javascript
   const mysql = require('mysql2/promise');
   ```

2. In the file, create a function that will be used to establish a connection to the MySQL database:

   ```javascript
   async function connectToDatabase() {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'c0nygre',
        database: 'conygre'
    });
    return db;
   }
   ```

3. Add an asyncronous function to execute a SELECT query to retrieve all compact discs from the `compact_discs` table. Then function will receive the connection as a parameter.

   ```javascript
   async function retrieveCompactDiscs(db) {
    const [rows] = await db.execute('SELECT * FROM compact_discs');
    console.log("Retrieved Compact Discs:");
    rows.forEach(cd => {
        console.log(cd);
    });
    return rows;
   }
   ```
   This retrieves all records from the `compact_discs` table and returns the results.

4. Add a function to test that you can now use the two functions to retrieve the compact discs data and close the connection:
   
   ```javascript
   async function testRetrieval() {
    const db = await connectToDatabase();
    await retrieveCompactDiscs(db);
    await db.end();
   }  
   ```

5. Run the codee and verify that th data is retrieved and displayed on the console.

### Part 3: Updating a Compact Disc

1. Now add a function to update a CompactDisc object. For now, just change the title for a specific CD.

```javascript
async function updateCompactDisc(db) {
    const [result] = await db.execute("UPDATE compact_discs SET title = 'New Title' WHERE id = 10");
    console.log(`Updated ${result.affectedRows} row(s)`);
}
```


2. To test the update, add a function that will test your update function. Remember you will need to connect first.

```javascript
async function testUpdate() {
    const db = await connectToDatabase();
    await updateCompactDisc(db);
    await retrieveCompactDiscs(db);  // Verify update
    await db.end();
}
```

3. Add some code to call your function.

```javascript
testUpdate();
```

### Part 4: Deleting a Compact Disc

1. You will now add a function to delete a compact disc. For now, in your function, delete the CD with an ID of 10.

```javascript
async function deleteCompactDisc(db) {
    const [result] = await db.execute("DELETE FROM compact_discs WHERE id = 10");
    console.log(`Deleted ${result.affectedRows} row(s)`);
}
```

2. As before, add the code required to test your deletion.

```javascript
async function testDeletion() {
    const db = await connectToDatabase();
    await deleteCompactDisc(db);
    await retrieveCompactDiscs(db);  // Verify deletion
    await db.end();
}

testDeletion();
```

### Part 5: Inserting a New Compact Disc

1. Finally, you will insert a new CompactDisc into the database. Add a function to complete an insert. You can choose the album details!

```javascript
async function insertCompactDisc(db) {
    const [result] = await db.execute("INSERT INTO compact_discs (title, artist, price, tracks) VALUES ('New Disc', 'New Artist', 12.99, 10)");
    console.log(`Inserted ${result.affectedRows} row(s)`);
}
```

2. Add the necessary code to test your insertion. 

```javascript
async function testInsertion() {
    const db = await connectToDatabase();
    await insertCompactDisc(db);
    await retrieveCompactDiscs(db);  // Verify insertion
    await db.end();
}

testInsertion();
```