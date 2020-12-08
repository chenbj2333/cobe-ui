import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggesstions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>; // 也可能是异步
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggesstions, onSelect, value, renderOption, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggesstions] = useState<DataSourceType[]>([]); // 下拉框中的值

  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedValue) {
      setSuggesstions([]);
      const result = fetchSuggesstions(debouncedValue);
      if (result instanceof Promise) {
        setLoading(true);
        result.then((res) => {
          setSuggesstions(res);
          setLoading(false);
        });
      } else {
        setSuggesstions(result);
      }
    }
  }, [debouncedValue, fetchSuggesstions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
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
      {loading && <Icon icon='spinner' spin />}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
