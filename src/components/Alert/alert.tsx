import React, { useState } from 'react';
import classnames from 'classnames';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

export type AlertType = 'success' | 'default' | 'error' | 'warning';

interface AlertProps {
  message: string | React.ReactNode;
  description?: string | React.ReactNode;
  alertType?: AlertType;
  closable?: boolean;
  className?: string;
  style?: any;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { message, description, alertType, closable, className, style } = props;
  const [display, setDisplay] = useState(true);
  const classes = classnames('alert', className, {
    [`alert-${alertType}`]: alertType,
  });

  return (
    <>
      <Transition in={display} timeout={300} animation='zoom-in-top'>
        <div className={classes} style={style}>
          <div className={description ? 'alert-title' : ''}>
            {message}
            {closable && (
              <span className='alert-close' onClick={() => setDisplay(false)}>
                <Icon theme='secondary' icon='times' />
              </span>
            )}
          </div>
          <div>{description}</div>
        </div>
      </Transition>
    </>
  );
};

Alert.defaultProps = {
  closable: false,
  alertType: 'default',
};

export default Alert;
