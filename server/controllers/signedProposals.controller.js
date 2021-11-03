const db = require("../models");
const SignedProposals = db.signedProposals;


exports.findAllProposals = async (req, res) => { 

  SignedProposals.findAll()
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find NewProposal with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving NewProposal with id=" + id
      });
    });
};

exports.createSignedProposal = async (req, res) => {
    try {
        // Validate request
        if (!req.body) {
            res.status(400).send({
                status: "failed",
                message: "Content can not be empty!"
            });
            return;
        }

        const proposal = {
            ...req.body
        };

        const data = await SignedProposals.create(proposal);
        if (data) {
            res.send({
                status: "success",
                data
            });
            return 
        }
        res.send({
            status: "failed",
            message: `Cannot add proposal`
        });
        
    } catch (error) {
        console.log({error});
        res.status(500).send({
            message: error.message || "Some error occurred while creating the NewProposal."
        });
    }

  
};
