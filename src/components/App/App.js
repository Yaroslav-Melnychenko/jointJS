import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const joint = require('jointjs');

class App extends Component {

    graph = new joint.dia.Graph();

    componentDidMount() {
        this.paper = new joint.dia.Paper({
            el: ReactDOM.findDOMNode(this.refs.placeholder),
            width: 800,
            height: 500,
            gridSize: 10,
            drawGrid: true,
            background: {
                color: '#f3f3f3'
            },
            model: this.graph
        });
    }

    render() {

        const rect1 = new joint.shapes.standard.Rectangle();
        rect1.position(300, 50);
        rect1.resize(100, 50);
        rect1.attr({
            body: {
                fill: '#1890ff'
            },
            label: {
                text: 'Main',
                fontSize: '16px',
                fill: '#fff'
            }
        })
        rect1.addTo(this.graph);

        const rhombus1 = new joint.shapes.basic.Path({
            size: { width: 70, height: 70 },
            attrs: {
                path: { d: 'M 30 0 L 60 30 30 60 0 30 z', fill: '#1890ff' },
                text: { text: 'Go', 'ref-y': -50, fill: 'white' }
            }
         });
         rhombus1.position(315, 140)
         rhombus1.addTo(this.graph);

        const link1 = new joint.shapes.standard.Link();
        link1.source(rect1);
        link1.target(rhombus1);
        link1.addTo(this.graph);

        return (
        <div id="playground" ref="placeholder" />
        );
    }
}

export default App;