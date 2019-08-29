import React from 'react';
// import logo from './logo.svg';
import {observable} from 'mobx';
import { Button } from 'antd';
import './App.css';

class ExampleStore {
    @observable name = 'test';
}

const App: React.FC = () => {
  return (
    <div className="App">
        <Button type="primary">Button</Button>
    </div>
  );
}

export default App;
