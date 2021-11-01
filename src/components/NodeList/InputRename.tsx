import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";
import { useTypedDispatch } from "src/hooks";
import { rename } from 'src/store/modules/bookmarksSlice';
import styled from "styled-components";

interface Props {
  id: string;
  title: string;
  quitRename: () => void;
}

const InputRename = ({ id, title, quitRename }: Props) => {
  const [ inputValue, setInputValue ] = useState(title);
  const dispatch = useTypedDispatch();
  
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.target.value);
  }

  const handleKeyDown: KeyboardEventHandler = e => {
    if (e.key === 'Enter') {
      if (!inputValue.length) {
        alert('1글자 이상 입력해야 합니다.');
        return;
      }
  
      dispatch(rename({ id, title: inputValue }));
      quitRename();
    }

    if (e.key === 'Escape') {
      quitRename();
    }
  };

  return (
    <div>
      <Label htmlFor={'nodeRenameInput' + id}>새로운 이름을 입력해주세요.</Label>
      <Input
        id={'nodeRenameInput' + id}
        type="text"
        defaultValue={title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={quitRename}
        autoFocus />

    </div>
  );
};

export default InputRename;

const Label = styled.label`
  font-size: 0;
`;

const Input = styled.input`
  height: 1.2rem;
`;