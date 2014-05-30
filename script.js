/**
 * Created by pszemus on 30.05.14.
 */
$(document).ready(function(){
    var ctx;

    var x = 50
    var y = 50
    var dx = 5
    var ddx = 1
    var dy = 5
    var ddy = 1

    var WIDTH;
    var HEIGHT;

    jump = false
    rightDown = false;
    leftDown = false

    function init() {
        ctx = $('#canvas')[0].getContext("2d");
        WIDTH = $("#canvas").width();
        HEIGHT = $("#canvas").height();
        return setInterval(draw, 10);
    }

    function circle(x,y,r) {
        ctx.beginPath();
        ctx.fillStyle = "red"
        ctx.arc(x, y, r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }

    function map() {
        ctx.beginPath();
        ctx.fillStyle = "black"
        ctx.lineCap="round";

        ctx.moveTo(0,0);
        ctx.lineTo(0,HEIGHT);

        ctx.moveTo(0,0);
        ctx.lineTo(WIDTH,0);

        ctx.moveTo(WIDTH,0);
        ctx.lineTo(WIDTH,HEIGHT);

        ctx.moveTo(0,HEIGHT);
        ctx.lineTo(WIDTH,HEIGHT);

        ctx.stroke();
        ctx.closePath();
        ctx.fill();
    }

    function onKeyDown(evt) {
        if (evt.keyCode == 39) rightDown = true;
        else if (evt.keyCode == 37) leftDown = true;
        else if (evt.keyCode == 38) jump = true;
    }

    //and unset them when the right or left key is released
    function onKeyUp(evt) {
        if (evt.keyCode == 39) rightDown = false;
        else if (evt.keyCode == 37) leftDown = false;
        else if (evt.keyCode == 38) jump = false;
    }

    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    function draw() {

        ctx.clearRect(0,0,WIDTH,HEIGHT);
        circle(x,y,10)
        map()
        if (y+10 < HEIGHT) {
            y += dy
        }

        if (rightDown && x<WIDTH) x += 5;
        else if (leftDown && x>0) x -= 5;
        if (jump && y+10 == HEIGHT) y -= 100;
    };

    init();
});
