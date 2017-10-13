// 模板渲染
var renderer = function (templateID, data, targetID) {
  var template = $("#" + templateID).html();
  Mustache.parse(template);   // optional, speeds up future uses
  var rendered = Mustache.render(template, data);
  $("#" + targetID).html(rendered);
}

var INTERFACE_URL = "http://localhost:3000/";
var ajax = function(_interface, _param, callback) {
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
}
