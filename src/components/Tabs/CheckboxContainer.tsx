import { ChangeEventHandler, useContext } from "react";
import Checkbox from "src/components/UI/Checkbox";
import { checkContext } from "src/components/Tabs/TabListContainer";

const CheckboxContainer = ({ id }: { id: string}) => {
  const { checkedItems, setCheckedItems } = useContext(checkContext);
  
  const isChecked = checkedItems.includes(id);
  const handleOnChange: ChangeEventHandler = () => setCheckedItems([ id ], !isChecked);

  return (
      <Checkbox
        isChecked={isChecked}
        handleChange={handleOnChange}
      />
  );
};

export default CheckboxContainer;