import express from "express";

const app = express();

app.use(express.json());

let cart = [
  {
    id: 1,
    productName: "Wireless Mouse",
    price: 799,
    quantity: 2,
    category: "Electronics",
  },
  {
    id: 2,
    productName: "Keyboard",
    price: 999,
    quantity: 1,
    category: "Electronics",
  },
  {
    id: 3,
    productName: "Headphones",
    price: 1499,
    quantity: 1,
    category: "Electronics",
  },
];

// GET all products
app.get("/cart", (req, res) => {
  res.json(cart);
});

// GET product by ID
app.get("/cart/:id", (req, res) => {
  const product = cart.find((p) => p.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json({
    ...product,
    totalPrice: product.price * product.quantity,
  });
});
// POST new product
app.post("/cart", (req, res) => {
  const { id, productName, price, quantity, category } = req.body;

  if (
    id == null ||
    !productName ||
    price == null ||
    quantity == null ||
    !category
  ) {
    return res.status(400).json({
      message: "Invalid product details",
    });
  }

  const product = {
    id,
    productName,
    price,
    quantity,
    category,
  };

  cart.push(product);

  res.status(201).json({
    message: "Product added successfully",
    product,
  });
});

// PUT update product
app.put("/cart/:id", (req, res) => {
  const product = cart.find((p) => p.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  Object.assign(product, req.body);

  res.json({
    message: "Product updated successfully",
    product,
  });
});

// DELETE product
app.delete("/cart/:id", (req, res) => {
  const index = cart.findIndex((p) => p.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  cart.splice(index, 1);

  res.json({
    message: "Product deleted successfully",
  });
});

app.listen(4000, () => {
  console.log("Express Server running at http://localhost:4000");
});
