import React from 'react';
import Alert, { AlertType } from './components/Alert/alert';
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
      <Alert message='Info Text' description='Info Description Info Description Info Description Info Description' />
      <Alert style={{ marginTop: 20 }} closable alertType={AlertType.Success} message='Success Text' />
      <Alert style={{ marginTop: 20 }} closable alertType={AlertType.Warning} message='Warning Text' />
      <Alert style={{ marginTop: 20 }} closable alertType={AlertType.Error} message='Error Text' />
    </div>
  );
}

export default App;
