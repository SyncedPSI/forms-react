import React, { Component, PropTypes } from 'react';
import indexOf from 'lodash/indexOf';
import find from 'lodash/find';

import S from './theme.scss';

class Select extends Component {
  static defaultProps = {
    className: '',
    multiple: false,
    value: '',
    options: [],
    onChange: () => {}
  }

  state = {
    show: false
  }

  getLabel = v => {
    const { options } = this.props;
    const o = find(options, ['value', v]);
    return o.label;
  }

  valueHandle = v => {
    const { onChange } = this.props;
    this.setState({ show: false });
    onChange(v);
  }

  render() {
    const { options, className, name, multiple, value } = this.props;

    const arr = value.split('|');
    const customElementList = options.map((item, index) => {
      const checked = indexOf(arr, item.value) >= 0;

      return (
        <div key={index} className={`${S.item} ${checked ? S.checked : ''}`} onClick={() => this.valueHandle(item.value)}>
          {item.label}
        </div>
      );
    });

    const optionsElementList = options.map((item, index) => {
      const checked = indexOf(arr, item.value) >= 0;

      return (
        <option key={index} value={item.value} selected={checked}>{item.label}</option>
      );
    });

    return (
      <div className={`${S.selectContainer} ${className}`}>
        <div className={S.box} onClick={() => this.setState({ show: !this.state.show })}>
          <span>{this.getLabel(value)}</span>
        </div>
        <div className={`${S.list} ${this.state.show ? S.show : S.hide}`}>
          {customElementList}
        </div>
        <select name={name} multiple={multiple} onChange={e => this.valueHandle(e.target.value)}>
          {optionsElementList}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  multiple: PropTypes.bool
};

export default Select;
