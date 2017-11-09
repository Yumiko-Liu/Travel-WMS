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
  
}(jQuery));

// 初始化modal
var modalInit = function() {
  $("#avatar").attr("src", "../images/avatar.jpg");
  $("#username").val('');
  $("#password").val('');
  document.querySelectorAll(".userStatus")[0].checked = true;
}

var getModalVal = function(callback) {
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
  callback(params);
}

// 参数type: 1: 新增用户, 2: 修改用户
var openUserModal = function(_this, type) {
  modalInit();
  if (type === 1) {
    $("#saveUser").on("click", function() {
      getModalVal(function(val) {
        Common.ajax("addUser", val, function(data) {
          if (data.data.result === 1) {
            location.reload();
          }
        });
      });
    });
  } else if (type === 2) {
    var id = _this.getAttribute("data-id");
    Common.ajax("getUser", {"id": id}, function(data) {
      $("#avatar").attr("src", data.data[0].avatar);
      $("#username").val(data.data[0].username);
      $("#password").val(data.data[0].password);
      document.querySelectorAll(".userStatus")[data.data[0].status - 1].checked = true;
    });

    $("#saveUser").on("click", function() {
      getModalVal(function(val) {
        val.id = id;
        Common.ajax("modifyUser", val, function(data) {
          if (data.data.result === 1) {
            location.reload();
          }
        });
      });
    });
  }
  $("#userInfoModal").modal();
}
