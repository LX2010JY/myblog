var login = {
  CheckName : function(){
    var username = $("#username").val();
    var passwd   = $("#passwd").val();
    var data = {
      'username': username,
      'passwd'  : passwd,
    };
    $.post('localhost:3000/login/check',data,function(dat){
      if(dat=='ok') {
        
      }
    });
  },
  SwitchStatus : function () {
    if($("#login").css("display")!="none") {
      $("#dl").css("color","#999");
      $("#zc").css("color","#000");
      $("#login").hide();
      $("#register").show();

    } else{
      $("#zc").css("color","#999");
      $("#dl").css("color","#000");
      $("#register").hide();
      $("#login").show();
    }
  }
}
