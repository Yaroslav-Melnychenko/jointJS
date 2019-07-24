export const createRectangle = (joint, graph, position, size, fillColor, textColor, text, fontSize) => {
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