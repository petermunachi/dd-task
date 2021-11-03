module.exports = app => {
  const signedProposals = require("../controllers/signedProposals.controller");

  var router = require("express").Router();

  // Create a new signedProposals
  router.get("/", signedProposals.findAllProposals);

  router.post("/", signedProposals.createSignedProposal);

  app.use('/api/signedProposals', router);
};