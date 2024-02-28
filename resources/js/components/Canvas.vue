<script>
export default {
    data() {
        return {
            canvas: null,
            ctx: null,
            flag: false,
            prevX: 0,
            currX: 0,
            prevY: 0,
            currY: 0,
            dot_flag: false,
            x: "black",
            y: 2,
            w: 0,
            h: 0,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.canvas = document.getElementById('can');
            this.ctx = this.canvas.getContext("2d");
            this.w = this.canvas.width;
            this.h = this.canvas.height;

            this.canvas.addEventListener("mousemove", (e) => this.findxy('move', e));
            this.canvas.addEventListener("mousedown", (e) => this.findxy('down', e));
            this.canvas.addEventListener("mouseup", (e) => this.findxy('up', e));
            this.canvas.addEventListener("mouseout", (e) => this.findxy('out', e));
        },
        color(obj) {
            switch (obj.id) {
                case "green":
                    this.x = "green";
                    break;
                case "blue":
                    this.x = "blue";
                    break;
                case "red":
                    this.x = "red";
                    break;
                case "yellow":
                    this.x = "yellow";
                    break;
                case "orange":
                    this.x = "orange";
                    break;
                case "black":
                    this.x = "black";
                    break;
                case "white":
                    this.x = "white";
                    break;
            }
            if (this.x == "white") this.y = 14;
            else this.y = 2;
        },
        draw() {
            this.ctx.beginPath();
            this.ctx.moveTo(this.prevX, this.prevY);
            this.ctx.lineTo(this.currX, this.currY);
            this.ctx.strokeStyle = this.x;
            this.ctx.lineWidth = this.y;
            this.ctx.stroke();
            this.ctx.closePath();
        },
        erase() {
            var m = confirm("Want to clear");
            if (m) {
                this.ctx.clearRect(0, 0, this.w, this.h);
                document.getElementById("canvasimg").style.display = "none";
            }
        },
        save() {
            document.getElementById("canvasimg").style.border = "2px solid";
            var dataURL = this.canvas.toDataURL();
            document.getElementById("canvasimg").src = dataURL;
            document.getElementById("canvasimg").style.display = "inline";
        },
        findxy(res, e) {
            if (res == 'down') {
                this.prevX = this.currX;
                this.prevY = this.currY;
                this.currX = e.clientX - this.canvas.offsetLeft;
                this.currY = e.clientY - this.canvas.offsetTop;

                this.flag = true;
                this.dot_flag = true;
                if (this.dot_flag) {
                    this.ctx.beginPath();
                    this.ctx.fillStyle = this.x;
                    this.ctx.fillRect(this.currX, this.currY, 2, 2);
                    this.ctx.closePath();
                    this.dot_flag = false;
                }
            }
            if (res == 'up' || res == "out") {
                this.flag = false;
            }
            if (res == 'move') {
                if (this.flag) {
                    this.prevX = this.currX;
                    this.prevY = this.currY;
                    this.currX = e.clientX - this.canvas.offsetLeft;
                    this.currY = e.clientY - this.canvas.offsetTop;
                    this.draw();
                }
            }
        }

    }
}

// import { ref, onMounted } from 'vue'

// var canvas, ctx, flag = false,
//     prevX = 0,
//     currX = 0,
//     prevY = 0,
//     currY = 0,
//     dot_flag = false;

// var x = "black",
//     y = 2;

// function init() {
//     canvas = document.getElementById('can');
//     ctx = canvas.getContext("2d");
//     w = canvas.width;
//     h = canvas.height;

//     canvas.addEventListener("mousemove", function (e) {
//         findxy('move', e)
//     }, false);
//     canvas.addEventListener("mousedown", function (e) {
//         findxy('down', e)
//     }, false);
//     canvas.addEventListener("mouseup", function (e) {
//         findxy('up', e)
//     }, false);
//     canvas.addEventListener("mouseout", function (e) {
//         findxy('out', e)
//     }, false);
// }

// function color(obj) {
//     switch (obj.id) {
//         case "green":
//             x = "green";
//             break;
//         case "blue":
//             x = "blue";
//             break;
//         case "red":
//             x = "red";
//             break;
//         case "yellow":
//             x = "yellow";
//             break;
//         case "orange":
//             x = "orange";
//             break;
//         case "black":
//             x = "black";
//             break;
//         case "white":
//             x = "white";
//             break;
//     }
//     if (x == "white") y = 14;
//     else y = 2;

// }

// function draw() {
//     ctx.beginPath();
//     ctx.moveTo(prevX, prevY);
//     ctx.lineTo(currX, currY);
//     ctx.strokeStyle = x;
//     ctx.lineWidth = y;
//     ctx.stroke();
//     ctx.closePath();
// }

// function erase() {
//     var m = confirm("Want to clear");
//     if (m) {
//         ctx.clearRect(0, 0, w, h);
//         document.getElementById("canvasimg").style.display = "none";
//     }
// }

// function save() {
//     document.getElementById("canvasimg").style.border = "2px solid";
//     var dataURL = canvas.toDataURL();
//     document.getElementById("canvasimg").src = dataURL;
//     document.getElementById("canvasimg").style.display = "inline";
// }

// function findxy(res, e) {
//     if (res == 'down') {
//         prevX = currX;
//         prevY = currY;
//         currX = e.clientX - canvas.offsetLeft;
//         currY = e.clientY - canvas.offsetTop;

//         flag = true;
//         dot_flag = true;
//         if (dot_flag) {
//             ctx.beginPath();
//             ctx.fillStyle = x;
//             ctx.fillRect(currX, currY, 2, 2);
//             ctx.closePath();
//             dot_flag = false;
//         }
//     }
//     if (res == 'up' || res == "out") {
//         flag = false;
//     }
//     if (res == 'move') {
//         if (flag) {
//             prevX = currX;
//             prevY = currY;
//             currX = e.clientX - canvas.offsetLeft;
//             currY = e.clientY - canvas.offsetTop;
//             draw();
//         }
//     }
// }

// onMounted(() => {
//     console.log('Canvas in chaval')
// })
</script>
<template>
    <!-- //Display an input field and a send button. -->

    <body>
        <div class="input-group">

            <canvas id="can" width="700" height="590" style="position:absolute;top:10%;left:10%;border:2px solid;"></canvas>
            <div style="position:absolute;top:12%;left:43%;">Choose Color</div>
            <div style="position:absolute;top:15%;left:45%;width:10px;height:10px;background:green;" id="green"
                @click="color(this)"></div>
            <div style="position:absolute;top:15%;left:46%;width:10px;height:10px;background:blue;" id="blue"
                @click="color(this)"></div>
            <div style="position:absolute;top:15%;left:47%;width:10px;height:10px;background:red;" id="red"
                @click="color(this)"></div>
            <div style="position:absolute;top:17%;left:45%;width:10px;height:10px;background:yellow;" id="yellow"
                @click="color(this)"></div>
            <div style="position:absolute;top:17%;left:46%;width:10px;height:10px;background:orange;" id="orange"
                @click="color(this)"></div>
            <div style="position:absolute;top:17%;left:47%;width:10px;height:10px;background:black;" id="black"
                @click="color(this)"></div>
            <div style="position:absolute;top:20%;left:43%;">Eraser</div>
            <div style="position:absolute;top:22%;left:45%;width:15px;height:15px;background:white;border:2px solid;"
                id="white" @click="color(this)"></div>
            <img id="canvasimg" style="position:absolute;top:10%;left:52%;display:none;">
            <input type="button" value="save" id="btn" size="30" @click="save()"
                style="position:absolute;top:55%;left:10%;">
            <input type="button" value="clear" id="clr" size="23" @click="erase()"
                style="position:absolute;top:55%;left:15%;">

        </div>
    </body>
</template>
<style scoped>



</style>