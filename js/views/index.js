(function (win) {
  var navList = {
    "nav": [{
      "class": "数据列表",
      "item": [{
        "name": "用户列表",
        "path": "./data/user-list.html"
      }, {
        "name": "item2",
        "path": "http://www.163.com"
      }, {
        "name": "item3",
        "path": "http://www.bing.com"
      }]
    }, {
      "class": "class2",
      "item": [{
        "name": "item1",
        "path": "http://www.apple.com"
      }, {
        "name": "item2",
        "path": "http://www.apple.com"
      }]
    }, {
      "class": "class3",
      "item": [{
        "name": "item1",
        "path": "http://www.apple.com"
      }, {
        "name": "item2",
        "path": "http://www.apple.com"
      }, {
        "name": "item3",
        "path": "http://www.apple.com"
      }]
    }]
  };

  renderer("navListTemp", navList, "navList");

  // 页面切换
  $(".collapse-item").on("click", function() {
    var path = $(this).attr("data-path");
    $("#iframe").attr("src", path);
    for (var i = 0; i < $(".collapse-item").length; i++) {
      $(".collapse-item").eq(i).removeClass("active");
    }
    $(this).addClass("active");
  });
}(window));
