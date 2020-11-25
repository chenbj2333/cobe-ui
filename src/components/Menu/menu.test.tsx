import React from 'react';
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const defaultProps: MenuProps = {
  defaultIndex: '0',
  className: 'defaultClass',
  onSelect: jest.fn(),
};

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>candan3</MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>sub-candan1</MenuItem>
        <MenuItem>sub-candan2</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
  .submenu {
    display: none;
  }
  .submenu.menu-opened {
    display: block;
  }
  `;

  const style = document.createElement('style');
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component', () => {
  // 里面的逻辑在每个case开始之前都会运行
  beforeEach(() => {
    wrapper = render(generateMenu(defaultProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  it('should render the correct menu and menuIten based on default props', () => {
    // 是否在文档中
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu defaultClass');
    expect(menuElement.querySelectorAll(':scope > li').length).toBe(4);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('candan3');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    // thirdItem的index为2，所以下面的参数为2
    expect(defaultProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith('1');
  });
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const wrapper = render(generateMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu menu-vertical');
  });
  it('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('sub-candan1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    // 因为hover有延时
    await waitFor(() => {
      expect(wrapper.queryByText('sub-candan1')).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('sub-candan1'));
    expect(defaultProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('sub-candan1')).not.toBeVisible();
    });
  });
  it('should show dropdown items when click on vertical menu', () => {
    cleanup();
    const wrapper = render(generateMenu(testVerticalProps));
    wrapper.container.append(createStyleFile());
    fireEvent.click(wrapper.getByText('dropdown'));
    expect(wrapper.queryByText('sub-candan1')).toBeVisible();
    fireEvent.click(wrapper.getByText('dropdown'));
    expect(wrapper.queryByText('sub-candan1')).not.toBeVisible();
  });
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    cleanup();
    const wrapper = render(generateMenu(testVerticalProps));
    expect(wrapper.queryByText('sub-candan1')).toBeVisible();
  });
});
