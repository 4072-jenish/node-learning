
const deshboard = async (req, res) => {
    try {
        if(req.cookies.admin == undefined|| req.cookies.admin._id == undefined){
            res.render("index.ejs");
        }
        else{
           let user =  await User.findById(req.cookies.admin._id)
          return res.render("index", {user})
        }
        
     } catch (error) {
        console.log("page not Found");
        res.redirect("/")
     }
}

module.exports = {
    deshboard
}