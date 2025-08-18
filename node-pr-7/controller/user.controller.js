const userSchema = require("../models/userSchema");
const fs = require('fs');
const path = require('path');

const addUser = (req, res) => {
    res.render('form-basic');
}
const allUser = async (req, res) => {
  try {
    const users = await userSchema.find(); 
    res.render('table', { users }); 
  } catch (error) {
    console.error('Error fetching users:', error);
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
  }
};
const delUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userSchema.findById(id);
    if (user) {
      if (user.image && fs.existsSync(path.join(__dirname, '..', user.image))) {
        fs.unlink(path.join(__dirname, '..', user.image), (err) => {
          if (err) console.error("Error deleting image:", err);
        });
      }
      await userSchema.findByIdAndDelete(id);
    }
    res.redirect('/users/all-user');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
};

const editUser = async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id); 
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('edit-form', { user });
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};


const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const oldImage = req.body.oldImage;

    let image = oldImage;

    if (req.file) {
      image = "/uploads/" + req.file.filename;
      if (oldImage && fs.existsSync(path.join(__dirname, '..', oldImage))) {
        fs.unlink(path.join(__dirname, '..', oldImage), (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }
    }
    await userSchema.findByIdAndUpdate(userId, {
      ...req.body,
      image
    });

    res.redirect('/users/all-user');
  } catch (error) {
    console.error('Error updating user:', error);
  }
};




module.exports = {
    addUser,
    allUser,
    createUser,
    delUser,
    editUser,
    updateUser
}