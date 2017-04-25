import React, { Component } from 'react';
import { render } from 'react-dom';
import TextInput from '../src/text_input/TextInput';
import ChoiceInput from '../src/choice_input/ChoiceInput';
import Select from '../src/select/Select';

import S from './index.scss';

class Example extends Component {
  state = {
    name: 'Jack',
    job: '',
    desc: 'I\'m Jack',
    gender: '0',
    hobby: '123|234',
    city: ['北京', '上海'],
    avatar: '北京'
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
        <Select
          name="city"
          value={this.state.city}
          isFilter
          isMultiple
          options={[
            { label: '北京', value: '北京' },
            { label: '上海', value: '上海' },
            { label: '广州', value: '广州' }
          ]}
        />
        <Select
          name="avatar"
          value={this.state.avatar}
          options={[
            { label: '北京', value: '北京' },
            { label: '上海', value: '上海' },
            { label: '广州', value: '广州' }
          ]}
        />
        <input type="submit" value="POST" />
      </form>
    );
  }
}

render(<Example />, document.getElementById('forms-react'));
