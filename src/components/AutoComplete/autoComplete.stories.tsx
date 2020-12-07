import React, { ChangeEvent, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AutoComplete, { DataSourceType } from './autoComplete';

interface LakerPlayerProps {
  value: string;
  number: number;
}

const simpleComplete = () => {
  const lakersWithNumber: LakerPlayerProps[] = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ];

  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((name) => name.value.includes(query));
  };

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<LakerPlayerProps>;
    return (
      <>
        <h4>Name: {itemWithGithub.value}</h4>
        <p>number: {itemWithGithub.number}</p>
      </>
    );
  };

  return <AutoComplete fetchSuggesstions={handleFetch} onSelect={action('selected')} renderOption={renderOption} />;
};

storiesOf('自动完成组件', module).add('autoComplete', simpleComplete);
