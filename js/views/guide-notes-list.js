(function($) {

  Common.ajax("getGuideNotes", null, function(data) {
    Common.renderer("guideNotesListTemp", data, "guideNotesList");
  });

  var editor = new wangEditor('#editor');
  editor.customConfig.uploadImgServer = 'http://localhost:3000/uploadImg';
  editor.customConfig.uploadImgHooks = {
    customInsert: function (insertImg, result, editor) {
      // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
      // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

      // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
      var url = result.url;
      url.forEach(function(element) {
        insertImg(element);
      });
      // result 必须是一个 JSON 格式字符串！！！否则报错
    }
  }
  editor.create();

  $(".add-cover .overlay").on("click", function() {
    $("#coverIMG").click();
  });
  $("#coverIMG").on("change", function() {
    Common.uploadIMG("coverIMG", function(data) {
      $(".add-cover img").attr("src", data.url[0]);
    });
  });

  $(".saveBtn").on("click", function() {
    var notesStatus = document.querySelectorAll(".notesStatus");
    var timestamp = Date.parse(new Date());
    var params = {};
    for (var i = 0; i < notesStatus.length; i++) {
      if (notesStatus[i].checked) {
        params.status = i;
        break;
      }
    }
    params.title = $("#title").val();
    params.cover = $("#cover").attr("src");
    params.pubtime = timestamp;
    params.city = $("#city").val();
    params.content = editor.txt.html();
    Common.ajax("addGuideNotes", params, function(data) {
      if (data.data.result === 1) {
        location.reload();
      }
    });
  });

}(jQuery));

var preview = function(_this) {
  Common.ajax("getGuideNotes", {"id": _this.getAttribute("data-id")}, function(data) {
    $(".preview-cover img").attr("src", data.data[0].cover);
    $(".preview-title").html(data.data[0].title);
    $(".preview-city").html(data.data[0].city);
    $(".preview-pubtime").html(Common.timeFormat(data.data[0].pubtime));
    $(".preview-content").html(data.data[0].content);
    $(".previewModal").modal();
  });
}
