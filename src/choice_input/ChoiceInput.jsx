import React, { Component, PropTypes } from 'react';
import indexOf from 'lodash/indexOf';

import S from './choice_input.scss';

class ChoiceInput extends Component {
  static defaultProps = {
    className: '',
    multiple: false,
    value: '',
    options: [],
    onChange: () => {}
  }

  changeHandle = e => {
    const { onChange, multiple, value } = this.props;
    const arr = value.split('|');
    const targetValue = e.target.value;

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
        <div className={S.radioItem} key={index}>
          <input name={name} type={multiple ? 'checkbox' : 'radio'} checked={checked} value={item.value} onChange={this.changeHandle} />
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
