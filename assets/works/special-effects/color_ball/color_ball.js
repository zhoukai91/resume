function getNow() {
  return (new Date()).getTime();
}

function rnd(min, max) {
  return parseInt((Math.random() * 999999) % (max - min + 1)) + min;
}

window.onload = function () {
  //控制
  var oAutoPlay = document.getElementById('auto_play');
  var iAutoPlayTimer = 0;
  var bManual = true;

  var SPEED_CNG_RATE = 4;
  var SPEED_MAX = 20;
  var headerWidth = 50;  //导航条的高度

  oAutoPlay.onclick = function () {
    if (this.value == '自动移动') {
      //手动移动下进入，切换为自动移动
      var x = rnd(0, document.documentElement.clientWidth);
      var y = rnd(0, document.documentElement.clientHeight);
      var xSpeed = rnd(-SPEED_MAX, SPEED_MAX);
      var ySpeed = rnd(-SPEED_MAX, SPEED_MAX);

      iAutoPlayTimer = setInterval(function () {
        onMove(x, y);  //在 x,y坐标处显示圆圈
        x += xSpeed;
        y += ySpeed;

        //防止圆圈 超出屏幕边界
        if (x <= SIZE / 2)xSpeed = rnd(0, SPEED_MAX);
        if (x >= document.documentElement.clientWidth - SIZE / 2)xSpeed = -rnd(0, SPEED_MAX);

        if (y <= (SIZE / 2) + headerWidth)ySpeed = rnd(0, SPEED_MAX);
        if (y >= document.documentElement.clientHeight - SIZE / 2)ySpeed = -rnd(0, SPEED_MAX);

        //改变圆圈之间的距离
        if (xSpeed < -SPEED_MAX) {
          xSpeed += rnd(0, SPEED_CNG_RATE);
        }
        else if (xSpeed > SPEED_MAX) {
          xSpeed += rnd(-SPEED_CNG_RATE, 0);
        }
        else {
          xSpeed += rnd(-SPEED_CNG_RATE, SPEED_CNG_RATE);
        }

        if (ySpeed < -SPEED_MAX) {
          ySpeed += rnd(0, SPEED_CNG_RATE);
        }
        else if (ySpeed > SPEED_MAX) {
          ySpeed += rnd(-SPEED_CNG_RATE, 0);
        }
        else {
          ySpeed += rnd(-SPEED_CNG_RATE, SPEED_CNG_RATE);
        }
      }, 30);

      stop();

      this.value = '手动移动';
      bManual = false;
    }
    else { //自动移动下进入，切换为手动移动
      restart();  // 进入  手动移动模式
      clearInterval(iAutoPlayTimer);
      this.value = '自动移动';
      bManual = true;
    }
  };


  var bCanUse = false;

  //核心
  var aSharps = [];
  var aImgs = [];
  var aSrc = ['qun_1.png', 'qun_3.png', 'qun_5.png', 'qun_4.png', 'qun_2.png'];
  var count = 0;
  var samp = 0;  //手动模式下，事件进入次数
  var continue_count = 0;
  var i = 0;

  var path = "./special-effects/color_ball/";
  var lastIType = -1;  //上一次图片显示的类型

  var SAMP_RATE = 3;  // 手动模式下，圆圈创建速率调用速率
  var SPEED_RATE = 20;
  var SIZE = 100;   //图片的宽度
  var CONTINUE_LEN = 5;


  //图片处理
  for (i = 0; i < aSrc.length; i++) {
    aImgs[i] = new Image();
    aImgs[i].onload = function () {   //图片加载函数
      count++;

      if (count == aSrc.length) {
        document.getElementById('bg').style.display = 'none';
        document.getElementById('loading').style.display = 'none';
        start();  //
      }
    };
    aImgs[i].src = path + aSrc[i];
  }

  var ctrl_pad = document.getElementById('ctrl_pad');
  var hide_pad = document.getElementById('hide_pad');
  var show_pad = document.getElementById('show_pad');
  hide_pad.onclick = function () {
    ctrl_pad.style.display = 'none';
    show_pad.style.display = 'block';
  }
  show_pad.onclick = function () {
    ctrl_pad.style.display = 'block';
    show_pad.style.display = 'none';
  }


  function onMove(x, y) {
    if (continue_count++ % CONTINUE_LEN) {
      var iType = lastIType;
    }
    else {
      /*do
       {
       var iType=rnd(0, aImgs.length-1);
       }while(lastIType==iType);*/
      iType = (lastIType + 1) % aSrc.length;

      lastIType = iType;
    }

    createImg(iType, x, y, 1000);
  }

  function createImg(index, l, t) {
    var oImg = document.createElement('img');
    oImg.src = aImgs[index].src;

    oImg.style.left = l + 'px';
    oImg.style.top = t + 'px';
    oImg.height = aImgs[index].height;
    oImg.width = aImgs[index].width;
    oImg.style.marginLeft = -oImg.width / 2 + 'px';
    oImg.style.marginTop = -oImg.height / 2 + 'px';

    document.body.appendChild(oImg);
    //保存屏幕上  已经显示的圆圈图片对象
    aSharps.push({
      obj: oImg,
      endTime: getNow(),
      speedX: aImgs[index].width / SPEED_RATE,
      speedY: aImgs[index].height / SPEED_RATE
    });
  }

  function stop() {
    document.onmousedown = null;
  }

  function restart() {
    document.onmousedown = fnHandlerMouseMove;
  }

  setTimeout(function () {  //如果用户没有操作，调用oAutoPlay单击事件函数，触发圆圈的自动移动
    if (!bCanUse) {
      oAutoPlay.onclick();
    }
  }, 3000);

  function fnHandlerMouseMove() {
    bCanUse = true;
    document.onmousemove = function (ev) {
      var oEvent = ev || event;

      if (!(samp++ % SAMP_RATE)) {  //设置手动模式下  调用onMove()的频率  增加圆圈之间的距离
        onMove(oEvent.clientX, oEvent.clientY);
      }
      return false;
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
    return false;
  };

  function start() {
    document.onmousedown = fnHandlerMouseMove;

    var lastTime = 0;
    var lastMove = 0;

    var backgroundTime = setInterval(function () {
      //if(document.getElementById('#ctrl_pad')){
      //  //当找不到控制面板DIV 说明切换了页面
      //  clearInterval(iAutoPlayTimer);
      //  setTimeout(function(){
      //    clearInterval(backgroundTime);
      //  },1000)
      //}
      var iNow = getNow();  //

      var aNewSharps = [];

      if (iNow - lastMove > 30) {
        for (i = 0; i < aSharps.length; i++) {
          //是圆圈的宽，高 逐渐减小  每次减少5减小速度为speedX = 5 px  使圆圈减小
          aSharps[i].obj.width = Math.max(aSharps[i].obj.offsetWidth - aSharps[i].speedX, 0);
          aSharps[i].obj.height = Math.max(aSharps[i].obj.offsetHeight - aSharps[i].speedY, 0);

          if (bManual)  //如果是手动移动  产生冒泡效果
            aSharps[i].obj.style.top = parseInt(aSharps[i].obj.style.top) - 5 + 'px';


          if (aSharps[i].obj.width == 0 || aSharps[i].obj.height == 0) {
            document.body.removeChild(aSharps[i].obj);
          }
          else {
            aNewSharps.push(aSharps[i]);
          }
        }

        aSharps = aNewSharps;
        lastMove = iNow;
      }

      lastTime = iNow;
    }, 1);
  }

};