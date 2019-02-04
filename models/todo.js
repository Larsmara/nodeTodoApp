var mongoose        = require("mongoose");

// SCHEMA SETUP
var todoSchema = new mongoose.Schema({
    description: String,
});

module.exports = mongoose.model("todo", todoSchema);