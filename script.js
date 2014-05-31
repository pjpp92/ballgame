/**
 * Created by pszemus on 30.05.14.
 */
$(document).ready(function(){
    var ctx;

    var ball = {};
        ball.x = 50;
        ball.y = 50;
        ball.r = 15;
        ball.dy = 0;
        ball.ddy = 0.2;
        ball.color = "blue";

    var shot = {};
        shot.x = [];
        shot.y = [];
        shot.r = 7;
        shot.time = 200;

    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();

    var meteor = {};
         meteor.x = Math.random() * WIDTH;
         meteor.y = 0;
         meteor.r = (Math.random() * 75) + 25;

    jump = false;
    rightDown = false;
    leftDown = false;
    shot_condition = false;
    shot_condition1 = false;



    var floors = [[100,250,HEIGHT-100],[300,450,HEIGHT-200],[500,650,HEIGHT-300],[300,450,HEIGHT-400]
        ,[100,250,HEIGHT-500]];
    var floor = false;

    function init() {
        ctx = $('#canvas')[0].getContext("2d");
        WIDTH = $("#canvas").width();
        HEIGHT = $("#canvas").height();
        setInterval(draw, 10);

    }

    function circle(x,y,r,color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }

    function do_shot(){
        if (shot_condition && shot_condition1 && shot.time == 0) {
            circle(ball.x,ball.y,shot.r,"green");
            shot_condition = false;
            shot.x.push(ball.x);
            shot.y.push(ball.y);
            shot.time = 200;
        }
        if (shot_condition1){
            for (i=0;i<shot.x.length;i++) {
                circle(shot.x[i],shot.y[i],shot.r,"green");
                shot.x[i] += 4;
                shot_condition = false;
            }
        }
    }

    function do_meteor() {
        circle(meteor.x, meteor.y, meteor.r, "red");
        meteor.y += 10;
        if (meteor.y>=HEIGHT + meteor.r) {
            meteor.x = (Math.random() * WIDTH);
            meteor.y = 0-meteor.r;
            meteor.r = (Math.random() * 75) + 25;
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
        for (i=0; i<floors.length; i++){
            ctx.moveTo(floors[i][0],floors[i][2]);
            ctx.lineTo(floors[i][1],floors[i][2]);
        }

        ctx.stroke();
        ctx.closePath();
        ctx.fill();
    }

    function onKeyDown(evt) {
        if (evt.keyCode == 39) rightDown = true;
        else if (evt.keyCode == 37) leftDown = true;
        if (evt.keyCode == 38) jump = true;
        if (evt.keyCode == 32) shot_condition = true;
        if (evt.keyCode == 32) shot_condition1 = true;
    }

    //and unset them when the right or left key is released
    function onKeyUp(evt) {
        if (evt.keyCode == 39) rightDown = false;
        else if (evt.keyCode == 37) leftDown = false;
        if (evt.keyCode == 38) jump = false;
        if (evt.keyCode == 32) shot_condition = false;
    }

    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    function draw() {

        ctx.clearRect(0,0,WIDTH,HEIGHT);
        circle(ball.x,ball.y,ball.r,ball.color);
        map();
        //grawitacja
        floor = false;
        for (i=0;i<floors.length;i++) {
            if (ball.x>floors[i][0] && ball.x<floors[i][1] && ball.y+ball.r>=floors[i][2] &&
                ball.y<=floors[i][2]) floor = true;
        }

        if (ball.y+ball.r >= HEIGHT || floor) {
            ball.dy = 0;
        }
        else{
            ball.dy += ball.ddy;
        }
        //ruch
        if (rightDown && ball.x<WIDTH) ball.x += 5;
        else if (leftDown && ball.x>0) ball.x -= 5;
        if (jump && ball.dy == 0) {
            ball.dy -= 8;
            jump = false;
        }
        do_shot();
        ball.y += ball.dy;
        do_meteor()
        if (shot.time > 0) shot.time -= 2;
    }

    init();
});
