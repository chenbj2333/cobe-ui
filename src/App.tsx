import React from 'react';
import Button, { ButtonType } from './components/Button/button';

function App() {
  return (
    <div className='App'>
      <Button>click</Button>
      <Button btnType={ButtonType.Danger}>aaa</Button>
      <Button btnType={ButtonType.Link} href='#'>
        bbb
      </Button>
    </div>
  );
}

export default App;
