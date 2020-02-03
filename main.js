//改变鼠标样式，后期须针对不同的状态进行优化
document.body.style.cursor = "crosshair";

const canvas = document.getElementById("canvas");
const empty = document.getElementsByClassName("empty")[0];
const tools = document.getElementsByClassName("tools")[0];
const download = document.getElementsByClassName("download")[0];

const red = document.getElementsByClassName('red')[0]
const green = document.getElementsByClassName('green')[0]
const black = document.getElementsByClassName('black')[0]
const blue = document.getElementsByClassName('blue')[0]


canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let ctx = canvas.getContext("2d");

startPainting();

function startPainting() {
  let painting = false;
  let lastPoint = {
    x: undefined,
    y: undefined
  };

  let newPoint = {
    x: undefined,
    y: undefined
  };

  canvas.onmousedown = function(e) {
    painting = true;

    lastPoint.x = e.clientX;
    lastPoint.y = e.clientY;
  };

  canvas.onmousemove = function(e) {
    if (painting) {
      newPoint.x = e.clientX;
      newPoint.y = e.clientY;

      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(newPoint.x, newPoint.y);
      ctx.closePath();
      ctx.stroke();

      if (lastPoint.x) {
        lastPoint.x = newPoint.x;
        lastPoint.y = newPoint.y;
      }
    }
  };

  canvas.onmouseup = function() {
    painting = false;
  };
}

// 清空画面
empty.onclick = function() {
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
};

tools.onmouseover = function() {
  document.body.style.cursor = "default";
};

tools.onmouseout = function() {
  document.body.style.cursor = "crosshair";
};

//下载画布
download.onclick = function() {
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

red.onclick = function(){
    ctx.strokeStyle = 'red'
}

green.onclick = function(){
    ctx.strokeStyle = 'green'
}

black.onclick = function(){
    ctx.strokeStyle = 'black'
}

blue.onclick = function(){
    ctx.strokeStyle = 'blue'

}
