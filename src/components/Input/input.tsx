import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm';

/**
 * 如果直接写 extends InputHTMLAttributes<HTMLElement>，ts会报错，因为 InputHTMLAttributes 中也有size属性
 * 可以使用 Omit<T, K>剔除InputHTMLAttributes中的size属性
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** 是否禁用 Input */
  disabled?: boolean;
  /** Input 的大小，支持 lg 和 sm */
  size?: InputSize;
  /** 添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /** 添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /** 添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'cobe-ui'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
const Input: React.FC<InputProps> = (props) => {
  // 取出所有属性
  const { disabled, size, icon, prepend, append, className, style, ...restProps } = props;
  // 根据属性计算出不同的className
  const classes = classNames('input-wrapper', className, {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  });

  return (
    // 根据属性添加不同的节点
    <div className={classes} style={style}>
      {prepend && <div className='input-group-prepend'>{prepend}</div>}
      {icon && (
        <div className='icon-wrapper'>
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input className='input-inner' disabled={disabled} {...restProps} />
      {append && <div className='input-group-append'>{append}</div>}
    </div>
  );
};

export default Input;
