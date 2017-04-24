import React, { Component, PropTypes } from 'react';
import indexOf from 'lodash/indexOf';
import find from 'lodash/find';
import isArray from 'lodash/isArray';

import S from './theme.scss';

class Select extends Component {
  static defaultProps = {
    className: '',
    multiple: false,
    value: '',
    options: [],
    onChange: () => {}
  }

  constructor(props) {
    super(props);
    if (!document.addEventListener && document.attachEvent) {
      document.attachEvent('click', this.handleTouchOutside);
    } else {
      document.addEventListener('click', this.handleTouchOutside);
    }
  }

  state = {
    show: false
  }

  componentWillUnmount() {
    if (!document.removeEventListener && document.detachEvent) {
      document.detachEvent('click', this.handleTouchOutside);
    } else {
      document.removeEventListener('click', this.handleTouchOutside);
    }
  }

  getLabel = v => {
    const { options } = this.props;

    if (isArray(v)) {
      return v.map((item, index) => {
        const o = find(options, ['value', item]);
        return <span key={index}>{o.label}</span>;
      });
    }

    const o = find(options, ['value', v]);
    return <span>{o.label}</span>;
  }

  valueHandle = (v, position, checked) => {
    const { onChange, multiple, value } = this.props;
    this.setState({ show: false });
    let newValue;

    if (multiple) {
      newValue = [...value];
      if (checked) {
        newValue.splice(position, 1);
      } else {
        newValue.push(v);
      }
    } else {
      newValue = v;
    }
    onChange(newValue);
  }


  handleTouchOutside = event => {
    if (this.wrapper && !this.wrapper.contains(event.target)) {
      this.setState({ show: false });
    }
  }

  render() {
    const { options, className, name, value } = this.props;

    const customElementList = options.map((item, index) => {
      const position = indexOf(value, item.value);
      const checked = position >= 0;

      return (
        <div key={index} className={`${S.item} ${checked ? S.checked : ''}`} onClick={() => this.valueHandle(item.value, position, checked)}>
          {item.label}
        </div>
      );
    });

    return (
      <div className={`${S.selectContainer} ${className}`} ref={ref => (this.wrapper = ref)}>
        <div>
          {this.getLabel(value)}
        </div>
        <input
          className={S.box}
          onClick={() => this.setState({ show: true })}
        />
        <div className={`${S.list} ${this.state.show ? S.show : S.hide}`}>
          {customElementList}
        </div>
        {
          value.map((item, index) => {
            return <input name={name} value={item} key={index} type="hidden" />;
          })
        }
      </div>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  multiple: PropTypes.bool
};

export default Select;
