import React from 'react';
import { fireEvent, queryByText, render } from '@testing-library/react';

import Input, { InputProps } from './input';
import { isExportDeclaration } from 'typescript';

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input',
};

describe('test Input component', () => {
  it('should render the correct default Input', () => {
    const wrapper = render(<Input {...defaultProps} />);
    const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass('input-inner');
    fireEvent.change(testNode, { target: { value: '123' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual('123');
  });

  it('should render the disabled Input on disabled property', () => {
    const wrapper = render(<Input disabled placeholder='disabled' />);
    const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy();
  });

  it('should render different input size on size property', () => {
    const wrapper = render(<Input placeholder='sizes' size='lg' />);
    const testContainer = wrapper.container.querySelector('.input-wrapper');
    expect(testContainer).toHaveClass('input-size-lg');
  });

  it('should render prepand and append element on prepand/append property', () => {
    const wrapper = render(<Input placeholder='pend' prepend='https://' append='.com' />);
    const testContainer = wrapper.container.querySelector('.input-wrapper');
    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend');
    expect(wrapper.queryByText('https://')).toBeInTheDocument();
    expect(wrapper.queryByText('.com')).toBeInTheDocument();
  });
});
