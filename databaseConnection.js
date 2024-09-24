// //these are same code and no change will happen

// const mongoose= require("mongoose");

// function DbConnection()
// {
//     const DB_URL = process.env.MONGO_URI;

//     mongoose.connect(DB_URL,{
//         useNewUrlParser : true,
//         useUnifiedTopology : true,
//     });
// }

// const db = mongoose.connection;
// db.on("error",console.error.bind(console,"Connection Error"));

// db.once("open",function(){
//     console.log("DB Connected!");
// })

// module.exports = DbConnection;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://madhumitha263:Bms2024@cluster0.ddkir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);