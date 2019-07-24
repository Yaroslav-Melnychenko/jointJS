import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import { createRectangle, createRhombus, createLink } from '../../utils/createNewShapes';
import { API_URL } from '../../api/constants';

const joint = require('jointjs');
const namespace = joint.shapes;
const graph = new joint.dia.Graph({}, { cellNamespace: namespace });


class EditableGraph extends Component {

    state = {}

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
            },
            cellViewNamespace: namespace
        });
        axios.get(`${API_URL}/graph-2`).then((responce) => {
            const { data } = responce;
            this.setState({ ...data });
        });
    }

    render() {

        const { cells } = this.state;

        if (cells) {
            graph.set('graphCustomProperty', true);
            graph.fromJSON(this.state);
        }

        return (
            <div id="editableGraph" ref="editableGraph" />
        );
    }
}
export default EditableGraph;