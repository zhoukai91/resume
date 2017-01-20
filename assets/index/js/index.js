/**
 * Created by Administrator on 2017/1/12.
 */
$(function () {
  var $sectionBody = $('#sw');
  $sectionBody.sectionWrapper({
    "showSerial": false
  });
  //页签切换JS代码
  $('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show')
  });
/*  var option = {};
  $('#myModal').modal(options);*/
});

