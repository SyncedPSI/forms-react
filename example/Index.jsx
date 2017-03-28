import React, { Component } from 'react';
import { render } from 'react-dom';
import TextInput from '../src/text_input/TextInput';
import S from './index.scss';

class Example extends Component {
  state = {
    name: 'Jack',
    job: '',
    desc: 'I\'m Jack'
  }

  changeHandle = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className={S.example}>
        <TextInput
          name="name"
          className="input"
          onChange={value => this.changeHandle('name', value)}
          value={this.state.name}
          rules={[{ type: 'phone', msg: '请填写正确的手机号' }]}
        />
        <TextInput
          name="job"
          className="input"
          onChange={value => this.changeHandle('job', value)}
          value={this.state.job}
        />
        <TextInput
          name="desc"
          className="input"
          multiline
          onChange={value => this.changeHandle('desc', value)}
          value={this.state.desc}
          rules={['required']}
        />
      </div>
    );
  }
}

render(<Example />, document.getElementById('forms-react'));
