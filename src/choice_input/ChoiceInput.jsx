import React, { Component, PropTypes } from 'react';
import indexOf from 'lodash/indexOf';

import Switch from '../switch/Switch';

import S from './theme.scss';

class ChoiceInput extends Component {
  static defaultProps = {
    className: '',
    multiple: false,
    value: '',
    options: [],
    onChange: () => {}
  }

  valueHandle = v => {
    const { onChange, multiple, value } = this.props;
    const arr = value.split('|');
    const targetValue = v;

    if (multiple) {
      const index = indexOf(arr, targetValue);

      if (!(index >= 0)) arr.push(targetValue);
      else arr.splice(index, 1);
      onChange(arr.join('|'));
    } else {
      onChange(targetValue);
    }
  }

  render() {
    const { options, className, name, multiple, value } = this.props;

    const arr = value.split('|');
    const radioElementList = options.map((item, index) => {
      const checked = indexOf(arr, item.value) >= 0;

      return (
        <div className={S.radioItem} key={index} onClick={() => this.valueHandle(item.value)}>
          <Switch
            checked={checked}
            type={multiple ? 'square' : 'circle'}
          />
          <input name={name} type={multiple ? 'checkbox' : 'radio'} checked={checked} value={item.value} onChange={() => this.valueHandle(item.value)} />
          {item.label}
        </div>
      );
    });

    return (
      <div className={`${S.radioContainer} ${className}`}>
        { radioElementList }
      </div>
    );
  }
}

ChoiceInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  multiple: PropTypes.bool
};

export default ChoiceInput;
