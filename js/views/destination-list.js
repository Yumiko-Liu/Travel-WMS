(function($) {
  // 表格数据渲染
  Common.ajax("getDestination", null, function(data) {
    Common.renderer("destinationListTemp", data, "destinationList");
  });

  // 封面图片上传
  $(".add-cover .overlay").on("click", function() {
    $("#coverIMG").click();
  });
  $("#coverIMG").on("change", function() {
    Common.uploadIMG("coverIMG", function(data) {
      $(".add-cover img").attr("src", data.url[0]);
    });
  });

}(jQuery));

// 初始化modal
var modalInit = function() {
  $("#cover").attr("src", "../images/avatar.jpg");
  $("#name_zh").val('');
  $("#name_en").val('');
  $("#region").val('');
  $("#description").val('');
  document.querySelectorAll(".destinationStatus")[1].checked = true;
}

var getModalVal = function(callback) {
  var destinationStatus = document.querySelectorAll(".destinationStatus");
  var params = {};
  for (var i = 0; i < destinationStatus.length; i++) {
    if (destinationStatus[i].checked) {
      params.status = i;
      break;
    }
  }
  params.name_zh = $("#name_zh").val();
  params.name_en = $("#name_en").val();
  params.cover = $("#cover").attr("src");
  params.region = $("#region").val();
  params.description = $("#description").val();
  callback(params);
}

// 参数type: 1: 新增, 2: 修改
var openModal = function(_this, type) {
  $(".destinationModal").modal();
  modalInit();
  if (type === 1) {
    document.querySelector(".saveBtn").onclick = function() {
      getModalVal(function(val) {
        Common.ajax("addDestination", val, function(data) {
          if (data.data.result === 1) {
            location.reload();
          }
        });
      });
    };
  } else if (type === 2) {
    var id = _this.getAttribute("data-id");
    Common.ajax("getDestination", {"id": id}, function(data) {
      $("#cover").attr("src", data.data[0].cover);
      $("#titname_zhle").val(data.data[0].name_zh);
      $("#name_en").val(data.data[0].name_en);
      $("#region").val(data.data[0].region);
      $("#description").val(data.data[0].description);
      document.querySelectorAll(".destinationStatus")[data.data[0].status].checked = true;
    });

    document.querySelector(".saveBtn").onclick = function() {
      getModalVal(function(val) {
        val.id = id;
        Common.ajax("modifyDestination", val, function(data) {
          if (data.data.result === 1) {
            location.reload();
          }
        });
      });
    };
  }
}
