//---------INITIALIZATIONS----------------

const express = require("express");
const { users }= require("../data/users.json");
const router = express.Router();

//const userRouter= require("./routes/users.js")

//router.use(express.json());


/*
+ route: /
+ method: GET
+ description: get all users
+ access: public
+ parameters: none
*/


//http://localhost:8081/users -> it is the URL


/* for book we need seperate js file */

//---------GETTING ALL USERS DATA----------------
router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users,
    });
});


/*
+ route: /:id
+ method: GET
+ description: get single user by their id
+ access: public
+ parameters: id
*/

//---------GETTING USER BY ID----------------
router.get("/:id",(req,res)=>{
    const {id} = req.params; //used for getting id
    const user= users.find((each)=> each.id ===id);
    
    if(!user){
        return res.status(404).json({
            success: false,
            message:"user doesn't exist!"
        });
    }
    else{
        return res.status(200).json({
            success:true,
            message:"user found!",
            data: user,
    });   
    }
});


//--------------ADDING NEW USER ---------------
router.post("/",(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
    const user= users.find((each)=> each.id ===id);
    
    if(user){
        return res.status(404).json({
            success: false, 
            message:"user with id exists!"
        });
    }
        users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
        });
        return res.status(201).json({
            success:true,
            message:"user added successfully",
            data: users,
        });   
}); 


//--------------UPDATING USER ---------------
router.put("/:id",(req,res)=>{
    const {id}= req.params;
    const {data}=req.body
    const user= users.find((each)=> each.id ===id);
    
    if(!user){
        return res.status(404).json({
            success: false, 
            message:"user doesn't exists!"
        });
    }   
    const updateUserData=users.map((each)=>{
        if(each.id===id){
            return {
                ...each,    //old array
                ...data,    //new array
            };
        }
        return each;
    }); 
    return res.status(200).json({
        success:true,
        message:"user updated successfully",
        data: updateUserData,   //new array
    });   
}); 


//--------------DELETING USER ---------------
router.delete("/:id",(req,res)=>{
    const {id}= req.params;
    const {data}=req.body
    const user= users.find((each)=> each.id ===id);
    
    if(!user){
        return res.status(404).json({
            success: false, 
            message:"user doesn't exists!"
        });
    }  
    const index=users.indexOf(user);
    users.splice(index,1);

    return res.status(200).json({
        success:true,
        message:"user deleted successfully",
        data: users,
    }); 
});


//---------USER ID WITH SUBSCRIPTION DETAILS----------
router.get("/subscription-details/:id",(req,res)=>{
    const {id}= req.params;
    const user= users.find((each)=> each.id ===id);
    
    if(!user){
        return res.status(404).json({
            success: false, 
            message:"user with id doesn't exists!"
        });
    }  

    const getdateindays = (data = "")=>{ //empty string is the default value
        let date;
        if(data === ""){
            date = new Date();
        }
        else{
            date = new Date(data);
        }
        let days = Math.floor(date/(1000*60*60*24)); //sec:min:hr 
        return days; //floor is used to get integer type data
    };
    
    const subscriptiontype= (date) =>{
        if((users.subscriptionType == "Basic")){
            date=date+90     //3-months
        }
        else if((users.subscriptionType == "Standard")){
            date=date+180   //6-months
        }
        else if((users.subscriptionType == "Basic")){
            date=date+365   //1-year
        }
        return date;
    };

    // Jan 1 1970 UTC
    let returnDate = getdateindays(user.returnDate); //only for book
    let currentDate = getdateindays();
    let subscriptionDate = getdateindays(user.subscriptionDate);
    let subscriptionExpiration = subscriptiontype(subscriptionDate);

    const data={
        ...user,
        subscriptionExpired : subscriptionExpiration < currentDate,
        daysleftforsubscription : subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine : returnDate < currentDate    //this is nested if else
               ? subscriptionExpiration <= currentDate 
               ? 100 // if part
               : 50 // if-else part
               : 0 //else part
    };

    // console.log(returnDate);
    // console.log(currentDate);
    // console.log(subscriptionDate);
    // console.log(subscriptionExpiration);

    return res.status(200).json({
        success:true,
        message:"subscription detail for the user is:",
        data,
    }); 

});



module.exports=router;