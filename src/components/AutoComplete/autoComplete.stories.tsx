import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AutoComplete, { DataSourceType } from './autoComplete';

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

const simpleComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        const formatItems = data.items.slice(0, 10).map((item: any) => {
          return {
            value: item.login,
            ...item,
          };
        });
        return formatItems;
      });
  };

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>;

    return (
      <>
        <p>Name: {itemWithGithub.value}</p>
        <p>url: {itemWithGithub.url}</p>
      </>
    );
  };

  return <AutoComplete fetchSuggesstions={handleFetch} onSelect={action('selected')} renderOption={renderOption} />;
};

storiesOf('自动完成组件', module).add('autoComplete', simpleComplete);
