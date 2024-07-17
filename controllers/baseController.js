const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const user = res.locals.user;
  //console.log(user);
  const nav = await utilities.getNav(user);
  
  //let tools = await utilities.userTools()
  //req.flash("notice", "This is a flash message")
  res.render("index", {title: "Home", nav, errors: null})
}


module.exports = baseController