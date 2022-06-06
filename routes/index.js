
const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);


router.use((req, res) => {
  res.status(404).send("<h1> This is the wrong page 404 error");
});

module.exports = router;