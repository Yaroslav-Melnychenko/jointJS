import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createRectangle, createRhombus, createLink, createEllipse, graph, joint } from '../../utils/createNewShapes';

class FixedGraph extends Component {

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
            model: graph,
            interactive: () => {
                return false;
            }
        });
    }

    render() {

        const rect1 = createRectangle([300, 50], [100, 50], '#1890ff', '#fff', 'Main', '16px');
        const rhombus1 = createRhombus({ width: 70, height: 70 }, '#1890ff', 'Go', 'white');

        createLink(rect1, rhombus1);

        const ellipse1 = createEllipse({ width: 70, height: 70 }, { text: { text: 'Left' }, circle: { fill: '#2ECC71' } }, [150, 140]);

        createLink(rhombus1, ellipse1);

        const rect2 = createRectangle([500, 150], [100, 50], '#fefefe', '#000', 'Right', '16px');

        createLink(rhombus1, rect2);

        const rect3 = createRectangle([380, 250], [100, 50], '#f3ba4e', '#000', 'Option 1', '16px');
        const rect4 = createRectangle([500, 250], [100, 50], '#f3ba4e', '#000', 'Option 2', '16px');
        const rect5 = createRectangle([620, 250], [100, 50], '#f3ba4e', '#000', 'Option 3', '16px');

        createLink(rect2, rect3);
        createLink(rect2, rect4);
        createLink(rect2, rect5);

        const rect6 = createRectangle([500, 330], [100, 30], '#4b5fde', '#fff', 'Step 1', '16px');
        const rect7 = createRectangle([500, 370], [100, 30], '#4b5fde', '#fff', 'Step 2', '16px');

        createLink(rect3, rect6, [{x: 430, y: 345}]);
        createLink(rect3, rect7, [{x: 430, y: 385}]);
        createLink(rect3, rect7, [{x: 430, y: 385}]);

        const rect8 = createRectangle([280, 350], [100, 30], '#4b5fde', '#fff', 'Do this', '16px');
        const rect9 = createRectangle([280, 390], [100, 30], '#4b5fde', '#fff', 'Or this', '16px');

        createLink(rect3, rect8, [{x: 430, y: 365}]);
        createLink(rect3, rect9, [{x: 430, y: 405}]);

        return <div id="playground" ref="placeholder" />;
    }

}

export default FixedGraph;