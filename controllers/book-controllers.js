const {UserModel, BookModel} = require("../models");

exports.getAllBooks = async(req,res) => {
    const books = await BookModel.find();

    if(books.length === 0){
        return res.status(404).json({
            success:false,
            message: "no book found"
        });
    }
    res.status(200).json({
        success:true,
        data:books
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

exports.getAllIsssuedBooks = async(req,res) => {
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