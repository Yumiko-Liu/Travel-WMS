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
      }]
    }]
  };

  Common.renderer("navListTemp", navList, "navList");

  // 页面切换
  var UserName = sessionStorage.getItem("UserName");
  if (UserName) {
    $('.logout').css("display", "block");
    $('#iframe').attr("src", "./data/user-list.html");
    $(".collapse-item").on("click", function() {
      var path = $(this).attr("data-path");
      $("#iframe").attr("src", path);
      for (var i = 0; i < $(".collapse-item").length; i++) {
        $(".collapse-item").eq(i).removeClass("active");
      }
      $(this).addClass("active");
    });
  } else {
    $('#iframe').attr("src", "./data/login.html");
    $(".collapse-item").on("click", function() {
      $('#iframe').attr("src", "./data/login.html");
    });
  }

  $('.logout').on('click', function() {
    sessionStorage.removeItem("UserName");
    location.reload();
  });
  

}(window));
