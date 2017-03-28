import React, { PropTypes, Component } from 'react';
import { validation } from 'value-validate';
import S from './text_input.scss';

class TextInput extends Component {
  static defaultProps = {
    value: '',
    disabled: false,
    multiline: false,
    className: '',
    onChange: () => {}
  }

  state = {
    status: 'default',
    msg: ''
  }

  handleChange = e => {
    const { rules, onChange } = this.props;
    const new_value = e.target.value;

    if (typeof rules === 'undefined') {
      onChange(new_value);
    } else {
      validation(new_value, rules, result => {
        const { isPass, msg } = result;
        this.setState({ msg, status: isPass ? 'pass' : 'error' }, () => {
          onChange(new_value);
        });
      });
    }
  }

  render() {
    const { rules, value, className, disabled, multiline, onChange, ...others } = this.props;
    const { status, msg } = this.state;

    const inputElementProps = {
      className: S.input,
      onChange: this.handleChange,
      disabled,
      value,
      ...others
    };

    const messageElement = <div className="message">{msg}</div>;

    return (
      <div className={`${S.inputContainer} ${S[status]} ${className}`}>
        <div className={`${S.inputWrapper}`}>
          {React.createElement(multiline ? 'textarea' : 'input', inputElementProps)}
        </div>
        { status !== 'default' ? messageElement : '' }
      </div>
    );
  }
}

TextInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string
  ]),
  rules: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ])),
  multiline: PropTypes.bool
};

export default TextInput;
