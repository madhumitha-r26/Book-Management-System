//---------INITIALIZATIONS----------------

const express = require("express");
//const {users}= require("./data/users.json");
//const {books}= require("./data/books.json");
const app = express();
const PORT = 8081;


const userRouter= require("./routes/users.js")
const booksRouter= require("./routes/books.js")


app.use(express.json());

app.use("/users",userRouter);
app.use("/books",booksRouter);




//------SERVER PORT CODE------------
app.get("*", (req, res) => {
    res.status(404).json({
        message: "route doesn't exists",
});
});

app.get("/users", (req, res) => {
    res.status(200).json({
    message: "Server is up and running :-))",
    data:"hey user",
});
});


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});