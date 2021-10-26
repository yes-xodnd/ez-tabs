import { createContext, useEffect, useState } from "react";

type SetCheckedItems = (id: string[], value: boolean) => void;

interface CheckContextValue {
  checkedItems: string[];
  setCheckedItems: SetCheckedItems;
}

const useCheck = (arr: any[]): [ string[], SetCheckedItems ] => {
  const [state, setState] = useState<string[]>([]);
  
  const setCheckedItems = (id: string[], value: boolean) => {
    const nextState = value
    ? [ ...state, ...id ]
    : state.filter(v => !id.includes(v));

    setState(nextState);
  }
  
  useEffect(() => { setState([]); }, [ arr ]);

  return [ state, setCheckedItems ];
};


export const createCheckContext = () => createContext<CheckContextValue>({
  checkedItems: [],
  setCheckedItems: (id: string[], value: boolean) => {},
});

export default useCheck;