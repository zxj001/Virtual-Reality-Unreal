var cycle = 1;
var cycleDir = false;
var isReady = false;
var strokeColor = "#36465d";

$(document).ready(function(){
    var html = document.getElementsByTagName("HTML")[0];
    html.style.overflowY = "hidden";
    var canvas = document.getElementById('myCanvas'),
        context = canvas.getContext('2d');

        // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
            /**
             * Your drawings need to be inside this function otherwise they will be reset when 
             * you resize the browser window and the canvas goes will be cleared.
             */
            drawStuff(); 
    }
    resizeCanvas();
    drawStuff();
    isReady = true;
    
    function removeContent () {
        $("#content").empty();
    }
    
    $(".loadContent").click(function () {
        removeContent();
        var content = "";
        $.ajax({
            url: "project2.html",
            dataType: "html",
            success: function (data) {
                content = data;
                $( "#content" ).append(content);
                console.log("content: " + content);
            }
        });
    });
});

$("body").mousemove(function() {
    if (isReady) {
        myMoveFunction ();
    }
});



function myMoveFunction () {
    var canvas = document.getElementById('myCanvas'),
        context = canvas.getContext('2d');
    cycle++;
    if (cycle == 768) {
        cycle = 1;
        cycleDir = !cycleDir;
    }
    var red = cycle % 256;
    var green = (cycle - 256) % 256;
    var blue = (cycle - 512) % 256;

    if (green < 0)
        green = 0;
    if (blue < 0)
        blue = 0;
    
    if (cycleDir) {
        var temp = red;
        red = blue;
        blue = temp;
    }
    strokeColor = "#"+(red).toString(16)+(green).toString(16)+(blue).toString(16);
    drawStuff();
    //console.log(strokeColor);
}

function drawStuff() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var projectsHeight = [];
    var projectsWidth = [];
    var projects = [];
    var squaresToDraw = 200;
    var squareSize = 4;

    //console.log(windowHeight);
    //console.log(windowWidth);
    ctx.strokeStyle = "#ffffff";
    var gray;
    for (i = 0; i < squaresToDraw; i++) {
        for (j = 0; j < squaresToDraw; j++) {
            //gray = Math.floor(Math.random() * 50 * j); // Stripes
            gray = Math.floor(Math.random() * 255); // Dots
            //gray = Math.floor(Math.random() * j * i); // Curve
            strokeColor = "#"+(gray).toString(16)+(gray).toString(16)+(gray).toString(16);
            ctx.fillStyle = strokeColor;
            //console.log(strokeColor);
            ctx.fillRect(j*squareSize,i*squareSize,squareSize,squareSize);
        }
    }
}