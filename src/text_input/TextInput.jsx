import React, { PropTypes, Component } from 'react';
import { validation } from 'value-validate';
import S from './theme.scss';

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

  changeHandle = e => {
    const { rules, onChange } = this.props;
    const new_value = e.target.value;
    onChange(new_value);

    if (typeof rules === 'undefined') return;
    validation(new_value, rules, result => {
      const { isPass, msg } = result;
      this.setState({ msg, status: isPass ? 'pass' : 'error' });
    });
  }

  render() {
    const { value, className, disabled, multiline, name } = this.props;
    const { status, msg } = this.state;

    const inputElementProps = {
      name,
      className: S.input,
      onChange: this.changeHandle,
      disabled,
      value
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
  name: PropTypes.string,
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
