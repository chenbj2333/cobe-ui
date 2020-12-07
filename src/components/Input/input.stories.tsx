import React, { ChangeEvent, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Input from './input';

const ControlledInput = () => {
  const [value, setValue] = useState<string>('default value');
  return (
    <Input
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      }}
    />
  );
};

const defaultInput = () => <Input onChange={action('changed')} />;

const inputWithSize = () => (
  <>
    <Input size='lg' />
    <Input size='sm' />
  </>
);

const inputWithPrepend = () => (
  <>
    <Input prepend='aaa' />
    <Input append='aaa' />
    <Input prepend='http://' append='.com' />
  </>
);

const controlledInput = () => <ControlledInput />;

storiesOf('输入框组件', module)
  .add('Input', defaultInput)
  .add('受控的 Input', controlledInput)
  .add('不同大小的 Input', inputWithSize)
  .add('前后缀 Input', inputWithPrepend);
