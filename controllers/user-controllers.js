
const {UserModel, BookModel} = require("../models");

exports.getAllUsers = async(req,res) => {
    const users = await BookModel.find()

    if(users.length === 0){
        return res.status(404).json({
            success:false,
            message: "no user found"
        });
    }
    res.status(200).json({
        success:true,
        data:users,
    });
};

exports.getSingleUserById = async(res,req) => {
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

};

exports.getSubscribedUser = async(req,res) => { //dto is used only here
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

};

exports.addNewUser=async (req,res) =>{
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
}

exports.updateUserById=async (req,res)=>{
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
}

exports.deleteUser=async (req,res)=>{
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
}