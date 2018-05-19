import React from 'react';
import TodoView from '../todoList/todoView';
import {Layout} from 'antd';
import Store from '../../store/store';
import "../../style/index.scss";
const todoStore = new Store.todoStore();

export default class TodoItems extends  React.Component{
    render(){
        return (          
            <Layout className="main_area">
                <TodoView todoStore={todoStore} />
            </Layout>         
        ) 
    }
}
