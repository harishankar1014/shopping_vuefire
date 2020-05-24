const controller = require("./src/controllers/item.controller");

module.exports = function(app){
    app.post("/mail", controller.test);
};