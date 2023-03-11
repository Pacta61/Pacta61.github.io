const b = JXG.JSXGraph.initBoard('jxgbox', { 
    boundingbox: [-1, 10, 10, -1], axis:true
});

function crearGrafica(){
    const b = JXG.JSXGraph.initBoard('jxgbox', { 
        boundingbox: [-1, 10, 10, -1], axis:true
    });
    var p1 = b.create('point',[document.getElementById("x").value,0], {name:'B',size:2,color:'#000036'});
    var p2 = b.create('point',[0,document.getElementById("y").value], {name:'A',size:2,color:'#000036'});
    var li = b.create('line',["B","A"], {straightFirst:false, straightLast:false, strokeWidth:2,strokeColor:'#6942a8'});
}
