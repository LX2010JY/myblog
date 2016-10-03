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
  },
  checklogin : function () {
      var username = $("#username").val();
      var password = $("#passwd").val();
      var data = {
          username : username,
          password : password
      };
      $.post('/users/login',data,function (dat) {
          if(dat.success==1) {
              window.location.href='/artical';
          } else {
              $("#warning").text("用户名/密码错误");
              $("#warning").slideDown(1000);
              setTimeout(login.hidewarning(),80000);
          }
      });
  },
  register : function () {
    var phone = $("#phone").val();
    var username = $("#name").val();
    var passwd = $("#password").val();
    if(!phone||!username||!passwd) {
        $("#warning").text("请先完成表单哦~");
        $("#warning").slideDown(1000);
        setTimeout(login.hidewarning(),80000);
    } else {
        var data = {
            username:username,
            phone : phone,
            passwd : passwd
        };
        $.post('/users/register',data,function (dat) {
            if(dat.success==1){
                login.SwitchStatus();
                $("#warning").text("注册成功，请登陆");
                $("#name").val('');
                $("#phone").val('');
                $("#password").val('');
                $("#warning").slideDown(1000);
                setTimeout(login.hidewarning(),80000);

            } else {
                $("#warning").text("注册失败，请重试");
                $("#warning").slideDown(1000);
                setTimeout(login.hidewarning(),80000);

            }
        });
    }
  },
  hidewarning : function () {
      $("#warning").slideUp(2000);
  }

};
