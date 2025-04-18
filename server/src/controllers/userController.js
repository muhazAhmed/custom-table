import UserModel from "../models/userModel.js";
import dynamicData from "../models/dynamicData.js";

export const newUser = async (req, res) => {
  try {
    const { name, email, phone, address, dob, designation } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!phone) return res.status(400).json({ message: "Phone is required" });
    if (!address)
      return res.status(400).json({ message: "Address is required" });
    if (!dob) return res.status(400).json({ message: "DOB is required" });
    const user = await UserModel.create({
      name,
      email,
      phone,
      address,
      dob,
      designation,
    });

    const columns = [
      { name: "name", label: "Name", required: true },
      { name: "email", label: "Email", required: true },
      { name: "phone", label: "Phone", required: true },
      { name: "address", label: "Address", required: true },
      { name: "dob", label: "DOB", required: true },
      { name: "designation", label: "Designation", required: true },
    ];

    await dynamicData.create({
      clientId: user._id,
      columns,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchAllColumns = async (req, res) => {
  try {
    const { clientId } = req.params;
    if (!clientId)
      return res.status(400).json({ message: "Client ID is required" });
    const response = await dynamicData.findOne({ clientId });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateDynamicColumns = async (req, res) => {
  try {
    const { columns } = req.body;
    const { clientId } = req.params;
    
    if (!clientId)
      return res.status(400).json({ message: "Client ID is required" });

    const response = await dynamicData.findOneAndUpdate(
      { clientId },
      { columns }
    );

    return res
      .status(200)
      .json({ message: "Columns updated successfully", columns: response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
