import User from "../models/user.model.js";

export const getAllusers = async(req, res) => {
    try {
        const users = await User.find().select('-password -token');;
      
      res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

export const deleteUser = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        await User.findByIdAndDelete(id);
        res.json({ msg: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

