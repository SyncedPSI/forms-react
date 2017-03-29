import React, { Component } from 'react';
import { render } from 'react-dom';
import TextInput from '../src/text_input/TextInput';
import ChoiceInput from '../src/choice_input/ChoiceInput';

import S from './index.scss';

class Example extends Component {
  state = {
    name: 'Jack',
    job: '',
    desc: 'I\'m Jack',
    gender: '0',
    hobby: '123|234'
  }

  changeHandle = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form className={S.example} method="POST">
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
        <h4>性别</h4>
        <ChoiceInput
          name="gender"
          value={this.state.gender}
          options={[
            { label: 'Male', value: '0' },
            { label: 'Female', value: '1' }
          ]}
          onChange={value => this.changeHandle('gender', value)}
        />
        <h4>爱好</h4>
        <ChoiceInput
          name="hobby"
          value={this.state.hobby}
          multiple
          options={[
            { label: 'play', value: '123' },
            { label: 'music', value: '234' },
            { label: 'book', value: '456' }
          ]}
          onChange={value => this.changeHandle('hobby', value)}
        />
        <input type="submit" value="POST" />
      </form>
    );
  }
}

render(<Example />, document.getElementById('forms-react'));
