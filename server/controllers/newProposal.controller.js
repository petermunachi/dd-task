const db = require("../models");
const NewProposal = db.newProposal;
const Op = db.Sequelize.Op;

// Create and Save a new NewProposal
exports.createProposal = async (req, res) => {
    try {
        // Validate request
       if (!req.body) {
          res.status(400).send({
            status: "failed",
            message: "Content can not be empty!"
          });
          return;
       }

        // Create a NewProposal
        req.body.confirmation_count = 0;
        req.body.owner1_signed = 0;
        req.body.owner2_signed = 0;
        req.body.owner1_signature = "";
        req.body.owner2_signature = "";
        req.body.visible = 1;

        const proposal = {
          ...req.body
        };

        const proposalExist = await checkNewProposal(1);

        if (!proposalExist) {
            const data = await NewProposal.create(proposal);
            res.send({
                status: "success",
                data
            });
            return;
        }else{
          const updateData = await updateTable(1, proposal);
          console.log({updateData});
          if (updateData === 1) {
            res.send({
              status: "success",
              data: proposal
            });
            return;
          }

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

const checkNewProposal = async (id) => {
  try {
    const result = await NewProposal.findByPk(id);
    if (result) {
      return result;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
  

};

const updateTable = async (id, data) => {

    try {
      console.log({data, id});
      const result = await NewProposal.update(data, {
          where: { id: id }
      })
      
      return result[0];
      
    } catch (error) {
        console.log({error});
    }

  
}

exports.updateProposal = async (req, res) => {

  const id = req.params.id;
  const proposal = {
    ...req.body
  };

  const proposalExist = await checkNewProposal(id);

  if (!proposalExist) {
    res.status(400).send({
      status: "failed",
      message: error.message
    });
  }

  const isUpdated = await updateTable(id, proposal);

  if (isUpdated === 1) {
    res.send({
      status: "success",
      data: proposal
    });

  }else{
    res.status(500).send({
      status: "failed",
      message: error.message || "Some error occurred while updating the NewProposal."
    });
  }


}



exports.deleteProposal = async (req, res) => {
  const id = req.params.id;
  const proposal = {
    visible: 0
  };

  const proposalExist = await checkNewProposal(id);

  if (!proposalExist) {
    res.status(400).send({
      status: "failed",
      message: error.message
    });
  }
  
  const isUpdated = await updateTable(id, proposal);

  if (isUpdated === 1) {
    res.send({
      status: "success",
      data: proposal
    });

  }else{
    res.status(500).send({
      status: "failed",
      message: error.message || "Some error occurred while updating the NewProposal."
    });
  }
};

exports.findProposal = async (req, res) => {
  console.log({req});
  const id = req.params.id;
 

  NewProposal.findOne({ where: { visible: 1, id: 1 } })
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
