import { ChangeEventHandler } from "react";

interface Props {
  isChecked: boolean;
  handleChange?: ChangeEventHandler;
}

const Checkbox = ({ isChecked, handleChange = () => {} }: Props) => {

  return (
    <input 
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
      title={isChecked ? 'uncheck (Space)' : 'check (Space)'}
      />
  );
};

export default Checkbox;