## RESTful CRUD Flask Application Exercise

In this exercise, you will create a RESTful CRUD application using JavaScript. The application will interact with a MySQL database. Follow the steps below to complete the exercise.

### Prerequisites

Before starting the exercise, ensure that you have the following:

- NodeJS installed on your machine

### Step 1: Setting Up the Project

1. Create a new project folder.
3. Open a terminal and navigate to the project folder.
3. Initialize a new Node.js project:

```
npm init -y
```

4. Install the necessary packages. We will be using Express and MySQL:

```
npm install express mysql2
```

### Step 2: Application Setup

1. Create a new JavaScript file called `app.js`.


2. Import the required modules and set up the Express application:

```javascript
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

```

3. Set up the Database connection and use it connect to the database.

```javascript
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n3u3da!',
    database: 'n3u3da!'
});


db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});
```


### Step 3: Implementing CRUD Functionality

1. First add the routing for the findAll capability. 

```javascript
// Retrieve all items
app.get('/items', (req, res) => {
    db.query('SELECT * FROM compact_discs', (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
});
```
2. Now run the app.js file, and test in a browser by invoking your REST API via a simple browser GET request.

```
http://localhost:5000/items
```

3. Now add the functionality to retrieve an item by it's ID. Note that if we get an error, we are returning a 500.

```javascript
// Retrieve a specific item by ID
app.get('/items/:item_id', (req, res) => {
    const { item_id } = req.params;
    db.query('SELECT * FROM compact_discs WHERE id = ?', [item_id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results[0]);
        }
    });
});
```

4. Restart your app.js application and restart it. Now you can test it with your ID, so in a browser, try accessing a specific CD, eg:

```
http://localhost:5000/items/16
```

5. Now add a function to create a new compact disc in the database.


```javascript
// Create a new item
app.post('/items', (req, res) => {
    const { title, artist, price, tracks } = req.body;
    const query = 'INSERT INTO compact_discs (title, artist, price, tracks) VALUES (?, ?, ?, ?)';
    db.query(query, [title, artist, price, tracks], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(201).json({ message: 'Item created successfully', item_id: results.insertId });
        }
    });
});
```
This cannot be tested in a browser, so we will have to use a utility to help us. You will test it later.


6. Now you will add a method to update an existing item. This will look almost the same as the method to add a new item but you are going to execute an update SQL statement instead of an insert.

```javascript
// Update an existing item
app.put('/items/:item_id', (req, res) => {
    const { item_id } = req.params;
    const { title, artist, price, tracks } = req.body;
    const query = 'UPDATE compact_discs SET title = ?, artist = ?, price = ?, tracks = ? WHERE id = ?';
    db.query(query, [title, artist, price, tracks, item_id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json({ message: 'Item updated successfully' });
        }
    });
});
```

7. The last method we will add before you complete your testing is a method to delete a CompactDisc. So add the following function:


```javascript
// Delete an item
app.delete('/items/:item_id', (req, res) => {
    const { item_id } = req.params;
    db.query('DELETE FROM compact_discs WHERE id = ?', [item_id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json({ message: 'Item deleted successfully' });
        }
    });
});
```

8. In the terminal, ensure that the app.js is running the latest version of your code. You will probably need to stop and start it.


## Part 4 Creating Test .rest Files for REST Client Extension in VS Code

In this exercise, you will create a set of test `.rest` files using the REST Client extension in VS Code. These files will allow you to test the functionality of the RESTful CRUD Flask application you previously created. Follow the steps below to complete the exercise.

### Prerequisites

Before starting the exercise, ensure that you have the **REST Client** extension installed in VS Code. 

1. Click on the Extensions icon in the left bar of VSCode.

2. In the search box, type `REST Client`. You will see the result called **Rest Client** from Huachao Mao.

3. Select the extension, and verify that it is installed. If it is, then you can leave this section and proceed to Step 1. If not, click **Install**. Once the install is complete, you can proceed.

### Step 1: Create a New Folder

1. Create a new folder in your project directory and name it `tests`.

### Step 2: Create Test .rest Files

1. In the `tests` folder, create a new file named `get_all_compact_discs.rest`.
2. Open the `get_all_compact_discs.rest` file and add the following content:
   ```
   GET http://localhost:5000/items
   ```
3. Save the file.

4. Repeat the steps above to create the following `.rest` files:

   - `get_compact_disc_by_id.rest`
   ```
   GET http://localhost:5000/items/1
   ```

   - `create_compact_disc.rest`
   ```
   POST http://localhost:5000/items
   Content-Type: application/json

   {
       "title": "New Album",
       "artist": "New Artist",
       "price": 9.99
   }
   ```

   - `update_compact_disc.rest`
   ```
   PUT http://localhost:5000/items/10
   Content-Type: application/json

   {
       "title": "Updated Album",
       "artist": "Updated Artist",
       "price": 11.99
   }
   ```

   - `delete_compact_disc.rest`
   ```
   DELETE http://localhost:5000/items/10
   ```

### Step 3: Run Test Requests

1. Open the `.rest` file you want to test (e.g., `get_all_compact_discs.rest`) in VS Code.
2. Click on the "Send Request" button next to the request URL.
3. Observe the response in the VS Code output panel.
4. Repeat the steps for the other `.rest` files you created.

