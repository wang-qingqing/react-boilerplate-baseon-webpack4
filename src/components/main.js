import React from 'react';
import axios from 'axios';
import 'Mock/mockdata.js';

export default class Main extends  React.Component{
    testMockData(){
        axios.get('/data',{dataType: 'json'})
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        return (
            <div className="main_area">
                <div className="welcome">
                    <div className="left-area">
                        <img src="../../src/images/peppa.jpg" style={{width: '200px',height: '200px'}}/>
                    </div>
                    <div className="right-area">Welcome to <strong>react-boilerplate-baseon-webpack4</strong> ~</div>
                </div>
                <div style={{paddingLeft: '20px'}}>
                    <a href="/todo">待办事项</a>
                </div>
                <div style={{paddingLeft: '20px',paddingTop: '20px'}}>
                    <a onClick={this.testMockData}>使用mock模拟接口数据</a>
                </div>
            </div>
        )
       
    }
}