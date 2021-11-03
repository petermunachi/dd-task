import Web3 from "web3";
import BN from "bn.js";
import React, {
  useReducer,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import { useWeb3Context } from "./Web3";
import { get as getChannelData } from "../api/channel";
import { getTokenAddress } from "../api/token";

interface State {
  channelAddress: string;
  tokenAddress: string;
  balances: string[];
  owners: string[];
  nonce: number | string;
}

const INITIAL_STATE: State = {
  channelAddress: "N / A",
  tokenAddress: "N / A",
  balances: ["N / A", "N / A"],
  owners: ["N / A", "N / A"],
  nonce: "N / A",
};

const SET = "SET";
const UPDATE_BALANCES = "UPDATE_BALANCES";
const UPDATE_NONCE = "UPDATE_NONCE";


interface Set {
  type: "SET";
  data: {
    channelAddress: string;
    tokenAddress: string;
    balances: string[];
    owners: string[];
    nonce: number;
  };
}

interface UpdateBalances {
  type: "UPDATE_BALANCES";
  data: {
    balances: string[];
  };
}

interface UpdateNonce {
  type: "UPDATE_NONCE";
  data: {
    nonce: number;
  };
}


type Action = Set | UpdateBalances | UpdateNonce;

function reducer(state: State = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case SET: {
      return {
        ...state,
        ...action.data,
      };
    }
    case UPDATE_BALANCES: {
      return {
        ...state,
        balance: action.data.balances,
      };
    }
    case UPDATE_NONCE: {
      return {
        ...state,
        balance: action.data.nonce,
      };
    }

    default:
      return state;
  }
}

interface SetInputs {
  channelAddress: string;
  tokenAddress: string;
  balances: string[];
  owners: string[];
  nonce: number;
}

interface UpdateBalancesInputs {
  balances: string[];
}

interface UpdateNonceInputs {
  nonce: number;
}

const ChannelContext = createContext({
  state: INITIAL_STATE,
  set: (_data: SetInputs) => {},
  updateBalances: (_data: UpdateBalancesInputs) => {},
  updateNonce: (_data: UpdateNonceInputs) => {},
  
});

export function useChannelContext() {
  return useContext(ChannelContext);
}

interface ProviderProps {}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  function set(data: SetInputs) {
    dispatch({
      type: SET,
      data,
    });
  }

  function updateBalances(data: UpdateBalancesInputs) {
    dispatch({
      type: UPDATE_BALANCES,
      data,
    });
  }

  function updateNonce(data: UpdateNonceInputs) {
    dispatch({
      type: UPDATE_NONCE,
      data,
    });
  }

  return (
    <ChannelContext.Provider
      value={useMemo(
        () => ({
          state,
          set,
          updateBalances,
          updateNonce
        }),
        [state]
      )}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export function Updater() {
  const {
    state: { web3 },
  } = useWeb3Context();

  const {
    state,
    set,
  } = useChannelContext();

  useEffect(() => {
    async function get(web3: Web3) {
      try {
        const data = await getChannelData(web3);
        console.log({data});
        const tokenAddr = await getTokenAddress(web3);
        data.tokenAddress = tokenAddr;
        set(data);
        
      } catch (error) {
        console.error(error);
      }
    }

    if (web3) {
      get(web3);
    }
  }, [web3]);


  return null;
}
