import React, { Component, PropTypes } from 'react';
import indexOf from 'lodash/indexOf';
import find from 'lodash/find';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';

import S from './theme.scss';

class Select extends Component {
  static defaultProps = {
    className: '',
    isMultiple: false,
    isFilter: false,
    hasSearch: true,
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

  getLabel = () => {
    const { options, isMultiple, value } = this.props;

    if (isMultiple) {
      return value.map((item, index) => {
        const o = find(options, ['value', item]);
        return (
          <span key={index}>
            {o.label}
            <a href="javascript:;" onClick={e => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();

              this.removeValue(o.value);
            }}>关闭</a>
          </span>
        );
      });
    }

    const o = find(options, ['value', value]);
    return <span>{o.label}</span>;
  }

  getInput = () => {
    const { name, isMultiple, value } = this.props;

    if (isMultiple) {
      return value.map((item, index) => {
        return <input name={name} value={item} key={index} type="hidden" />;
      });
    }

    return <input name={name} value={value} type="hidden" />;
  }

  getElementList = () => {
    const { isFilter, options, value } = this.props;

    if (isEmpty(options)) {
      return (
        <span>No Result</span>
      );
    }

    const newOptions = isFilter ? this.filterOptions() : options;
    const elementList = newOptions.map((item, index) => {
      const position = indexOf(value, item.value);
      const checked = position >= 0 || value === item.value;

      return (
        <div key={index} className={`${S.item} ${checked ? S.checked : ''}`} onClick={() => this.valueHandle(item.value, checked)}>
          {item.label}
        </div>
      );
    });

    return elementList;
  }

  removeValue = v => {
    const { onChange, value } = this.props;
    const position = indexOf(value, v);
    const newValue = [...value];

    newValue.splice(position, 1);
    onChange(newValue);
  }

  addValue = v => {
    const { onChange, value } = this.props;
    const newValue = [...value];

    newValue.push(v);
    onChange(newValue);
  }

  filterOptions = () => {
    const { isMultiple, options, value } = this.props;

    if (isMultiple) {
      return value.reduce((result, current) => {
        return filter(result, item => item.value !== current);
      }, options);
    }

    return filter(options, item => item.value !== value);
  }

  valueHandle = (v, checked) => {
    const { onChange, isMultiple } = this.props;

    if (isMultiple) {
      if (checked) {
        this.removeValue(v);
      } else {
        this.addValue(v);
      }
    } else {
      this.setState({ show: false, value: v });
      onChange(v);
    }
  }

  searchHandle = e => {
    if (!this.props.hasSearch) return;
    const label = e.target.value;
    const newOptions = !isEmpty(label) ? filter(this.props.options, item => includes(item.label, label)) : this.props.options;
    this.setState({ options: newOptions });
  }

  handleTouchOutside = event => {
    if (this.wrapper && !this.wrapper.contains(event.target)) {
      this.setState({ show: false });
    }
  }

  render() {
    const { className } = this.props;

    return (
      <div className={`${S.selectContainer} ${className}`} ref={ref => (this.wrapper = ref)}>
        <div>
          {this.getLabel()}
        </div>
        <input
          className={S.box}
          onClick={() => this.setState({ show: true })}
          onChange={this.searchHandle}
        />
        <div className={`${S.list} ${this.state.show ? S.show : S.hide}`}>
          {this.getElementList()}
        </div>
        {this.getInput()}
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
  isMultiple: PropTypes.bool,
  isFilter: PropTypes.bool,
  hasSearch: PropTypes.bool
};

export default Select;
