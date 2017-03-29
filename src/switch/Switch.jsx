import React, { PropTypes } from 'react';

import S from './switch.scss';

const Switch = props => {
  const { className, checked, onClick, type } = props;
  let switchChildNode = '';

  switch (type) {
    case 'circle':
      switchChildNode = (
        <div className={S.circleWrapper}>
        </div>
      );
      break;
    case 'square':
      switchChildNode = (
        <div className={S.squareWrapper}>
        </div>
      );
      break;
    case 'slide':
      switchChildNode = (
        <div className={S.slideWrapper}>
        </div>
      );
      break;
  }

  return (
    <a
      className={`${S.switch} ${S[type]} ${checked ? S.checked : ''} ${className}`}
      href="javascript:;"
      onClick={onClick}
    >
      {switchChildNode}
    </a>
  );
};

Switch.defaultProps = {
  className: '',
  checked: false,
  type: 'circle',
  onClick: () => {}
};

Switch.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['circle', 'square', 'slide'])
};

export default Switch;
