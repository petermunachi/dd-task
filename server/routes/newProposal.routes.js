module.exports = app => {
  const newProposal = require("../controllers/newProposal.controller");

  var router = require("express").Router();

  // Create a new NewProposal
  router.post("/", newProposal.createProposal);

  // Retrieve a single NewProposal with id
  router.get("/getProposal/:id", newProposal.findProposal);

  // Update a single NewProposal with id
  router.put("/updateProposal/:id", newProposal.updateProposal);


  // Delete a NewProposal with id
  router.delete("/deleteProposal/:id", newProposal.deleteProposal);


  app.use('/api/newProposal', router);
};