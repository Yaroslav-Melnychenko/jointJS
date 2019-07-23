import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { createRectangle } from '../../utils/createNewShapes';

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
    }

    render() {
        // const rect1 = createRectangle(joint, graph, [300, 50], [100, 50], '#1890ff', '#fff', 'Main', '16px');
        return (
            <div id="editableGraph" ref="editableGraph" />
        );
    }
}
export default EditableGraph;