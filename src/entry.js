import React from "react";
import ReactDOM from "react-dom";
import MainRoute from 'Routes/mainRoute';

export default class Entry extends React.Component{
  render(){
    return (
      <div>
            Entry
      </div>
    )
  }
}

ReactDOM.render(<Entry />, document.getElementById("entry"));