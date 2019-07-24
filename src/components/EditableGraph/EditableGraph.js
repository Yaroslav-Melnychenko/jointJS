import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button, Spin, Icon } from 'antd';
import { API_URL } from '../../api/constants';
import './EditableGraph.css';

const joint = require('jointjs');
const namespace = joint.shapes;
const graph = new joint.dia.Graph({}, { cellNamespace: namespace });


class EditableGraph extends Component {

    state = {
        isLoading: false,
    }

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
        this.setState({ isLoading: true });
        axios.get(`${API_URL}/graph-1`).then((responce) => {
            const { data } = responce;
            this.setState({ ...data, isLoading: false });
        });
    }

    saveGraph = () => {
        this.setState({ isLoading: true });
        const jsonObject = graph.toJSON();
        axios.post(`${API_URL}/graph-1`, { ...jsonObject }).then(responce => {
            const { data } = responce;
            this.setState({ ...data, isLoading: false });
        })
    }

    render() {

        const { cells, isLoading } = this.state;

        if (cells) {
            graph.set('graphCustomProperty', true);
            graph.fromJSON({ cells });
        }

        console.log(this.state);

        return (
            <div className="editable-container">
                { isLoading ? <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} className="loader" /> : null }
                <div id="editableGraph" ref="editableGraph" className={`loading-graph-${isLoading}`} />
                <Button 
                    onClick={this.saveGraph} 
                    type="primary"
                    className="save-btn"
                    disabled={isLoading}
                >
                    Save
                </Button>
            </div>
        );
    }
}
export default EditableGraph;