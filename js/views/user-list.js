(function ($) {

  Common.ajax("getUser", null, function(data) {
    Common.renderer("userListTemp", data, "userList");
  });

  // 头像上传
  $(".add-avatar").on("click", function() {
    $("#upload-avatar").click();
  });
  $("#upload-avatar").on("change", function() {
    Common.uploadIMG("upload-avatar", function(data) {
      $("#avatar").attr("src", data.url[0]);
    });
  });

  // 保存用户
  $("#saveUser").on("click", function() {
    var userStatus = document.querySelectorAll(".userStatus");
    var params = {};
    params.avatar = $("#avatar").attr("src");
    params.username = $("#username").val();
    params.password = $("#password").val();
    for (var i = 0; i < userStatus.length; i++) {
      if (userStatus[i].checked) {
        params.status = i + 1;
        break;
      }
    }
    Common.ajax("addUser", params, function(data) {
      if (data.data.result === 1) {
        location.reload();
      }
    });
  });
  

}(jQuery));
