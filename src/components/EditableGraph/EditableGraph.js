import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button, Spin, Icon } from 'antd';
import { API_URL } from '../../api/constants';
import { createRectangle, createEllipse } from '../../utils/createNewShapes';
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
            graph.fromJSON({ cells });
        }

        if (this.paper) {
            const verticesTool = new joint.linkTools.Vertices();
            const segmentsTool = new joint.linkTools.Segments();
            const sourceArrowheadTool = new joint.linkTools.SourceArrowhead();
            const targetArrowheadTool = new joint.linkTools.TargetArrowhead();
            const sourceAnchorTool = new joint.linkTools.SourceAnchor();
            const targetAnchorTool = new joint.linkTools.TargetAnchor();
            const boundaryTool = new joint.linkTools.Boundary();
            const removeButton = new joint.linkTools.Remove();

            const toolsView = new joint.dia.ToolsView({
                tools: [
                    verticesTool, segmentsTool,
                    sourceArrowheadTool, targetArrowheadTool,
                    sourceAnchorTool, targetAnchorTool,
                    boundaryTool, removeButton
                ]
            });
            this.paper.on('link:mouseenter', function(linkView) {
                linkView.addTools(toolsView);
                linkView.showTools();
                // console.log(linkView)
            });
            
            this.paper.on('link:mouseover', function(linkView) {
                console.log(linkView)
                // linkView.addTools(toolsView);
                // linkView.hideTools();
            });
        }

        return (
            <div className="editable-container">
                { isLoading ? <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} className="loader" /> : null }
                <div id="editableGraph" ref="editableGraph" className={`loading-graph-${isLoading}`} />
                <div className="graph-panel">
                    <li onClick={() => createRectangle(joint, graph, [20, 20], [100, 30], '#4b5fde', '#fff', '', '16px')}>
                        <div className="rectangle" />
                    </li>
                    <li onClick={() => createEllipse(joint, graph, { width: 70, height: 70 }, { text: { text: 'Left' }, circle: { fill: '#2ECC71' } }, [150, 140])}>
                        <div className="circle" />
                    </li>
                </div>
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