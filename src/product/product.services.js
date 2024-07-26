const prisma = require("../db");
const {
  findProducts,
  findProductById,
  createProduct,
  findProductByName,
  deleteProductById,
  editProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();

  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(parseInt(id));

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

const addProduct = async (newCreateProduct) => {
  const findProduct = await findProductByName(newCreateProduct.name);

  if (findProduct) {
    throw new Error("Product already exists");
  }

  const product = await createProduct(newCreateProduct);

  return product;
};

const updateProduct = async (id, productData) => {
  const product = await patchProduct(id, productData);
  return productData;
};

const deleteProduct = async (id) => {
  const product = await getProductById(id);
  const deleteProduct = await deleteProductById(id);
  return deleteProduct;
};

const patchProduct = async (id, productData) => {
  await getProductById(id);

  await editProduct(id, productData);

  res.status(200).send({
    data: product,
    message: "Product updated successfully",
    statusCode: 200,
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  patchProduct,
};
