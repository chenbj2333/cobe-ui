import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../src/styles/index.scss';

library.add(fas);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
};

const storyWrapper = (storyFn: any) => <div style={wrapperStyle}>{storyFn()}</div>;

addDecorator(storyWrapper);
addDecorator(withInfo);
addParameters({ info: { inline: true, header: false } });
