(function (win) {
  var navList = {
    "nav": [{
      "class": "数据列表",
      "item": [{
        "name": "用户列表",
        "path": "./data/user-list.html"
      }, {
        "name": "攻略列表",
        "path": "./data/guide-notes-list.html"
      }, {
        "name": "游记列表",
        "path": "./data/travel-notes-list.html"
      }, {
        "name": "目的地列表",
        "path": "./data/destination-list.html"
      }]
    }, {
      "class": "设置",
      "item": [{
        "name": "主页焦点图",
        "path": "./setting/index-carousel.html"
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
