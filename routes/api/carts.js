const express = require("express");
const router = express.Router();
const carts = require("../../Carts");

router.get("/", (req, res) => res.status(200).json(carts));

// Create cart
router.post("/", (req, res) => {
  const newCart = req.body;

  if (!newCart.product || !newCart.price) {
    return res.status(400).json({msg: "Please include product and price"});
  }

  carts.push(newCart);
  res.status(201).json(carts);
});

// Get single cart
router.get("/:id", (req, res) => {
  const id =  parseInt(req.params.id);
  const found = carts.some(cart => cart.id === id);

  if (found) {
    res.status(200).json(carts.filter(cart => cart.id === id));
  } else {
    res.status(404).json({msg: `No cart with the id of ${id}`});
  }
});

// Update single cart
router.put("/:id", (req, res) => {
  const id =  parseInt(req.params.id);
  const found = carts.some(cart => cart.id === id);

  if (found) {
    const updateCart = req.body;
    carts.forEach(cart => {
      if (cart.id === id) {
        cart.product = updateCart ? updateCart.product : cart.product;
        cart.price = updateCart ? updateCart.price : cart.price;

        res.status(200).json({msg: "Cart updated", cart});
      }
    });
  } else {
    res.status(404).json({msg: `No cart with the id of ${id}`});
  }
});

// Delete single cart
router.delete("/:id", (req, res) => {
  const id =  parseInt(req.params.id);
  const found = carts.some(cart => cart.id === id);

  if (found) {
    res.status(200).json({
      msg: "Cart deleted.",
      carts: carts.filter(cart => cart.id !== id)
    });
  } else {
    res.status(404).json({msg: `No cart with the id of ${id}`});
  }
});

module.exports = router;