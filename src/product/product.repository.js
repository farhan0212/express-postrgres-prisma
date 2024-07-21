const prisma = require("../db");

const findProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  return product;
};

const findProductByName = async (name) => {
  const product = await prisma.product.findFirst({
    where: { name },
  });
  return product;
};

const createProduct = async (productData) => {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image,
    },
  });
  return product;
};

const deleteProductById = async (id) => {
  const product = await prisma.product.delete({ where: { id } });
  return product;
};

const editProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image,
    },
  });
};

module.exports = {
  findProducts,
  findProductById,
  createProduct,
  findProductByName,
  deleteProductById,
  editProduct,
};
