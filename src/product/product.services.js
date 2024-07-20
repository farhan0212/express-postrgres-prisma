const prisma = require("../db");

const getAllProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};

const getProductById = async (id) => {
  if (typeof id !== "number") {
    throw Error("ID must be a number");
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

const addProduct = async (newProductData) => {
  try {
    const products = await prisma.product.create({
      data: {
        name: newProductData.name,
        description: newProductData.description,
        price: newProductData.price,
        image: newProductData.image,
      },
    });
    res.send({
      data: newProductData,
      message: "Product created successfully",
      statusCode: 201,
    });
  } catch (error) {
    res.send({
      message: "Failed to create product",
      statusCode: 500,
      error: error.message,
    });
  }
  return product;
};

const updateProduct = async (id, productData) => {
  const product = await patchProduct(id, productData);
  return productData;
};

const deleteProduct = async (id) => {
  await getProductById(id);

  await prisma.product.delete({
    where: { id },
  });
  return product;
};

const patchProduct = async (id, productData) => {
  await getProductById(id);

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
