//选择器
const canvas = document.getElementById("canvas");
const empty = document.getElementsByClassName("empty")[0];
const tools = document.getElementsByClassName("tools")[0];
const download = document.getElementsByClassName("download")[0];
const eraser = document.getElementsByClassName('eraser')[0]
const pen = document.getElementsByClassName('pen')[0]

//画笔
const color = document.getElementsByClassName('color')[0]
const black = document.getElementsByClassName('black')[0]
const red = document.getElementsByClassName('red')[0]
const orange = document.getElementsByClassName('orange')[0]
const green = document.getElementsByClassName('green')[0]
const blue = document.getElementsByClassName('blue')[0]
const violet = document.getElementsByClassName('violet')[0]

//初始化画布
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let ctx = canvas.getContext("2d");

var eraserEnabled = false;

var lineWidth = 5

let painting = false;
let currentColor = 'black'

class Canvas {

    constructor() {
        this.initCanvas()
        this.initBrush()
        this.bindEvents()
    }

    //屏幕宽度变化时及时调节画布的大小
    initCanvas() {
        canvasSize()

        window.onresize = function () {
            canvasSize()
        }

        function canvasSize() {

            var pageWidth = document.documentElement.clientWidth
            var pageHeight = document.documentElement.clientHeight
            canvas.width = pageWidth
            canvas.height = pageHeight
        }

    }

    //初始化笔刷
    initBrush() {
        let lastPoint = {
            x: undefined,
            y: undefined
        };

        let newPoint = {
            x: undefined,
            y: undefined
        };

        //设备检测
        if (document.body.ontouchstart === undefined) {
            //如果是非触屏设备


            canvas.onmousedown = function (e) {
                painting = true;

                lastPoint.x = e.clientX;
                lastPoint.y = e.clientY;
            };

            canvas.onmousemove = function (e) {
                if (painting) {
                    newPoint.x = e.clientX;
                    newPoint.y = e.clientY;

                    drawCricle(newPoint.x, newPoint.y, lineWidth / 2)
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)

                    lastPoint.x = newPoint.x
                    lastPoint.y = newPoint.y
                }
            };

            canvas.onmouseup = function () {
                painting = false;
            };
        } else {
            //如果是触屏设备
            canvas.ontouchstart = function (e) {
                painting = true

                lastPoint.x = e.touches[0].clientX
                lastPoint.y = e.touches[0].clientY
            }

            canvas.ontouchmove = function (e) {
                if (painting) {
                    newPoint.x = e.touches[0].clientX
                    newPoint.y = e.touches[0].clientY

                    drawCricle(newPoint.x, newPoint.y, lineWidth / 2)
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)

                    lastPoint.x = newPoint.x
                    lastPoint.y = newPoint.y
                }
            }

            canvas.ontouchend = function (e) {
                painting = false

            }
        }

        function drawLine(x1, y1, x2, y2) {
            ctx.beginPath();
            ctx.moveTo(x1, y1)
            ctx.strokeStyle = currentColor
            ctx.fillStyle = currentColor
            if(eraserEnabled){
                ctx.lineWidth =40;
                ctx.strokeStyle = 'white'
                ctx.fillStyle = 'white'
            }else{
                ctx.lineWidth = lineWidth
            }
            ctx.lineTo(x2, y2)
            ctx.stroke();
            ctx.closePath();
        }

        function drawCricle(x, y, radius) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    bindEvents() {
        pen.onclick = function(){
            pen.classList.add('active')
            eraser.classList.remove('active')
            eraserEnabled = false
        }

        //橡皮擦功能
        eraser.onclick = function () {
            eraserEnabled = true
            pen.classList.remove('active')
            eraser.classList.add('active')
        }

        // 清空画面
        empty.onclick = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        };

        //下载画布，这个地方需要我下来好好研究一下
        download.onclick = function () {
            var compositeOperation = ctx.globalCompositeOperation;
            ctx.globalCompositeOperation = "destination-over";
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            var imageData = canvas.toDataURL("image/png");
            ctx.putImageData(
                ctx.getImageData(0, 0, canvas.width, canvas.height),
                0,
                0
            );
            ctx.globalCompositeOperation = compositeOperation;
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.href = imageData;
            a.download = "mypaint";
            a.target = "_blank";
            a.click();
        };

        function removeActive() {
            var spans = color.getElementsByTagName('span')
            for (var i = 0; i < spans.length; i++) {
                spans[i].classList.remove('active')
            }
        }

        black.onclick = function () {
            removeActive()
            black.classList.add('active')
            canvas.classList.remove('eraser-cursor')
            ctx.fillStyle = 'black'
            ctx.strokeStyle = 'black'
            currentColor = 'black'
        }

        red.onclick = function () {
            removeActive()
            red.classList.add('active')
            canvas.classList.remove('eraser-cursor')
            ctx.fillStyle = 'red'
            ctx.strokeStyle = 'red'
            currentColor = 'red'

        }

        orange.onclick = function () {
            removeActive()
            orange.classList.add('active')
            canvas.classList.remove('eraser-cursor')
            ctx.fillStyle = 'orange'
            ctx.strokeStyle = 'orange'
            currentColor = 'orange'
        }

        green.onclick = function () {
            removeActive()
            green.classList.add('active')
            canvas.classList.remove('eraser-cursor')
            ctx.fillStyle = 'green'
            ctx.strokeStyle = 'green'
            currentColor = 'green'
        }

        blue.onclick = function () {
            removeActive()
            blue.classList.add('active')
            canvas.classList.remove('eraser-cursor')
            ctx.fillStyle = 'blue'
            ctx.strokeStyle = 'blue'
            currentColor = 'blue'
        }

        violet.onclick = function () {
            removeActive()
            violet.classList.add('active')
            canvas.classList.remove('eraser-cursor')
            ctx.fillStyle = 'violet'
            ctx.strokeStyle = 'violet'
            currentColor = 'violet'
        }

    }
}


var tabs = new Canvas()