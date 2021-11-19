import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/pathkoli', {
 /* useNewUrlParser: true,
 /* useUnifiedTopology: true,
 /* useCreateIndex: true,
/*}
/* )

/*.then(
/*console.log("Connected to Database")
/*)

/*.catch(err=>console.err);*/

const { MongoClient } = require("mongodb");

// Connection URI
const uri =
"mongodb+srv://pathkoli:<pathkoli>@cluster0.rnqo4.mongodb.net/pathkoli?retryWrites=true&w=majority"

  //"mongodb+srv://sample-hostname:27017/?maxPoolSize=20&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders',orderRouter);
app.get('/api/config/paypal',(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID||'sb'); //sb=sandbox
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);



/* app.get('/', (req, res) => {
   res.send('Server is ready');
 });*/


 app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});