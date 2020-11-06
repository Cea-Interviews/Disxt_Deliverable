const { status, generateToken, roles } = require("../../helpers");
const productsModel = require("../models");

const getAll = async (req, res) => {
  try {
    const products = await productsModel
      .find()
      .populate({ path: "created_by", select: "username" })
      .lean()
      .exec();
    if (products.length < 0) {
      return status(res, 404, "Products Not Found");
    }
    if (req.user.role !== roles.Admin) {
      products.forEach((product) => delete product.created_by);
      return status(res, 200, products);
    }
    return status(res, 200, products);
  } catch (error) {
    return status(res, 500, error.toString());
  }
};

const getSingle = async (req, res) => {
  try {
    const _id = req.params.productId;
    const product = await productsModel
      .findById(_id)
      .populate({ path: "created_by", select: "username" })
      .lean()
      .exec();
    if (!product) {
      return status(res, 404, "Product Not Found");
    }

    if (req.user.role !== roles.Admin) {
      delete product.created_by;
      return status(res, 200, products);
    }
    return status(res, 200, products);
  } catch (error) {
    return status(res, 500, error.toString());
  }
};

const addProduct = async (req, res) => {
  try {
    if (req.user.role !== roles.Admin) {
      return status(res, 401, "Unauthorized");
    }

    const product = await productsModel.create({
      ...req.body,
      created_by: req.user.id,
    });
    return status(res, 201, product);
  } catch (error) {
    return status(res, 500, error.toString());
  }
};

const updateProduct = async (req, res) => {
  try {
    const _id = req.params.productId;

    if (req.user.role !== roles.Admin) {
      return status(res, 401, "Unauthorized");
    }
    const product = await productsModel.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    );
    if (product.affected === 0) {
      return status(res, 404, "Product Not Found");
    }

    return status(res, 200, product);
  } catch (error) {
    return status(res, 500, error.toString());
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.productId;

    if (req.user.role !== roles.Admin) {
      return status(res, 401, "Unauthorized");
    }
    const result = await productsModel.findByIdAndRemove(id);

    if (!result) {
      return status(res, 404, "Product Not Found");
    }
    return status(res, 200, "Product deleted");
  } catch (error) {
    return status(res, 500, error.toString());
  }
};

module.exports = {
  getAll,
  getSingle,
  addProduct,
  updateProduct,
  deleteProduct,
};
