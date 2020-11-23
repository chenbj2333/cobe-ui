import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';

function App() {
  return (
    <div className='App'>
      <Button onClick={() => console.log('111')} className='custom'>
        click
      </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
        click
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>
        click btn
      </Button>
      <Button btnType={ButtonType.Link} href='#'>
        bbb
      </Button>
      <Button btnType={ButtonType.Link} href='#' disabled>
        bbb
      </Button>
    </div>
  );
}

export default App;
