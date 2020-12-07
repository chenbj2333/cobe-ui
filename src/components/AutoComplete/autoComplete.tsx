import React, { ChangeEvent, FC, ReactElement, useState } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggesstions: (str: string) => DataSourceType[];
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggesstions, onSelect, value, renderOption, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggesstions] = useState<DataSourceType[]>([]); // 下拉框中的值

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const result = fetchSuggesstions(value);
      setSuggesstions(result);
    } else {
      setSuggesstions([]);
    }
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    if (onSelect) {
      onSelect(item);
    }
    setSuggesstions([]);
  };

  // 自定义模板
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <ul className='suggestion-list'>
        {suggestions.map((item, index) => (
          <li key={index} onClick={() => handleSelect(item)}>
            {renderTemplate(item)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='auto-complete'>
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
