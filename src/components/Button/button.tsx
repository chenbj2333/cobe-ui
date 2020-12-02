import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classnames from 'classnames';

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'link' | 'danger';

interface BaseButtonProps {
  className?: string;
  /** 设置 Button 的禁用 */
  disabled?: boolean;
  /** 设置 Button 的尺寸 */
  size?: ButtonSize;
  /** 设置 Button 的类型 */
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

// 原生button上的属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
// 原生a标签上的属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

// Partial 把里面所有的属性都变为可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * Button 组件
 */

export const Button: FC<ButtonProps> = (props) => {
  const { btnType, children, size, disabled, href, className, ...restProps } = props;
  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  });

  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
};

export default Button;
