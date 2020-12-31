const Product = require("../models/productModel");
const User = require("../models/userModel");

exports.getAllProducts = async (req, res, next) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const products = await Product.find({ ...keyword });
    if (!products) {
      return res.status(404).json({ msg: "No products Found!" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server Error!" });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ msg: "No product found with this id" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "No product found with this id" });
    }
    await product.remove();
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      user: req.user.id,
      name: "Sample Name",
      image: "./images/sampleimage.jpg",
      brand: "Sample Brand",
      category: "Sample Category",
      description: "Sample Description",
      price: 0,
      countInStock: 0,
    });
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      countInStock,
      description,
      price,
      image,
      brand,
      name,
      category,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "No product found with this id" });
    }
    (product.name = name || product.name),
      (product.countInStock = countInStock || product.countInStock);
    (product.price = price || product.price),
      (product.image = image || product.image),
      (product.brand = brand || product.brand),
      (product.category = category || product.category),
      (product.description = description || product.description);
    const newProduct = await product.save();
    res.status(200).json(newProduct);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "No product found with this id" });
    }
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ msg: "You already submitted your review" });
    }

    const reviewUser = await User.findById(req.user.id);

    const review = {
      user: reviewUser._id,
      name: reviewUser.name,
      comment,
      rating: Number(rating),
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(200).json({ msg: "Review Submitted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

exports.topRatedProdcuts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).json({ products });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};
