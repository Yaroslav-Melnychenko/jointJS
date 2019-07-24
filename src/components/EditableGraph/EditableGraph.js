import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'antd';
import { API_URL } from '../../api/constants';
import './EditableGraph.css';

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
        });
        axios.get(`${API_URL}/graph-1`).then((responce) => {
            const { data } = responce;
            this.setState({ ...data });
        });
    }

    saveGraph = () => {
        const jsonObject = graph.toJSON();
        console.log('jsonObject', jsonObject)
    }

    render() {

        const { cells } = this.state;

        if (cells) {
            graph.set('graphCustomProperty', true);
            graph.fromJSON(this.state);
        }

        return (
            <div className="editable-container">
                <div id="editableGraph" ref="editableGraph" />
                <Button 
                    onClick={this.saveGraph} 
                    type="primary"
                    className="save-btn"
                >
                    Save
                </Button>
            </div>
        );
    }
}
export default EditableGraph;