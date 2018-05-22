import React from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import MainRoute from 'Routes/mainRoute';

export default class App extends React.Component{
  render(){
    return (
      <div>
           <MainRoute />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("main"));