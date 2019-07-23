import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const joint = require('jointjs');

class FixedGraph extends Component {

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

        const ellipse1 = new joint.shapes.basic.Ellipse({
            size: { width: 70, height: 70 },
            attrs: { text: { text: 'Left' }, circle: { fill: '#2ECC71' } }
        });
        ellipse1.position(150, 140);
        ellipse1.addTo(this.graph);

        const link2 = new joint.shapes.standard.Link();
        link2.source(rhombus1);
        link2.target(ellipse1);
        link2.addTo(this.graph);

        const rect2 = new joint.shapes.standard.Rectangle();
        rect2.position(500, 150);
        rect2.resize(100, 50);
        rect2.attr({
            body: {
                fill: '#fefefe'
            },
            label: {
                text: 'Right',
                fontSize: '16px',
                fill: '#000'
            }
        })
        rect2.addTo(this.graph);

        const link4 = new joint.shapes.standard.Link();
        link4.source(rhombus1);
        link4.target(rect2);
        link4.addTo(this.graph);

        const rect3 = new joint.shapes.standard.Rectangle();
        rect3.position(380, 250);
        rect3.resize(100, 50);
        rect3.attr({
            body: {
                fill: '#f3ba4e'
            },
            label: {
                text: 'Option 1',
                fontSize: '16px',
                fill: '#000'
            }
        })
        rect3.addTo(this.graph);

        const rect4 = new joint.shapes.standard.Rectangle();
        rect4.position(500, 250);
        rect4.resize(100, 50);
        rect4.attr({
            body: {
                fill: '#f3ba4e'
            },
            label: {
                text: 'Option 2',
                fontSize: '16px',
                fill: '#000'
            }
        })
        rect4.addTo(this.graph);

        const rect5 = new joint.shapes.standard.Rectangle();
        rect5.position(620, 250);
        rect5.resize(100, 50);
        rect5.attr({
            body: {
                fill: '#f3ba4e'
            },
            label: {
                text: 'Option 3',
                fontSize: '16px',
                fill: '#000'
            }
        })
        rect5.addTo(this.graph);

        const link5 = new joint.shapes.standard.Link();
        link5.source(rect2);
        link5.target(rect3);
        link5.addTo(this.graph);

        const link6 = new joint.shapes.standard.Link();
        link6.source(rect2);
        link6.target(rect4);
        link6.addTo(this.graph);

        const link7 = new joint.shapes.standard.Link();
        link7.source(rect2);
        link7.target(rect5);
        link7.addTo(this.graph);

        const rect6 = new joint.shapes.standard.Rectangle();
        rect6.position(500, 330);
        rect6.resize(100, 30);
        rect6.attr({
            body: {
                fill: '#4b5fde'
            },
            label: {
                text: 'Step 1',
                fontSize: '16px',
                fill: '#fff'
            }
        })
        rect6.addTo(this.graph);

        const rect7 = new joint.shapes.standard.Rectangle();
        rect7.position(500, 370);
        rect7.resize(100, 30);
        rect7.attr({
            body: {
                fill: '#4b5fde'
            },
            label: {
                text: 'Step 2',
                fontSize: '16px',
                fill: '#fff'
            }
        })
        rect7.addTo(this.graph);

        const link8 = new joint.shapes.standard.Link();
        link8.source(rect3);
        link8.target(rect6);
        link8.vertices([{x: 430, y: 345}])
        link8.addTo(this.graph);

        const link9 = new joint.shapes.standard.Link();
        link9.source(rect3);
        link9.target(rect7);
        link9.vertices([{x: 430, y: 385}])
        link9.addTo(this.graph);

        const rect8 = new joint.shapes.standard.Rectangle();
        rect8.position(280, 350);
        rect8.resize(100, 30);
        rect8.attr({
            body: {
                fill: '#4b5fde'
            },
            label: {
                text: 'Do this',
                fontSize: '16px',
                fill: '#fff'
            }
        })
        rect8.addTo(this.graph);

        const rect9 = new joint.shapes.standard.Rectangle();
        rect9.position(280, 390);
        rect9.resize(100, 30);
        rect9.attr({
            body: {
                fill: '#4b5fde'
            },
            label: {
                text: 'Or this',
                fontSize: '16px',
                fill: '#fff'
            }
        })
        rect9.addTo(this.graph);

        const link10 = new joint.shapes.standard.Link();
        link10.source(rect3);
        link10.target(rect8);
        link10.vertices([{x: 430, y: 365}])
        link10.addTo(this.graph);

        const link11 = new joint.shapes.standard.Link();
        link11.source(rect3);
        link11.target(rect9);
        link11.vertices([{x: 430, y: 405}])
        link11.addTo(this.graph);


        return <div id="playground" ref="placeholder" />;
    }

}

export default FixedGraph;