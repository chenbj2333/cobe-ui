import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Alert from './alert';

describe('test Alert component', () => {
  // 测试一个默认的alert
  it('should render the correct default alert', () => {
    const wrapper = render(<Alert message='test info' />);
    const element = wrapper.queryByText('test info')?.parentNode;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('alert alert-default');
  });
  // 测试一个成功类型，并且有详细的alert
  it('should render the correct component based on different props', () => {
    const wrapper = render(
      <Alert
        message='success info'
        description='Info Description Info Description Info Description Info Description'
        alertType='success'
      />
    );
    const parentNode = wrapper.queryByText('success info')?.parentNode;
    const element = wrapper.queryByText('success info');
    const subElement = element?.nextSibling;
    expect(element).toBeInTheDocument();
    expect(subElement).toBeInTheDocument();
    expect(parentNode).toHaveClass('alert alert-success');
    expect(element).toHaveClass('alert-title');
  });
  // 测试关闭功能
  it('should disappear when click close', () => {
    const wrapper = render(<Alert message='test info' closable />);
    const element = wrapper.queryByText('test info');
    const closeBtn = wrapper.queryByText('close');
    fireEvent.click(closeBtn!);
    expect(element).not.toBeInTheDocument();
  });
});
