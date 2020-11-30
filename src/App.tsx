import React from 'react';
import Alert from './components/Alert/alert';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div className='App'>
      <Button btnType='danger' size='lg'>
        click btn
      </Button>
      <Button disabled onClick={() => console.log('111')} className='custom'>
        click
      </Button>
      <Button btnType='primary' size='sm'>
        click
      </Button>
      <hr />
      <Alert message='Info Text' description='Info Description Info Description Info Description Info Description' />
      <Alert style={{ marginTop: 20 }} closable alertType='success' message='Success Text' />
      <Alert style={{ marginTop: 20 }} closable alertType='warning' message='Warning Text' />
      <Alert style={{ marginTop: 20 }} closable alertType='error' message='Error Text' />
      <hr />
      <Menu
        defaultIndex='0'
        onSelect={(index) => {
          console.log(index);
        }}
        mode='vertical'
        defaultOpenKeys={['2']}
      >
        <MenuItem>candan1</MenuItem>
        <MenuItem disabled>candan2 disabled</MenuItem>
        <SubMenu title='dropdown'>
          <MenuItem>sub-candan1</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default App;
