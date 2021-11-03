module.exports = (sequelize, Sequelize) => {
  const NewProposal = sequelize.define("new_proposal", {
    author_address: {
      type: Sequelize.STRING
    },
    messageHash: {
      type: Sequelize.STRING
    },
    owner1: {
      type: Sequelize.STRING
    },
    owner2: {
      type: Sequelize.STRING
    },
    nonce: {
      type: Sequelize.INTEGER
    },
    confirmation_count: {
      type: Sequelize.INTEGER
    },

    owner1_signed: {
      type: Sequelize.INTEGER
    },
    owner2_signed: {
      type: Sequelize.INTEGER
    },
    owner1_balance: {
      type: Sequelize.STRING
    },
    owner2_balance: {
      type: Sequelize.STRING
    },
    owner1_signature: {
      type: Sequelize.STRING
    },
    owner2_signature: {
      type: Sequelize.STRING
    },
    visible: {
      type: Sequelize.INTEGER
    }
  });

  return NewProposal;
};