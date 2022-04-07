class svgModule {
    //divId: div element's id
    //svgId: svg enement's id
    //width: value for setting svg enement's width
    //height: value for setting svg enement's height
    constructor(divId, svgId, width, height) {
        this.divObj = document.getElementById(divId)
        this.svgObj = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        (svgId != null) ? this.svgObj.setAttribute('id', svgId) : null;
        (width != null) ? this.svgObj.setAttribute('width', `${width}`) : null;
        (height != null) ? this.svgObj.setAttribute('height', `${height}`) : null;
        this.obj = [];
    }

    //opt{id?, points, zoom?, fill?, stroke?, strokeWidth?, style?, top?, left?, quantity?}
    //id: polygon object's id (default = null)
    //points: polygon object's points by using [{x: value, y: value},......]
    //zoom: value for zoom (can use both int and string, default = 1)
    //fill: color for fill (style, default = 'none')
    //stroke: color for stroke (style, default = 'black')
    //strokeWidth: value for stroke-width (style, can use both int and string, default = 1)
    //style: edit element's style by string (can just use this to edit style)
    //top: value for shift polygon (can be used when stroke has been cutted, default = stroke-width)
    //left: value for shift polygon (can be used when stroke has been cutted, default = stroke-width)
    //* when style has been setted, it will overwrite every style's setting before, even with default value.
    addPolygon(opt) {
        opt.strokeWidth = opt.strokeWidth ?? 1;
        opt.stroke = opt.stroke ?? 'black';
        opt.fill = opt.fill ?? 'none';
        opt.zoom = opt.zoom ?? 1;

        this.obj.push(document.createElementNS("http://www.w3.org/2000/svg", 'polygon'));
        var len = this.obj.length - 1;
        (opt.id != null) ? this.obj[len].setAttribute('id', opt.id) : null;
        this.obj[len].style['stroke-width'] = `${opt.strokeWidth}`;
        this.obj[len].style['stroke'] = opt.stroke;
        this.obj[len].style['fill'] = opt.fill;
        (opt.style != null) ? (this.obj[len].style = opt.style) : null;

        opt.top = opt.top ?? parseInt(this.obj[len].style['stroke-width'] ?? "0");
        opt.left = opt.left ?? parseInt(this.obj[len].style['stroke-width'] ?? "0");

        var xMin = opt.points.map(p => p.x).sort(function (a, b) { return a - b })[0];
        var yMax = opt.points.map(p => p.y).sort(function (a, b) { return b - a })[0];

        var svgPoints = "";
        for (var i = 0; i < opt.points.length; i++) {
            var x = (opt.points[i].x - xMin) * opt.zoom;
            var y = (opt.points[i].y - yMax) * opt.zoom;
            svgPoints += `${(x >= 0) ? x + opt.left : x * -1 + opt.left},${(y >= 0) ? y + opt.top : y * -1 + opt.top} `;
        }

        this.obj[len].setAttribute('points', svgPoints);
        (opt.quantity != null) ? this.setMultiObj(opt.quantity, this.obj[len]) : null;
        return this;
    }

    //opt{id?, r, top?, left?, fill?, stroke?, strokeWidth?, style?, quantity?}
    //id: circle object's id (default = null)
    //fill: color for fill (style, default = 'none')
    //stroke: color for stroke (style, default = 'black')
    //strokeWidth: value for stroke-width (style, can use both int and string, default = 1)
    //style: edit element's style by string (can just use this to edit style)
    //top: value for shift circle (default = stroke-width + r)
    //left: value for shift circle (default = stroke-width + r)
    //* when style has been setted, it will overwrite every style's setting before, even with default value.
    addCircle(opt) {
        opt.strokeWidth = opt.strokeWidth ?? 1;
        opt.stroke = opt.stroke ?? 'black';
        opt.fill = opt.fill ?? 'none';

        this.obj.push(document.createElementNS("http://www.w3.org/2000/svg", 'circle'));
        var len = this.obj.length - 1;
        (opt.id != null) ? this.obj[len].setAttribute('id', opt.id) : null;
        this.obj[len].style['stroke-width'] = `${opt.strokeWidth}`;
        this.obj[len].style['stroke'] = opt.stroke;
        this.obj[len].style['fill'] = opt.fill;
        (opt.style != null) ? (this.obj[len].style = opt.style) : null;

        opt.top = opt.top ?? parseInt(this.obj[len].style['stroke-width']) + opt.r;
        opt.left = opt.left ?? parseInt(this.obj[len].style['stroke-width']) + opt.r;
        this.obj[len].setAttribute('r', opt.r);
        this.obj[len].setAttribute('cx', opt.left);
        this.obj[len].setAttribute('cy', opt.top);
        (opt.quantity != null) ? this.setMultiObj(opt.quantity, this.obj[len]) : null;
        return this;
    }

    //opt{id?, rx, ry, top?, left?, fill?, stroke?, strokeWidth?, style?, quantity?}
    addEllipse(opt) {
        opt.strokeWidth = opt.strokeWidth ?? 1;
        opt.stroke = opt.stroke ?? 'black';
        opt.fill = opt.fill ?? 'none';

        this.obj.push(document.createElementNS("http://www.w3.org/2000/svg", 'ellipse'));
        var len = this.obj.length - 1;
        (opt.id != null) ? this.obj[len].setAttribute('id', opt.id) : null;
        this.obj[len].style['stroke-width'] = `${opt.strokeWidth}`;
        this.obj[len].style['stroke'] = opt.stroke;
        this.obj[len].style['fill'] = opt.fill;
        (opt.style != null) ? (this.obj[len].style = opt.style) : null;

        opt.top = opt.top ?? parseInt(this.obj[len].style['stroke-width']) + opt.ry;
        opt.left = opt.left ?? parseInt(this.obj[len].style['stroke-width']) + opt.rx;
        this.obj[len].setAttribute('rx', opt.rx);
        this.obj[len].setAttribute('ry', opt.ry);
        this.obj[len].setAttribute('cx', opt.left);
        this.obj[len].setAttribute('cy', opt.top);
        (opt.quantity != null) ? this.setMultiObj(opt.quantity, this.obj[len]) : null;
        return this;
    }

    //opt{id?, points, zoom?, fill?, stroke?, strokeWidth?, style?, top?, left?, quantity?}
    addLine(opt) {
        opt.strokeWidth = opt.strokeWidth ?? 1;
        opt.stroke = opt.stroke ?? 'black';
        opt.fill = opt.fill ?? 'none';
        opt.zoom = opt.zoom ?? 1;

        this.obj.push(document.createElementNS("http://www.w3.org/2000/svg", 'polyline'));
        var len = this.obj.length - 1;
        (opt.id != null) ? this.obj[len].setAttribute('id', opt.id) : null;
        this.obj[len].style['stroke-width'] = `${opt.strokeWidth}`;
        this.obj[len].style['stroke'] = opt.stroke;
        this.obj[len].style['fill'] = opt.fill;
        (opt.style != null) ? (this.obj[len].style = opt.style) : null;

        opt.top = opt.top ?? parseInt(this.obj[len].style['stroke-width']);
        opt.left = opt.left ?? parseInt(this.obj[len].style['stroke-width']);

        var xMin = opt.points.map(p => p.x).sort(function (a, b) { return a - b })[0];
        var yMax = opt.points.map(p => p.y).sort(function (a, b) { return b - a })[0];

        var svgPoints = "";
        for (var i = 0; i < opt.points.length; i++) {
            var x = (opt.points[i].x - xMin) * opt.zoom;
            var y = (opt.points[i].y - yMax) * opt.zoom;
            svgPoints += `${(x >= 0) ? x + opt.left : x * -1 + opt.left},${(y >= 0) ? y + opt.top : y * -1 + opt.top} `;
        }

        this.obj[len].setAttribute('points', svgPoints);
        (opt.quantity != null) ? this.setMultiObj(opt.quantity, this.obj[len]) : null;
        return this;
    }

    //opt{id?, text?, fill?, fontSize?, fontWeight?, fontFamily?, top?, left?, style?, quantity?}
    addText(opt){
        opt.fill = opt.fill ?? 'none';
        opt.text = opt.text ?? '';
        opt.top = opt.top ?? 0;
        opt.left = opt.left ?? 0;

        this.obj.push(document.createElementNS("http://www.w3.org/2000/svg", 'text'));
        var len = this.obj.length - 1;
        this.obj[len].appendChild(document.createTextNode(opt.text));
        (opt.id != null) ? this.obj[len].setAttribute('id', opt.id) : null;
        this.obj[len].setAttribute('x', opt.left);
        this.obj[len].setAttribute('y', opt.top);
        this.obj[len].style['fill'] = opt.fill;
        (opt.fontSize != null) ? this.obj[len].style['font-size'] = `${opt.fontSize}` : null;
        (opt.fontWeight != null) ? this.obj[len].style['font-weight'] = `${opt.fontWeight}` : null;
        (opt.fontFamily != null) ? this.obj[len].style['font-family'] = `${opt.fontFamily}` : null;
        (opt.style != null) ? (this.obj[len].style = opt.style) : null;

        (opt.quantity != null) ? this.setMultiObj(opt.quantity, this.obj[len]) : null;
        return this;
    }

    get(index) {
        this.getObj = this.obj[index];
        return this;
    }

    setZoom(zoom) {
        this.getObj = this.getObj ?? this.obj[0];
        var svgPoints = [];
        for (var i = 0; i < this.getObj.points.length; i++) {
            svgPoints.push({ x: this.getObj.points[i].x, y: this.getObj.points[i].y });
        }

        var top = parseInt(this.getObj.style['stroke-width']);
        var left = parseInt(this.getObj.style['stroke-width']);

        var xMin = svgPoints.map(p => p.x).sort(function (a, b) { return a - b })[0];
        var yMin = svgPoints.map(p => p.y).sort(function (a, b) { return a - b })[0];

        var points = "";
        for (var i = 0; i < svgPoints.length; i++) {
            var x = (svgPoints[i].x - xMin) * zoom;
            var y = (svgPoints[i].y - yMin) * zoom;
            points += `${(x >= 0) ? x + left : x * -1 + left},${(y >= 0) ? y + top : y * -1 + top} `;
        }

        this.getObj.setAttribute('points', points);
        return this;
    }

    setTop(top) {
        this.getObj = this.getObj ?? this.obj[0];
        var tagName = this.getObj.tagName;

        if (tagName == "polygon" || tagName == "polyline") {
            var points = "";
            for (var i = 0; i < this.getObj.points.length; i++) {
                var x = this.getObj.points[i].x;
                var y = this.getObj.points[i].y + top - parseInt(this.getObj.style['stroke-width']);
                points += `${x},${y} `;
            }

            this.getObj.setAttribute('points', points);
        }
        else if (tagName == "circle" || tagName == "ellipse") {
            // var r = parseInt(this.getObj.getAttribute('r') ?? this.getObj.getAttribute('ry'));
            // var width = parseInt(this.getObj.style['stroke-width']);
            this.getObj.setAttribute('cy', top);
        }
        else if(tagName == "text"){
            this.getObj.setAttribute('y', top);
        }

        return this;
    }

    setLeft(left) {
        this.getObj = this.getObj ?? this.obj[0];
        var tagName = this.getObj.tagName;

        if (tagName == "polygon" || tagName == "polyline") {
            var points = "";
            for (var i = 0; i < this.getObj.points.length; i++) {
                var x = this.getObj.points[i].x + left - parseInt(this.getObj.style['stroke-width']);
                var y = this.getObj.points[i].y;
                points += `${x},${y} `;
            }

            this.getObj.setAttribute('points', points);
        }
        else if (tagName == "circle" || tagName == "ellipse") {
            // var r = parseInt(this.getObj.getAttribute('r') ?? this.getObj.getAttribute('rx'));
            // var width = parseInt(this.getObj.style['stroke-width']);
            this.getObj.setAttribute('cx', left);
        }
        else if(tagName == "text"){
            this.getObj.setAttribute('x', left);
        }

        return this;
    }

    setStyle(style) {
        this.getObj = this.getObj ?? this.obj[0];

        this.getObj.style = style;
        return this;
    }

    setFill(fill) {
        this.getObj = this.getObj ?? this.obj[0];

        this.getObj.style['fill'] = fill;
        return this;
    }

    setStroke(stroke) {
        this.getObj = this.getObj ?? this.obj[0];

        this.getObj.style['stroke'] = stroke;
        return this;
    }

    setStrokeWidth(width) {
        this.getObj = this.getObj ?? this.obj[0];

        this.getObj.style['stroke-width'] = `${width}`;
        return this;
    }

    setMultiObj(quantity, obj) {
        for (var i = 1; i < quantity; i++) {
            this.obj.push(obj.cloneNode(true));
        }
        return this;
    }

    //initialize svgModule to target svg element
    init(quantity) {
        quantity = quantity ?? 0;
        var len = this.obj.length;
        for (var i = 1; i < quantity; i++) {
            for (var j = 0; j < len; j++) {
                this.obj.push(this.obj[j].cloneNode(true));
            }
        }

        for (var i = this.obj.length - 1; i >= 0; i--) {
            this.svgObj.appendChild(this.obj[i]);
        }

        this.divObj.appendChild(this.svgObj);
        return this;
    }
}