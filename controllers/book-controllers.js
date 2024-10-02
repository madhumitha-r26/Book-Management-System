const {UserModel, BookModel} = require("../models");

exports.getAllBooks = async(req,res) => {
    const books = await BookModel.find()

    if(books.length === 0){
        return res.status(404).json({
            success:false,
            message: "no book found"
        });
    }
    res.status(200).json({
        success:true,
        data:books,
    });
};

exports.getSingleBookById = async(res,req) => {
    const {id} = req.params;
    const books = await BookModel.findById(id);

    if(!books){
        return res.status(404).json({
            success:false,
            message: "book not found"
        });
    }
    res.status(200).json({
        success:true,
        message:"book found by the id",
        data:books
    });

};

exports.getAllIsssuedBooks = async(req,res) => { //dto is used only here
    const books = await UserModel.find({
        issuedBooks:{$exists:true},
    }).populate("issuedBook");

    if(issuedBooks.length === 0){
        return res.status(404).json({
            success:false,
            message: "no bookhave been issued yet"
        });
    }
    res.status(200).json({
        success:true,
        message:"users with issued books",
        data:books
    });
};

exports.addNewBook=async (req,res) =>{
    const {data} = req.body;

    if(!data){
        return res.status(400).json({
            success: false,
            message: "no data to add a book!"
        });
    }

   const book = await BookModel.create(data);
   const allBooks = await BookModel.find();
    if(book){
        return res.status(400).json({
            success: false,
            message: "id already exists!!"
        });
    }
}

exports.updateBookById=async (req,res)=>{
    const {id}= req.params;
    const {data}=req.body;
    
    const updatedBook= await BookModel.findOneandUpdate(
        {
            _id: id,
        },
        data,
        {
            new:true,
        }
    );
    
    return res.status(200).json({
        success:true,
        message:"book updated successfully",
        data: updatedBook,  
    });   
}

exports.deleteBook=async(req,res)=>{
    const {id}= req.params;
    const {data}=req.body
    const book= books.find((each)=> each.id ===id);
    
    if(!book){
        return res.status(404).json({
            success: false, 
            message:"book doesn't exists!"
        });
    }  
    const index= books.indexOf(book);
    books.splice(index,1);

    return res.status(200).json({
        success:true,
        message:"book deleted successfully",
        data: books
    }); 
}