var blog = {

    addComment : function (blog_id) {
        var content = $("#commcontent").val();
        if(!content) {
            alert("请填写内容先");
            return;
        }
        var data = {
            blog_id : blog_id,
            content : content
        };
        $.post('/comment/add',data,function (dat) {
            if(dat.success!==0) {
                window.location.reload();
            } else {
                alert('添加失败');
            }
        });
    }

}