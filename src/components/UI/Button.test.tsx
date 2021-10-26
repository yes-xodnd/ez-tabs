import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  
  test('render prop content', () => {
    const content = 'click me';
    const { getByText } = render(<Button content={content} />);
    
    expect(getByText(content)).toBeInTheDocument();
  });

  test('run prop handleClick', () => {
    const content = 'click me';
    const handleClick = jest.fn();
    const { getByText } = render(<Button content={content} handleClick={handleClick} />);
    
    fireEvent.click(getByText(content));

    expect(handleClick).toBeCalled();
  });
});