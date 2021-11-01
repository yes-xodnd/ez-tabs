import { ChangeEventHandler } from "react";

interface Props {
  isChecked: boolean;
  handleChange?: ChangeEventHandler;
}

const Checkbox = ({ isChecked, handleChange }: Props) => {

  return (
    <input 
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
      title={isChecked ? '선택 취소' : '선택'}
      />
  );
};

export default Checkbox;