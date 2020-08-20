import React, { PureComponent, ReactPropTypes } from 'react';
import './App.scss';

interface IState {
    test: string;
}
export class App extends PureComponent<ReactPropTypes, IState> {
    static state = {
        test: 'Текст для теста',
    };
    public render() {
        return <div className="test">{this.state.test}</div>;
    }
}
