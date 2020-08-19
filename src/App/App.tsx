import React, { PureComponent } from "react";
import './App.scss'

export class App extends PureComponent {
  state = {
    test: 'Текст для теста'
  }
  render () {
    return (
      <div className='test'>{this.state.test}</div>
    )
  }
}