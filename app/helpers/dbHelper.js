//var Model = new model();
var UrlPattern = require("url-pattern");
var pattern = new UrlPattern('/api/(:model)');

function deleteItem (req, res) {    
    var Model = require("../models/"+getModelName(req));
    
    Model.remove({
        _id: req.params.id
    }, function(err, result){
        if(err){res.send(err)}
        res.json({message: "success"});        
    });
}

function updateItem(req, res){
    var Model = require("../models/"+getModelName(req));
    Model.findById( req.params.id, function(err, result){
        if(err) {res.send(err)}
        
        var resultSchemaObj = result.schema.tree;
        for (var key in resultSchemaObj) {
            if (resultSchemaObj.hasOwnProperty(key) && req.body[key] !== undefined) {
                    result[key] = req.body[key];
                }
        }
        
        result.save(function(err){
            if(err){res.send(err)}
            res.json({message: "success"});
        })
    })
}

function getItem(req, res){
    var Model = require("../models/"+getModelName(req));
    Model.findById(req.params.id, function(err, result){
        if(err){res.send(err)}
        res.json(result);                
    });
}

function getAllItems(req, res){
    var Model = require("../models/"+getModelName(req));
    Model.find(function(err, result) {
    if(err) {res.send(err)}
        res.json(result);
    })
}

function createItem(req, res) {
        
        var Model = require("../models/"+getModelName(req));
        var model = new Model(); 
        var modelSchema = model.schema.tree;
    
        for (var key in modelSchema) {
            if (modelSchema.hasOwnProperty(key) && req.body[key] !== undefined) {
                    model[key] = req.body[key];
                }
        }
        
        //Save to database if everything is fine
        model.save(function(err){
            if(err) {
                var errorObj = err.errors, errorMsgArr = [];
                    for (var key in errorObj) {
                        if (errorObj.hasOwnProperty(key)) {
                            var errorMsgObj = {};
                            errorMsgObj[errorObj[key].path] = errorObj[key].message;
                            errorMsgArr.push(errorMsgObj);
                        }
                    }                
                    res.status(500).json({message: err.name, errors: errorMsgArr});
                    return;
                } else {                                    
                    res.status(200).json({ message : "success"});
                    return;      
                }            
        });
    
}

function getModelName(req){    
    return pattern.match(req.baseUrl)["model"]
}

module.exports = {
    create: createItem,
    getAll: getAllItems,
    get: getItem,
    update: updateItem,
    delete: deleteItem
}