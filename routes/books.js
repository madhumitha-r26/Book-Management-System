const express=require("express");
const {books}= require("../data/books.json");
const router=express.Router();

module.exports=router;


//---------GETTING ALL BOOKS DATA----------------
router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"got all books",
        data:books,
    });
}); 

//-------------GETTING ISSUED BOOK ---------------
router.get("/issued",(req,res)=>{
    const userwithissuedbookissued = users.filter((each)=>{
     if(each.issuedbook)
       {
         return each
       }
    });
 
    const issuedbooks=[];
    userwithissuedbookissued.forEach((each) => {
     
    const book=books.find((book)=>( book.id === each.issuedbook));
    book.issuedby=each.name;
    books.issuedate = each.issuedate;
    books.returndate=each.returndate;
 
    issuedbooks.push(book);
    });
 
    if(issuedbooks.length===0){
     return res.status(404).json({
         success:false,
         message:"no books issued yet"
     });
    }
    else
    {
     return res.status(200).json({
         success:true,
         message:"user with issued books",
         data:issuedbooks
     });
    }
 });
 
//---------GETTING BOOK BY ID----------------
router.get("/:id",(req,res)=>{
    const {id} = req.params; //used for getting id
    const book= books.find((each)=> each.id ===id);
    
    if(!book){
        return res.status(404).json({
            success: false,
            message:"book doesn't exist!"
        });
    }
    else{
        return res.status(200).json({
            success:true,
            message:"book found!",
            data: book,
    });   
    }
});











//--------------ADDING NEW BOOK ---------------
router.post("/",(req,res)=>{
    const {id,name,author,
        genre,
        price,
        publisher} = req.body;
    const book= books.find((each)=> each.id ===id);
    
    if(book){
        return res.status(404).json({
            success: false, 
            message:"book with id exists!"
        });
    }
        books.push({
        id,
        name,
        author,
        genre,
        price,
        publisher
        });
        return res.status(201).json({
            success:true,
            message:"book added successfully",
            data: books,
        });   
}); 


//--------------UPDATING BOOK ---------------
router.put("/:id",(req,res)=>{
    const {id}= req.params;
    const {data}=req.body
    const book= books.find((each)=> each.id ===id);
    
    if(!book){
        return res.status(404).json({
            success: false, 
            message:"book doesn't exists!"
        });
    }   
    const updateBookData=books.map((each)=>{
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
        message:"book updated successfully",
        data: updateBookData,   //new array
    });   
}); 


//--------------DELETING BOOK ---------------
router.delete("/:id",(req,res)=>{
    const {id}= req.params;
    const {data}=req.body
    const book= books.find((each)=> each.id ===id);
    
    if(!book){
        return res.status(404).json({
            success: false, 
            message:"book doesn't exists!"
        });
    }  
    const index=books.indexOf(book);
    books.splice(index,1);

    return res.status(200).json({
        success:true,
        message:"book deleted successfully",
        data: books,
    }); 
});


module.exports=router;