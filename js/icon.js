var copyIcon = new svgModule('copyBtn', null, 32, 32)
    .addLine({
        points: [
            { x: 0, y: 0 },
            { x: 5, y: 0 }
        ],
        zoom: 2,
        style: "fill: none; stroke: black; stroke-width: 1.5px;",
        quantity: 5,
    })
    .addPolygon({
        points: [
            { x: 0, y: 0 },
            { x: 0, y: 10 },
            { x: 8, y: 10 },
            { x: 8, y: 0 },
        ],
        zoom: 2,
        style: "fill: white; stroke: black; stroke-width: 2px;",
        quantity: 2,
    })
    .init();

copyIcon.get(0).setTop(14).setLeft(15);
copyIcon.get(1).setTop(17).setLeft(15);
copyIcon.get(2).setTop(20).setLeft(15);
copyIcon.get(3).setTop(23).setLeft(15);
copyIcon.get(4).setTop(26).setLeft(15);
copyIcon.get(5).setTop(10).setLeft(12);
copyIcon.get(6).setTop(3).setLeft(5);

var convertIcon = new svgModule('conBtn', null, 32, 32)
    .addPolygon({
        points: [
            { x: 0, y: 0 },
            { x: 6, y: 5 },
            { x: 0, y: 10 },
        ],
        zoom: 2.8,
        style: "fill: white; stroke: black; stroke-width: 2px;",
        quantity: 2,
    })
    .init();

convertIcon.get(0).setLeft(14);
convertIcon.get(1).setLeft(3);