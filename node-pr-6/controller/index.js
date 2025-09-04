const User = require("../models/userSchema");

const deshboard = async (req, res) => {
  try {
    
    return res.render("index");
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("/");
  }
};

const viewPro = async (req , res ) => {
    try {
      let user = await User.find();
       res.render("viewProfile", { user }); 
    } catch (error) {
      console.log("Error in dashboard:", error);
    res.redirect("/");
    }
  try {
      let user = req.user;
      return res.render("viewProfile", { user });
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("/");
  }
}

const forgotPasswordPage = async (req, res) => {
  try {
    return res.render("auth/forgotPassword");
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("/");
  }
};

const sendEmail = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found");
      req.flash("error", "User Not Found");
      return res.redirect("/");
    }

    let otp = otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let mailMessage = {
    from: 'rw3.girish.gk@gmail.com',
    to: `${req.body.email}`,
    subject: "Reset Password for Admin Panel",
    html: `
    <h2>Hello Vivek</h2>
    <p>Your Reset password Pin is: ${otp}.</p>
    <p>This Password is valid only 5 Minutes.</p>

    <p>Thank You!!!!</p>
    `, // HTML body
  }

 sendEmail(mailMessage);
    res.cookie('otp', otp);
    res.cookie('email', user.email);
    return res.render('auth/otp-page');
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("/");
  }
};

const verifyOTP = async(req, res) => {
  try {
    let otp = req.cookies.otp;
    if(otp == req.body.otp){
      res.clearCookie("otp");
      return res.render("auth/newPassword");
    }else{
      console.log("OTP is Not Verified!!!!");
      return res.redirect("back")
    }
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("/");
  }
};

const resetPassword = async (req, res) => {
  try {
    let email = req.cookies.email;
    let user = await User.findOne({email: email});
    if(user){
        if(req.body.cpassword == req.body.newpassword){
          await User.findByIdAndUpdate(user._id, {password: req.body.newpassword}, {new: true});
          res.clearCookie("email");
          req.flash("success", "Password was Reset Success!!!!");
          return res.redirect("/");
        }else{
          console.log("Password is not matched");
          req.flash("error", "Password was Not Matched!!!");
          return res.redirect("back");
        }
    }else{
      req.flash("error", "User Not Found");
      return res.redirect("/");
    }
  } catch (error) {
    console.log("something Wrong");
    return res.redirect("back");
  }
}

module.exports = {
  deshboard,
  viewPro,
  forgotPasswordPage,
  sendEmail,
  verifyOTP,
  resetPassword
};
