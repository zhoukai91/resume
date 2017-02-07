/**
 * Created by Administrator on 2017/1/12.
 */
$(function () {
  var $sectionBody = $('#sw');
  var $bars = $('.section-3 .level .progress-bar');
  $sectionBody.sectionWrapper({
    "showSerial": false
  }).on("afterWheel",function(event,ops){
    var widths = [30,50,89,12]; //用于保存技能条的长度
    if(ops.after==2){
       for(var i=0;i<$bars.length;i++){
         //$bars[i]是DOM对象
         setTimeout(function(){
           $($bars[i]).css({
             width : widths[i]+'%'
           });
           i++;
         },500*i);
       }
       i = 0;
    }else{
      for(var i=0;i<$bars.length;i++){
        //$bars[i]是DOM对象
        $($bars[i]).css({
          width : '0%'
        })
      }
    }
  });
  //页签切换JS代码
  $('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show')
  });
  // 滑入触发CSS动画
  $('.project-merchandise')
    .on('mouseover',function(){
      $(this).find('.mask-layout').addClass('touch');
    })
    .on('mouseout',function(){
      $(this).find('.mask-layout').removeClass('touch');
    })
});

