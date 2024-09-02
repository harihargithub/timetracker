var ReExtPrev = null;
var ReExtPrevClicked = null;
var prevRid = null;
var command;
var currentrid = null;
var count = 0;

var blueoffset = -3;
var redoffset = -2;
var blueoutline = 4;
var redoutline = 3;

window.addEventListener('message', (event) => {
    var x = event.data.x; var y = event.data.y;
    if (x === undefined && y === undefined) {
        return;
    }
    if (x === -1 && y === -1) {
        if (ReExtPrev !== null) {
            ReExtPrev.style.border = 'unset';
            ReExtPrev.style.outline = 'unset';
            ReExtPrev.style.outlineOffset = 'unset';
            ReExtPrev.style.zIndex = 'unset';
            var div = document.getElementById("MJG");
            if (div) {
                div.parentNode.removeChild(div);
            }
        }
        if (ReExtPrevClicked !== null) {
            ReExtPrevClicked.style.border = 'unset';
            ReExtPrevClicked.style.outline = 'unset';
            ReExtPrevClicked.style.outlineOffset = 'unset';
            ReExtPrevClicked.style.zIndex = 'unset';
            var div = document.getElementById("MJG");
            if (div) {
                div.parentNode.removeChild(div);
            }
        }
        ReExtPrev = null;
        ReExtPrevClicked = null;
        prevRid = null;
        currentrid = null;
        return;
    }

    command = event.data.command
    var p = document.elementFromPoint(x, y);
    while (p !== null) {
        if (p.attributes !== undefined) {
            if (p.attributes['name'] !== undefined) {
                var name = p.attributes['name'].value;
                var rid;
                if (name.includes('ReExtRoot')) {
                    if (p.attributes['data-rid'] !== undefined) {
                        rid = p.attributes['data-rid'].value;
                    }
                    if (command === 'move') {
                        event.stopPropagation();
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        var thisrid = p.attributes['data-rid'];
                        if (thisrid !== currentrid) {
                            if (ReExtPrev !== null) {
                                if (ReExtPrev.style.outline !== `blue solid ${blueoutline}px`) {
                                    ReExtPrev.style.border = 'unset';
                                    ReExtPrev.style.outline = 'unset';
                                    ReExtPrev.style.outlineOffset = 'unset';
                                    ReExtPrev.style.zIndex = 'unset';
                                }
                                // var div = document.getElementById("MJG");
                                // if (div) {div.parentNode.removeChild(div);}
                            }
                            p.style.zIndex = '2000000';
                            p.style.outline = `red solid ${redoutline}px`;
                            //p.style.outlineOffset = redoffset + 'px';
                        }
                        else {
                            if (p.style.outline !== `blue solid ${blueoutline}px`) {
                                p.style.zIndex = 'unset';
                                p.style.outline = 'unset';
                                p.style.outlineOffset = 'unset';
                            }
                            if (ReExtPrev.style.outline !== `blue solid ${blueoutline}px`) {
                                ReExtPrev.style.border = 'unset';
                                ReExtPrev.style.outline = 'unset';
                                ReExtPrev.style.outlineOffset = 'unset';
                                ReExtPrev.style.zIndex = 'unset';
                            }
                        }
                    }

                    if (command === 'click') {
                        event.stopPropagation();
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        var offset = {
                            left: p.offsetLeft,
                            top: p.offsetTop,
                            width: p.offsetWidth,
                            height: p.offsetHeight
                        }
                        window.parent.postMessage({ type: 'ReExtRootClick', payload: { name: name, rid: rid, x: x, y: y, clientHeight: p.clientHeight, offset: offset } }, '*');
                        currentrid = p.attributes['data-rid'];
                        p.style.zIndex = '2000000';
                        p.style.outline = `blue solid ${blueoutline}px`;
                        //p.style.outlineOffset = blueoffset + 'px';
                        if (ReExtPrevClicked !== null) {
                            ReExtPrevClicked.style.zIndex = 'unset';
                            ReExtPrevClicked.style.outline = 'unset';
                            ReExtPrevClicked.style.outlineOffset = 'unset';
                        }
                        ReExtPrevClicked = p;

                        var div = document.getElementById("MJG");
                        if (div) { div.parentNode.removeChild(div); }

                        var marginTop = parseInt(p.clientHeight) + blueoffset;
                        var marginRight = -blueoffset - 2;

                        var newDiv = document.createElement("div");
                        newDiv.id = 'MJG'
                        newDiv.style.display = 'flex';
                        newDiv.style.flexDirection = 'column';
                        newDiv.style.justifyContent = 'space-between';
                        //newDiv.style.alignItems = 'center';
                        newDiv.style.position = 'absolute';
                        newDiv.style.zIndex = '4000000';
                        newDiv.style.right = 0;
                        newDiv.style.bottom = 0;
                        //newDiv.style.marginRight = marginRight + 'px';
                        //newDiv.style.marginTop = marginTop + 'px';
                        newDiv.style.fontSize = '12px';
                        var width = 120;
                        //newDiv.style.width = width + 'px';
                        newDiv.style.height = '10px';
                        newDiv.style.minHeight = '10px';
                        newDiv.style.backgroundColor = 'blue';
                        newDiv.style.border = '1px solid blue';
                        newDiv.style.color = 'white';
                        newDiv.style.padding = '1px';
                        //newDiv.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';

                        var desc = document.createElement("div");
                        desc.style.fontSize = '10px';
                        desc.style.textAlign = 'right';
                        //console.log('nv', p.attributes.name.nodeValue);
                        //console.log('data-rid', p.attributes['data-rid']);
                        desc.innerHTML = p.attributes.name.nodeValue;
                        newDiv.appendChild(desc);

                        // var riddiv = document.createElement("div");
                        // riddiv.style.fontSize = '10px';
                        // riddiv.style.textAlign = 'right';
                        // riddiv.innerHTML = 'rid: ' + p.attributes['data-rid'].value;
                        // newDiv.appendChild(riddiv);

                        p.appendChild(newDiv);

                        var offset = {
                            left: p.offsetLeft,
                            top: p.offsetTop,
                            width: p.offsetWidth,
                            height: p.offsetHeight
                        }
                    }
                    ReExtPrev = p;
                    prevRid = rid;
                }
            }
        }
        p = p.parentNode;
    }
});
