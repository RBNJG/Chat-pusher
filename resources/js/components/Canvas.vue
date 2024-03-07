<script>
export default {
    props: ["newCanvas"],
    updated() {
        this.$nextTick(() => {
            // this.prevX = this.newCanvas.pX;
            // this.currX = this.newCanvas.cX;
            // this.prevY = this.newCanvas.pY;
            // this.currY = this.newCanvas.cY;
            // this.x = this.newCanvas.x;
            // this.y = this.newCanvas.y;
            // this.dibuja = this.newCanvas.d;

            // console.log("A dibujar!!");

            // if (this.dibuja) {
            //     this.prevX = this.currX;
            //     this.prevY = this.currY;
            //     this.currX = this.canvas.clientX - this.canvas.offsetLeft;
            //     this.currY = this.canvas.clientY - this.canvas.offsetTop;

            //     this.draw();
            // } else {
            //     this.draw();
            // }
        })
    },
    data() {
        return {
            isDrawing: false,
            canvas: null,
            ctx: null,
            flag: false,
            // prevX: 0,
            // currX: 0,
            // prevY: 0,
            // currY: 0,
            x: 0,
            y: 0,
            offsetX: null,
            offsetY: null,
            // x: "black", //color
            // y: 10,      //ancho 
            // w: 0,
            // h: 0,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        sendCanvas(params) {
            this.$emit("canvasupdate", {
                user: this.user,

                canvas: params,
            });

            console.log("canvas sent");
        },
        // getParams() {
        //     console.log("Dentro de getParams");

        //     let params = {
        //         pX: this.prevX,
        //         cX: this.currX,
        //         pY: this.prevY,
        //         cY: this.currY,
        //         x: this.x,
        //         y: this.y,
        //         d: this.dibuja
        //     }

        //     this.sendCanvas(params)
        // },
        init() {
            this.canvas = document.getElementById('can');
            this.ctx = this.canvas.getContext("2d");

            this.canvas.addEventListener('mousedown', (e) => {
                this.x = e.offsetX;
                this.y = e.offsetY;
                this.isDrawing = true;
            });

            this.canvas.addEventListener('mousemove', (e) => {
                if (this.isDrawing) {
                    this.drawLine(this.ctx, this.x, this.y, e.offsetX, e.offsetY);
                    this.x = e.offsetX;
                    this.y = e.offsetY;
                }
            });

            this.canvas.addEventListener('mouseup', (e) => {
                if (this.isDrawing) {
                    this.drawLine(this.ctx, this.x, this.y, e.offsetX, e.offsetY);
                    this.x = 0;
                    this.y = 0;
                    this.isDrawing = false;
                }
            });
        },
        drawLine(ctx, x1, y1, x2, y2) {
            ctx.beginPath();
            ctx.strokeStyle = document.getElementById('selColor').value;
            ctx.lineWidth = document.getElementById('selWidth').value;
            ctx.lineJoin = "round";
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
        },
        clearArea() {
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
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
            <button onclick="javascript:clearArea();return false;">Clear Area</button>
            Line width : <select id="selWidth">
                <option value="11">11</option>
                <option value="13" selected="selected">13</option>
                <option value="15">15</option>
            </select>
            Color : <select id="selColor">
                <option value="black">black</option>
                <option value="blue" selected="selected">blue</option>
                <option value="red">red</option>
                <option value="green">green</option>
                <option value="yellow">yellow</option>
                <option value="gray">gray</option>
            </select>

        </div>
    </body>
</template>
<style scoped></style>