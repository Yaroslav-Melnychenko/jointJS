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
            model: this.graph,
            interactive: () => {
                return false;
            }
        });
    }

    createRectangle = (position, size, fillColor, textColor, text, fontSize) => {
        const rectangle = new joint.shapes.standard.Rectangle();
        rectangle.position(...position);
        rectangle.resize(...size);
        rectangle.attr({
            body: {
                fill: fillColor
            },
            label: {
                text: text,
                fontSize,
                fill: textColor
            }
        })
        rectangle.addTo(this.graph);
        return rectangle;
    }

    createRhombus = (size, fillColor, text, fontColor) => {
        const rhombus = new joint.shapes.basic.Path({
            size,
            attrs: {
                path: { d: 'M 30 0 L 60 30 30 60 0 30 z', fill: fillColor },
                text: { text, 'ref-y': -50, fill: fontColor }
            }
         });
         rhombus.position(315, 140)
         rhombus.addTo(this.graph);
         return rhombus;
    }

    createLink = (source, target, vertices) => {
        const link = new joint.shapes.standard.Link();
        link.source(source);
        link.target(target);
        if (vertices) {
            link.vertices(vertices);
        }
        link.addTo(this.graph);
    }

    createEllipse = (size, attrs, position) => {
        const ellipse = new joint.shapes.basic.Ellipse({
            size,
            attrs
        });
        ellipse.position(...position);
        ellipse.addTo(this.graph);
        return ellipse;
    }

    render() {

        const rect1 = this.createRectangle([300, 50], [100, 50], '#1890ff', '#fff', 'Main', '16px');
        const rhombus1 = this.createRhombus({ width: 70, height: 70 }, '#1890ff', 'Go', 'white');

        this.createLink(rect1, rhombus1);

        const ellipse1 = this.createEllipse({ width: 70, height: 70 }, { text: { text: 'Left' }, circle: { fill: '#2ECC71' } }, [150, 140]);

        this.createLink(rhombus1, ellipse1);

        const rect2 = this.createRectangle([500, 150], [100, 50], '#fefefe', '#000', 'Right', '16px');

        this.createLink(rhombus1, rect2);

        const rect3 = this.createRectangle([380, 250], [100, 50], '#f3ba4e', '#000', 'Option 1', '16px');
        const rect4 = this.createRectangle([500, 250], [100, 50], '#f3ba4e', '#000', 'Option 2', '16px');
        const rect5 = this.createRectangle([620, 250], [100, 50], '#f3ba4e', '#000', 'Option 3', '16px');

        this.createLink(rect2, rect3);
        this.createLink(rect2, rect4);
        this.createLink(rect2, rect5);

        const rect6 = this.createRectangle([500, 330], [100, 30], '#4b5fde', '#fff', 'Step 1', '16px');
        const rect7 = this.createRectangle([500, 370], [100, 30], '#4b5fde', '#fff', 'Step 2', '16px');

        this.createLink(rect3, rect6, [{x: 430, y: 345}]);
        this.createLink(rect3, rect7, [{x: 430, y: 385}]);
        this.createLink(rect3, rect7, [{x: 430, y: 385}]);

        const rect8 = this.createRectangle([280, 350], [100, 30], '#4b5fde', '#fff', 'Do this', '16px');
        const rect9 = this.createRectangle([280, 390], [100, 30], '#4b5fde', '#fff', 'Or this', '16px');

        this.createLink(rect3, rect8, [{x: 430, y: 365}]);
        this.createLink(rect3, rect9, [{x: 430, y: 405}]);

        return <div id="playground" ref="placeholder" />;
    }

}

export default FixedGraph;