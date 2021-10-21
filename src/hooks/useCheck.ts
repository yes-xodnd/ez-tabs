import { createContext, useEffect, useState } from "react";

type SetChecked = (id: string[], value: boolean) => void;

interface CheckContextValue {
  checked: string[];
  setChecked: SetChecked;
}

const useCheck = (arr: any[]): [ string[], SetChecked ] => {
  const [state, setState] = useState<string[]>([]);
  
  const setChecked = (id: string[], value: boolean) => {
    const nextState = value
    ? [ ...state, ...id ]
    : state.filter(v => !id.includes(v));

    setState(nextState);
  }
  
  useEffect(() => { 
    console.log('useCheck: referenced array changed', arr.length);
    setState([]); 
  }, [ arr ]);

  return [ state, setChecked ];
};


export const createCheckContext = () => createContext<CheckContextValue>({
  checked: [],
  setChecked: (id: string[], value: boolean) => {},
});

export default useCheck;