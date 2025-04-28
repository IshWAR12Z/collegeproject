const User = require("../../models/user.model");
const path = require('path');

const UpdatePhoto = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ msg: 'No file uploaded.' });
  }

  try {
    // Get userId from request body
    const userId = req.body.userId;

    // Retrieve the user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update the user with the new profile photo filename
    user.profile = "/uploads/" + file.filename;  // Save the path to the profile picture

    // Save the user
    await user.save();

    return res.status(201).json({ msg: "Profile Picture Updated Successfully!", file: user.profile });
  } catch (error) {
    console.error('Error saving to database:', error);
    return res.status(500).send('Server error');
  }
};

module.exports = UpdatePhoto;
