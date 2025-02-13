const Category = require('../models/Category')
const { errorHandler} = require('../helpers/dberrorHandler') //Llenar archivo desde git tuto

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err) // o dejar un mensaje "error en x lado"
            })
        }
        res.json({data})
    })
}

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err) // o dejar un mensaje "error en x lado"
            })
        }
        res.json(data)
    })
}

exports.remove = (req, res) => {
    let category = req.category
    category.remove((err, data) => {
        if(err) {
            return res.status(400).json({
            error: errorHandler(err)
            })
        }
        res.json({
            message: "Category succesfully deleted"
        })
    })
  }

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category does not exist"
            });
        }
        req.category = category;
        next();
    })
}