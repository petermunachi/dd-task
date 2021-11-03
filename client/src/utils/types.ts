export interface NetworkResponse {
  name: string;
  explorerName: string;
  explorerLink: string;
  symbol: string;
}


export interface PostData {
  messageHash: string;
  confirmation_count: number;
  owner1_signature?: string;
  owner1_signed?: number;
  owner2_signature?: string;
  owner2_signed?: number;
}

export interface NewProposalResponse {
  author: string;
  owner1: string;
  owner2: string;
  owner1Balance: string;
  owner2Balance: string;
  numberOfConfirmation?: number;
  nonce: number;
  signed?: boolean;
  signProposal?: any;
  deleteProposal?: any;
  submitProposal?: any;
}