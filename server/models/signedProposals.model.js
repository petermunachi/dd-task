module.exports = (sequelize, Sequelize) => {
  const SignedProposals = sequelize.define("signed_proposals", {
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
    }

  });

  return SignedProposals;
};