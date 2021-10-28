import Dropdown from "../UI/Dropdown";

interface Props {
  handleClickRename: () => void;
  closeDropDown: () => void;
}

const DropDownContainer = ({ handleClickRename, closeDropDown }: Props) => {

  const wrap = (fn: () => void) => () => {
    fn();
    closeDropDown();
  }

  const rename = {
    title: '수정',
    handleClick: wrap(handleClickRename)
  };

  return (
    <Dropdown menuItems={[ rename ]} />
  );
};

export default DropDownContainer;