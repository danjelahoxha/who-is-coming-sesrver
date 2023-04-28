To set up and view a MongoDB database locally, follow these steps:

Install MongoDB on your machine:

Download MongoDB Community Edition from the official website: https://www.mongodb.com/try/download/community
Follow the installation instructions for your operating system.
Run MongoDB locally:

For macOS and Linux users, open a terminal and run the following command to start the MongoDB server: mongod
For Windows users, follow these steps:
Open a Command Prompt.
Navigate to the MongoDB installation directory, e.g., cd C:\Program Files\MongoDB\Server\4.4\bin (replace 4.4 with your installed version).
Run the command mongod.exe to start the MongoDB server.
Connect to the local MongoDB instance:

Update the server/src/app.module.ts file in your Nest.js application to connect to the local MongoDB instance. Replace the connection string in MongooseModule.forRoot() with 'mongodb://localhost:27017/whoiscoming'.
Install MongoDB Compass (optional):

MongoDB Compass is a GUI tool that allows you to view and manage your MongoDB databases. Download and install it from the official website: https://www.mongodb.com/try/download/compass
Open MongoDB Compass and connect to your local MongoDB instance using the connection string: mongodb://localhost:27017
Once connected, you can view and manage the data in your local MongoDB instance.
Alternatively, you can use the MongoDB CLI, called mongo, to interact with your local MongoDB instance:

Open a terminal (macOS, Linux) or Command Prompt (Windows).
Run the command mongo to start the MongoDB CLI.
Use commands like show dbs, use <database-name>, and db.<collection-name>.find() to view and manage your local MongoDB data.
By following these steps, you can set up, view, and manage a MongoDB database locally.
