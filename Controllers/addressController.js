const Address = require("../models/addressModel");

exports.getAddress = async (req, res, next) => {
  try {
    const id = req.params.id;
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ msg: "No address found with this ID" });
    }
    res.status(200).json({
      name: address.name,
      country: address.country,
      address: address.address,
      state: address.state,
      postalCode: address.postalCode,
      id: address._id,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.placeAddress = async (req, res, next) => {
  try {
    const { name, country, address, city, postalCode } = req.body;
    const existAddress = await Address.findOne({
      country,
      city,
      address,
      postalCode,
      name,
    });

    if (existAddress) {
      return res.status(200).json({
        name: existAddress.name,
        country: existAddress.country,
        address: existAddress.address,
        city: existAddress.city,
        postalCode: existAddress.postalCode,
        id: existAddress._id,
      });
    } else {
      const newAddress = await Address.create({
        name,
        country,
        address,
        postalCode,
        city,
      });

      if (
        name === "" ||
        country === "" ||
        address === "" ||
        postalCode === "" ||
        city === ""
      ) {
        return res.status(400).json({ msg: "All Fields are required" });
      }

      res.status(200).json({
        name: newAddress.name,
        country: newAddress.country,
        address: newAddress.address,
        postalCode: newAddress.postalCode,
        city: newAddress.city,
        id: newAddress._id,
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
