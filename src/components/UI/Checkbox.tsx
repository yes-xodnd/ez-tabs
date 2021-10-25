import { ChangeEventHandler } from "react";

interface Props {
  isChecked: boolean;
  onChange: ChangeEventHandler;
  title?: string;
}

const Checkbox = ({ isChecked, onChange, title }: Props) => {

  return (
    <input 
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      title={title || '체크하기'}
      />
  );
};

export default Checkbox;