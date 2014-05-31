/**
 * Created by pszemus on 30.05.14.
 */
$(document).ready(function(){
    var ctx;

    var x = 50;
    var y = 50;
    var r = 15;
    var dx = 5;
    var ddx = 1;
    var dy = 0;
    var ddy = 0.2;

    var x_shot
    var y_shot

    IDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();

    jump = false;
    rightDown = false;
    leftDown = false;
    shot = false;
    shot1 = 0;

    ball_color = "blue"

    var floors = [[100,250,HEIGHT-100],[300,450,HEIGHT-200],[500,650,HEIGHT-300],[300,450,HEIGHT-400]
        ,[100,250,HEIGHT-500]];
    var floor = false;

    function init() {
        ctx = $('#canvas')[0].getContext("2d");
        WIDTH = $("#canvas").width();
        HEIGHT = $("#canvas").height();
        return setInterval(draw, 10);
    }

    function circle(x,y,r,color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }

    function do_shot(){
        if (shot && shot1) {
            circle(x,y,r/2,"green");
            shot = false;
            x_shot = x;
            y_shot = y;
        }
        if (shot1){
            circle(x_shot,y_shot,r/2,"green")
            x_shot += 4
        }
    }

    function map() {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.lineCap="round";

        ctx.moveTo(0,0);
        ctx.lineTo(0,HEIGHT);

        ctx.moveTo(0,0);
        ctx.lineTo(WIDTH,0);

        ctx.moveTo(WIDTH,0);
        ctx.lineTo(WIDTH,HEIGHT);

        ctx.moveTo(0,HEIGHT);
        ctx.lineTo(WIDTH,HEIGHT);
        //lines
        ctx.moveTo(100,HEIGHT-100);
        ctx.lineTo(250,HEIGHT-100);
        ctx.moveTo(300,HEIGHT-200);
        ctx.lineTo(450,HEIGHT-200);
        ctx.moveTo(500,HEIGHT-300);
        ctx.lineTo(650,HEIGHT-300);
        ctx.moveTo(300,HEIGHT-400);
        ctx.lineTo(450,HEIGHT-400);
        ctx.moveTo(100,HEIGHT-500);
        ctx.lineTo(250,HEIGHT-500);

        ctx.stroke();
        ctx.closePath();
        ctx.fill();
    }

    function onKeyDown(evt) {
        if (evt.keyCode == 39) rightDown = true;
        else if (evt.keyCode == 37) leftDown = true;
        if (evt.keyCode == 38) jump = true;
        if (evt.keyCode == 32) shot = true;
        if (evt.keyCode == 32) shot1 += 1;
    }

    //and unset them when the right or left key is released
    function onKeyUp(evt) {
        if (evt.keyCode == 39) rightDown = false;
        else if (evt.keyCode == 37) leftDown = false;
        if (evt.keyCode == 38) jump = false;
        if (evt.keyCode == 32) shot = true;
    }

    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    function draw() {

        ctx.clearRect(0,0,WIDTH,HEIGHT);
        circle(x,y,r,ball_color);
        map();
        //grawitacja
        floor = false;
        for (i=0;i<floors.length;i++) {
            if (x>floors[i][0] && x<floors[i][1] && y+r>=floors[i][2] && y<=floors[i][2]) floor = true;
        }

        if (y+r >= HEIGHT || floor) {
            dy = 0;
        }
        else{
            dy += ddy;
        }
        //ruch
        if (rightDown && x<WIDTH) x += 5;
        else if (leftDown && x>0) x -= 5;
        if (jump && dy == 0) {
            y -= 150;
            jump = false;
        }
        do_shot()

        y += dy;
    }

    init();
});
