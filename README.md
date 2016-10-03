# myblog
node+express 这次一定要上线成为我的个人博客

#mongoose使用
<ul>
<li>mongoose 一共分为三种类型:
<li>1.schema 定义 静态方法，model可以直接使用 blogSchema.static.findadd(function(cb){}),blogSchema.methods.asjda = function(){} 必须将model发布为entity才能使用. schema使用model ：this.model('blog');

<li>2.models find remove
<li>3.Entity save (包含 insert 和 update)
</ul>
使用介绍：http://cnodejs.org/topic/504b4924e2b84515770103dd
