const express=require("express");
const {users}= require("../data/users.json");
const {books}= require("../data/books.json");
const router=express.Router();

const {UserModel,BookModel}= require("../models/index.js");
const {getAllBooks , getSingleBookById, addNewBook, getAllIsssuedBooks, updateBookById, deleteBook} = require("../controllers/book-controllers.js")


//---------GETTING ALL BOOKS DATA----------------
router.get("/",getAllBooks);

/*router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"got all books",
        data:books,
    });
}); */

//-------------GETTING ISSUED BOOK ---------------
router.get("/issued/user",getAllIsssuedBooks);

/*router.get("/issued/user",(req,res)=>{
    const userwithissuedbookissued = users.filter((each)=>{
     if(each.issuedBook)
       {
         return each
       }
    });
 
    const issuedBooks=[];
    userwithissuedbookissued.forEach((each) => {
     
    const book=books.find((book)=>( book.id === each.issuedBook));
    book.issuedBy=each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate=each.returnDate;
 
    issuedBooks.push(book);
    });
 
    if(issuedBooks.length===0){
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
         data:issuedBooks
     });
    }
 });*/
 
//---------GETTING BOOK BY ID----------------
router.get("/",getSingleBookById);

/*router.get("/:id",(req,res)=>{
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
*/

//--------------ADDING NEW BOOK ---------------
router.post("/",addNewBook);

/*router.post("/",(req,res)=>{
    const {data} = req.body;
    if(!data){
        return res.status(400).json({
            success: false, 
            message:"no data to add a book"
        });
    }
     
 // DATA --> id,name,author,genre,price,publisher
    
    const book= books.find((each)=> each.id ===data.id);
    if(book){
        return res.status(404).json({
            success: false, 
            message:"book id already exists"
        });
    }
    const allBooks={...books,data};
    return res.status(201).json({
            success:true,
            message:"book added successfully",
            data: allBooks
    });   
}); 
*/

//--------------UPDATING BOOK ---------------
router.put("/updatebook/:id",updateBookById);

/*router.put("/updatebook/:id",(req,res)=>{
    const {id}= req.params;
    const {data}=req.body
    
    const book= books.find((each)=> each.id ===id);
    
    if(!book){
        return res.status(400).json({
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
*/

//--------------DELETING BOOK ---------------
router.delete("/:id",deleteBook);

/*router.delete("/:id",(req,res)=>{
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
*/

module.exports=router;