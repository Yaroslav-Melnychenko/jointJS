import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { createRectangle, createRhombus } from '../../utils/createNewShapes';

const joint = require('jointjs');
const graph = new joint.dia.Graph();

class EditableGraph extends Component {

    componentDidMount() {
        this.paper = new joint.dia.Paper({
            el: ReactDOM.findDOMNode(this.refs.editableGraph),
            width: 800,
            height: 500,
            gridSize: 10,
            drawGrid: true,
            background: {
                color: '#f3f3f3'
            },
            model: graph,
            interactive: () => {
                return false;
            }
        });
        axios.get('http://localhost:4000/graph-1').then((responce) => {
            const { data } = responce;
            data.forEach(shape => {
                if (shape.type === 'rectangle') {
                    createRectangle(joint, graph, shape.position, shape.size, shape.fillColor, shape.textColor, shape.text, shape.fontSize);
                } else if (shape.type === 'rhombus') {
                    createRhombus(joint, graph, shape.position, shape.size, shape.fillColor, shape.text, shape.textColor);
                }
            })
        });
    }

    render() {
        return (
            <div id="editableGraph" ref="editableGraph" />
        );
    }
}
export default EditableGraph;