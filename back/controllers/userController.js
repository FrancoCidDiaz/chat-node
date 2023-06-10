import User from '../model/userModel.js'
import bcrypt from 'bcrypt'


export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const usernameCheck = await User.findOne({ username })
        if (usernameCheck)
            return res.json({ msg: "Username already used", status: false })
        const emailCheck = await User.findOneAndDelete({ email })
        if (emailCheck)
            return res.json({ msg: "Email already used", status: false })
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password: hashedPassword })
        const userSaved = await user.save()
        return res.json({ status: true, userSaved })
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user)
            return res.json({ msg: "Incorrect username", status: false })
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword)
            return res.status(401).json({msg: "Incorrect password", status: false})   
        delete user.password
        console.log(user)
        return res.json({ status: true, user })                      
    } catch (error) {
        next(error)
    }
}

export const setAvatar = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    } catch (ex) {
      next(ex);
    }
  };

export const getUser = async (req, res, next) => {
  try {
    const user = await User.find({_id: { $ne: req.params.id}}).select([
      "email",
      "username",
      "_id"
    ]) 
    return res.json(user)
  } catch (ex) {
     next(ex)
  }
}  

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.json({ users });
  } catch (error) {
    console.log(error);
    next(error);
  }
};