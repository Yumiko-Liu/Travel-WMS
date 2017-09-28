// 模板渲染
var renderer = function (templateID, data, targetID) {
  var template = $("#" + templateID).html();
  Mustache.parse(template);   // optional, speeds up future uses
  var rendered = Mustache.render(template, data);
  $("#" + targetID).html(rendered);
}
