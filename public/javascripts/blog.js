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
    },
    sendblog : function (_id,title,content) {
        var data = {
            '_id' : _id,
            'title' :title,
            'content':content
        };
        $.post('/artical/add',data,function (dat) {
            if(dat.success==1){
                window.location.href = dat.url;
            } else {
                alert('错误，再试试吧');
            }
        });
    }

}