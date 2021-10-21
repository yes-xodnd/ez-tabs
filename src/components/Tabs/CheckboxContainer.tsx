import { ChangeEventHandler, useContext } from "react";
import Checkbox from "src/components/Checkbox";
import { checkContext } from "src/components/Tabs/TabListContainer";

const CheckboxContainer = ({ id }: { id: string}) => {
  const { checked, setChecked } = useContext(checkContext);
  const isChecked = checked.includes(id);

  const handleOnChange: ChangeEventHandler = () => setChecked([ id ], !isChecked);

  return (
      <Checkbox
        isChecked={checked.includes(id)}
        onChange={handleOnChange}
      />
  );
};

export default CheckboxContainer;