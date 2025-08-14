const userSchema = require("../models/userSchema");

const addUser = (req, res) => {
    res.render('form-basic');
}
const allUser = async (req, res) => {
  try {
    const users = await userSchema.find(); // Fetch all users from DB
    res.render('table', { users }); // Pass to EJS
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
};

const createUser = async (req, res) => {
  try {
    let image = req.file ? "/uploads/" + req.file.filename : "";
    let hobbies = Array.isArray(req.body.hobbies) ? req.body.hobbies : [req.body.hobbies];

    let user = await userSchema.create({
      ...req.body,
      hobbies,
      image
    });

    res.redirect('/');
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send("Internal Server Error");
  }
};

const delUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userSchema.findByIdAndDelete(id);
    res.redirect('/all-user'); 
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
    addUser,
    allUser,
    createUser,
    delUser
}