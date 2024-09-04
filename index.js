const express = require("express");
const {users}= require("./data/users.json");
const {books}= require("./data/books.json");
const app = express();
const PORT = 8081;

app.use(express.json());

/*
+ route: /users
+ method: GET
+ description: get all users
+ access: public
+ parameters: none
*/



/*
+ route: /users/:id
+ method: GET
+ description: get single user by their id
+ access: public
+ parameters: id
*/

app.get("/users/:id",(res,req)=>{
    const {id} = req.params;
    const user= users.find((each)=> each.id ===id);
    if(user){
        return res.status(404).json({
            success: false,
            message:"user doesn't exist"
        });
    }
    else{
        app.get("/users",(req,res) =>{
            res.status(200).json({
                success:true,
                data: users,
            });
        });
    }
});


app.get("/", (req, res) => {
    res.status(200).json({
    message: "Server is up and running :-))",
    data:"hey",
});
return res.status(404).json({
    success: true,
    message:"user found",
    data:user
});
}); 

app.get("*", (req, res) => {
    res.status(404).json({
        message: "route doesn't exists",
});
});

app.listen(PORT, () => {
console.log(`Server is running at port $(PORT)`);
});