export const createRectangle = (joint, graph, position, size, fillColor, textColor, text, fontSize) => {
    const rectangle = new joint.shapes.standard.Rectangle();
    if (position) {
        rectangle.position(...position);
    } else {
        rectangle.position(20, 20);
    }
    if (size) {
        rectangle.resize(...size);
    } else {
        rectangle.resize(100, 30);
    }
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
    rectangle.addTo(graph);
    return rectangle;
}

export const createRhombus = (joint, graph, position, size, fillColor, text, fontColor) => {
    // console.log('size', size)
    const rhombus = new joint.shapes.basic.Path({
        size,
        attrs: {
            path: { d: 'M 30 0 L 60 30 30 60 0 30 z', fill: fillColor },
            text: { text, 'ref-y': -50, fill: fontColor }
        }
     });
     rhombus.position(...position)
     rhombus.addTo(graph);
     return rhombus;
}

export const createLink = (joint, graph, source, target, vertices) => {
    const link = new joint.shapes.standard.Link();
    link.source(source);
    link.target(target);
    if (vertices) {
        link.vertices(vertices);
    }
    link.addTo(graph);
}

export const createEllipse = (joint, graph, size, attrs, position) => {
    const ellipse = new joint.shapes.basic.Ellipse({
        size,
        attrs
    });
    ellipse.position(...position);
    ellipse.addTo(graph);
    return ellipse;
}

// New functions for implement JSON uploading

export const configurePaperForLinks = (joint, paper, graph) => {
    if (paper) {
        paper.on('link:mouseenter', function(linkView) {
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

            linkView.addTools(toolsView);
            linkView.showTools();
        });
            
        paper.on('link:mouseleave', function(linkView) {
            const toolsView = new joint.dia.ToolsView();
            linkView.addTools(toolsView);
        });

        paper.on('cell:pointerdown', function(el) {
            const { model: { id } } = el;
            graph.getCell(id).remove();
        });
    }
}