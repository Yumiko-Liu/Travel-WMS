(function (win) {
  ajax("getUser", null, function(data) {
    renderer("userListTemp", data, "userList");
  });
}(window));
