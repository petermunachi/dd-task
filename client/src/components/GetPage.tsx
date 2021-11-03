import React from "react";

import About from "../pages/About";
import NewProposal from "../pages/NewProposal";
import NotFound from "../components/NotFound";
import AddProposal from "../pages/AddProposal";
import Proposals from "../pages/Proposals";

interface Props {
  id: number;
}

function getPage(id: number) {
  switch (id) {
    case 1:
      return <NewProposal />;
    case 2:
      return <AddProposal />;
    case 3:
      return <Proposals />;
    case 4:
      return <About />;
    default:
      return <NewProposal />;
  }
}

const Page: React.FC<Props> = ({ id }) => {
  return <div>{getPage(id)}</div>;
};

export default Page;