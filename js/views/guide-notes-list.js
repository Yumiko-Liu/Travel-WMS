(function($) {
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
  var filenode = document.getElementById("coverIMG");  
  $("#coverIMG").on("change", function() {
    var formData = new FormData();
    formData.append("file", filenode.files[0]);
    $.ajax({
      url: 'http://localhost:3000/uploadImg',
      type: 'POST',
      data: formData, //<----要传输的数据
      async: false,
      cache: false,
      timeout: 100,
      contentType: false, //<----头信息设置为false
      processData: false,
      success: function(data) {
        if (data.errno === 0) {
          $(".add-cover img").attr("src", data.url[0]);
        } else {
          alert('文件上传失败');
        }
      },
      error: function(xhr){
        alert('文件上传失败：原因是' + xhr.status);
      }
    });
  });
}(jQuery));