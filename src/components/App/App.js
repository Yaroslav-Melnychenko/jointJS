import React, { Component } from 'react';
import { Tabs } from 'antd';
import FixedGraph from '../FixedGraph';
import './App.css';



class App extends Component {

    render() {

        const { TabPane } = Tabs;

        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="Fixed graph" key="1">
                    <FixedGraph />
                </TabPane>
                <TabPane tab="Editable graph" key="2">
                    Editable graph
                </TabPane>
            </Tabs>
        );
    }
}

export default App;