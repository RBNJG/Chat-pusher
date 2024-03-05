<script>
export default {
    props: ["newCanvas"],
    updated() {
        this.$nextTick(() => {
            this.prevX = this.newCanvas.pX;
            this.currX = this.newCanvas.cX;
            this.prevY = this.newCanvas.pY;
            this.currY = this.newCanvas.cY;
            this.x = this.newCanvas.x;
            this.y = this.newCanvas.y;
            this.dibuja = this.newCanvas.d;

            console.log("A dibujar!!");

            if(this.dibuja){
                this.prevX = this.currX;
                this.prevY = this.currY;
                this.currX = this.canvas.clientX - this.canvas.offsetLeft;
                this.currY = this.canvas.clientY - this.canvas.offsetTop;

                this.draw();
            }else{
                this.draw();
            }
        })
    },
    data() {
        return {
            dibuja: false,
            canvas: null,
            ctx: null,
            flag: false,
            prevX: 0,
            currX: 0,
            prevY: 0,
            currY: 0,
            dot_flag: false,
            x: "black", //color
            y: 10,      //ancho 
            w: 0,
            h: 0,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        sendCanvas(params) {
            this.$emit("canvasupdate", {
                user: this.user,

                canvas: params, //Pasamos el canvas en Base64 para generar después la imagen
            });

            console.log("canvas sent");
        },
        getParams() {
            console.log("Dentro de getParams");

            let params = {
                pX: this.prevX,
                cX: this.currX,
                pY: this.prevY,
                cY: this.currY,
                x: this.x,
                y: this.y,
                d: this.dibuja
            }

            this.sendCanvas(params)
        },
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
            if (this.x == "white") this.y = 14; //Borrador
            else this.y = 2;
        },
        draw() {
            this.ctx.beginPath();
            this.ctx.moveTo(this.prevX, this.prevY);
            this.ctx.lineTo(this.currX, this.currY);
            this.ctx.arc(this.currX, this.currY, this.y / 20, 0, Math.PI * 2, true);
            this.ctx.strokeStyle = this.x;
            this.ctx.lineWidth = this.y;
            // this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();
        },
        erase() {
            var m = confirm("Want to clear");
            if (m) {
                this.ctx.clearRect(0, 0, this.w, this.h);
                document.getElementById("canvasimg").style.display = "none";
            }
            console.log(this.newCanvas);
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
                    //this.ctx.fillRect(this.currX, this.currY, this.y, this.y); 
                    this.ctx.arc(this.currX, this.currY, this.y / 2, 0, Math.PI * 2, true);
                    this.ctx.fill();
                    this.ctx.closePath();
                    this.dot_flag = false;
                    this.dibuja = true;
                }

                console.log("Entrando a getParams");

                this.getParams();
            }
            if (res == 'up' || res == "out") {
                this.flag = false;
            }
            if (res == 'move') {
                if (this.flag) {
                    this.dibuja = false;
                    this.prevX = this.currX;
                    this.prevY = this.currY;
                    this.currX = e.clientX - this.canvas.offsetLeft;
                    this.currY = e.clientY - this.canvas.offsetTop;
                    this.draw();

                    console.log("Entrando a getParams en move");

                    this.getParams();
                }
            }
        }

    }
}

</script>
<template>
    <!-- //Display an input field and a send button. -->

    <body>
        <div class="input-group">

            <canvas @keyup.enter="sendCanvas" id="can" width="700" height="590"
                style="position:absolute;top:10%;left:10%;border:2px solid;"></canvas>
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
<style scoped></style>