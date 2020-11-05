const { status, generateToken, role } = require("../../helpers");

const getAll = async (req, res) => {
  try {
    const products = await productsModel.getAll();
    if (products.length > 0) {
      return status(res, 200, products);
    }
    return status(res, 404, "Products Not Found");
  } catch (error) {
    return status(res, 500, err.toString());
  }
};

const getSingle = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productsModel.getSingle(id);
    if (product) {
      return status(res, 200, products);
    }
    return status(res, 404, "Product Not Found");
  } catch (error) {
    return status(res, 500, err.toString());
  }
};

const addProduct = async (req, res) => {
  try {
    if (req.user.role !== role.Admin) {
      return status(res, 401, "Unauthorized");
    }

    const product = await productsModel.addProduct(req.body);
    return status(res, 201, product);
  } catch (error) {
    return status(res, 500, error.toString());
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (req.user.role !== role.Admin) {
      return status(res, 401, "Unauthorized");
    }

    const product = await productsModel.updateProduct(id, req.body);
    if (product.affected === 0) {
      return status(res, 404, "Product Not Found");
    }

    return status(res, 200, user);
  } catch (error) {
    return status(res, 500, error.toString());
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (req.user.role !== role.Admin) {
      return status(res, 401, "Unauthorized");
    }
    const result = await productsModel.deleteProduct(id);

    if (result.affected === 0) {
      return status(res, 404, "Product Not Found");
    }
    return status(res, 200, "Product deleted");
  } catch (error) {
    return statusHandler(res, 500, error.toString());
  }
};

module.exports = {
  getAll,
  getSingle,
  addProduct,
  updateProduct,
  deleteProduct,
};
