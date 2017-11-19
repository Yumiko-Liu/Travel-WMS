var INTERFACE_URL = "http://localhost:3000/";

if (window.location.href.indexOf("47.52.150.216") !== -1) {
  INTERFACE_URL = "http://47.52.150.216:3000/";
}

var Common = {
  // 模板渲染
  renderer: function(templateID, data, targetID) {
    var template = $("#" + templateID).html();
    data.time = function() {
      return Common.timeFormat(this.pubtime);
    }
    Mustache.parse(template);   // optional, speeds up future uses
    var rendered = Mustache.render(template, data);
    $("#" + targetID).html(rendered);
  },

  timeFormat: function(date) {
    var d = new Date(+date);
    var year = d.getFullYear();
    var month = tidy(d.getMonth() + 1);
    var date = tidy(d.getDate());
    var hour = tidy(d.getHours());
    var minute = tidy(d.getMinutes());
    // 时间补零
    function tidy(time) {
      return time.toString().length == 1 ? "0" + time: time;
    }
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
  },

  ajax: function(_interface, _param, callback) {
    $.ajax({
      type: "POST",
      url: INTERFACE_URL + _interface,
      data: _param,
      success: function(res) {
        var data = {
          "data": res
        };
        callback(data);
      },
      error: function(err) {
        console.log(JSON.stringify(err));
      }
    });
  },

  // 上传图片
  uploadIMG: function(_filenodeID, callback) {
    var filenode = document.getElementById(_filenodeID);
    var formData = new FormData();
    formData.append("file", filenode.files[0]);
    $.ajax({
      url: INTERFACE_URL + 'uploadImg',
      type: 'POST',
      data: formData, //<----要传输的数据
      async: false,
      cache: false,
      timeout: 100,
      contentType: false, //<----头信息设置为false
      processData: false,
      success: function(data) {
        if (data.errno === 0) {
          callback(data);
        } else {
          alert('文件上传失败');
        }
      },
      error: function(xhr){
        alert('文件上传失败：原因是' + xhr.status);
      }
    });
  }

}
