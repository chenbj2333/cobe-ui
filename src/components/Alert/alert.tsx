import React, { useState } from 'react';
import classnames from 'classnames';

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Error = 'error',
  Warning = 'warning',
}

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
      {display && (
        <div className={classes} style={style}>
          <div className={description ? 'alert-title' : ''}>
            {message}
            {closable && (
              <span className='alert-close' onClick={() => setDisplay(false)}>
                close
              </span>
            )}
          </div>
          <div>{description}</div>
        </div>
      )}
    </>
  );
};

Alert.defaultProps = {
  closable: false,
  alertType: AlertType.Default,
};

export default Alert;
