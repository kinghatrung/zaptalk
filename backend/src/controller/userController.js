const userController = {
  authMe: async (req, res) => {
    try {
      res.status(200).json({ message: "is user" });
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default userController;
