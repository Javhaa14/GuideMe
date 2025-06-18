// // POST /wishlist
// router.post("/wishlist", async (req, res) => {
//   const { tripId } = req.body;
//   const userId = req.user._id; // Auth middleware ашигласан гэж үзэж байна

//   try {
//     const existing = await Wishlist.findOne({ user: userId, trip: tripId });
//     if (existing) {
//       return res.status(400).json({ success: false, message: "Already added" });
//     }

//     const wish = await Wishlist.create({ user: userId, trip: tripId });
//     res.json({ success: true, wishlist: wish });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });
