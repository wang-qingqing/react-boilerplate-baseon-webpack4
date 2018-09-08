import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

import ExtendRoute from 'Routes/extendRoute';
import NotFound from 'Components/common/notFound';
import Main from 'Components/main';
import TodoItems from 'Components/todoList/todoItems';

//路由配置
const routes = [
    //首页
    {
        path: '/',
        exact: true,
        component: Main
    },
    //代办事项
    {
        path: '/todo',
        exact: true,
        component: TodoItems
    }
];

class MainRoute extends React.Component{
    render(){
        return (
            routes.length?
                <BrowserRouter>
                    <Switch>
                        {routes.map((route, i) => (
                            <ExtendRoute key={i} {...route} />
                        ))}

                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            : ''
        )
    }
}

export default MainRoute;
