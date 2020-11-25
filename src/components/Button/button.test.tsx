import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button from './button';

const btnClkProps = {
  onClick: jest.fn(),
};

describe('test Button component', () => {
  // 测试一个默认的按钮
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...btnClkProps}>nice</Button>);
    const element = wrapper.queryByText('nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument(); // 测试该元素是否存在文档种
    expect(element.disabled).toBeFalsy(); // 测试元素上是否存在disabled属性
    expect(element.tagName).toEqual('BUTTON'); // 测试该元素的tagname是不是button（都为大写）
    expect(element).toHaveClass('btn btn-default'); // 测试该元素的class中是否有btn btn-default
    fireEvent.click(element!); // 调用点击方法
    expect(btnClkProps.onClick).toHaveBeenCalled();
  });
  // 测试传入其它props的按钮
  it('should render the correct component based on different props', () => {
    const wrapper = render(
      <Button btnType='primary' size='lg' className='primaryLargeClass'>
        nice
      </Button>
    );
    const element = wrapper.queryByText('nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn btn-primary btn-lg primaryLargeClass');
  });
  // 测试一个link按钮
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button btnType='link' href='http://chenbj'>
        link
      </Button>
    );
    const element = wrapper.queryByText('link');
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });
  // 测试disabled
  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(
      <Button disabled {...btnClkProps}>
        nice
      </Button>
    );
    const element = wrapper.queryByText('nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element!); // 调用点击方法
    expect(btnClkProps.onClick).toHaveBeenCalledTimes(0);
  });
});
