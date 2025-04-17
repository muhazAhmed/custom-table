import express from "express";
import {
  fetchAllColumns,
  fetchAllUsers,
  newUser,
  updateDynamicColumns,
} from "../controllers/userController.js";
const route = express.Router();

route.get("/", (req, res) => {
  return res.status(200).json({ message: "API is working" });
});

route.post("/new/user", newUser);
route.get("/fetch/users", fetchAllUsers);

route.get("/fetch/columns/:clientId", fetchAllColumns);
route.put("/update/columns", updateDynamicColumns);

export default route;
