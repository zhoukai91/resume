/**
 * Created by Administrator on 2017/1/12.
 */
$(function () {
  var $sectionBody = $('#sw');
  var $bars = $('.section-3 .level .progress-bar');
  $sectionBody.sectionWrapper({
    "showSerial": false
  }).on("afterWheel",function(event,ops){
    console.log(ops.after);
      var widths = [30,50,89,12];
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


});

