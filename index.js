const express = require("express");

const app = express();

// For displaying data in the responses
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/carts", require("./routes/api/carts"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));