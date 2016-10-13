# myblog
node+express 这次一定要上线成为我的个人博客

#安装使用
<ol>
<li>git clone 代码到本地
<li>进入文件夹下面，使用 npm install 命令安装所需的插件
<li>bower install bootstrap,simditor
<li>安装mongodb，默认配置就好
<li>node ./bin/www 开启服务
</ol>

#mongoose使用
<ul>
<li>mongoose 一共分为三种类型:
<li>1.schema 定义 静态方法，model可以直接使用 blogSchema.static.findadd(function(cb){}),blogSchema.methods.asjda = function(){} 必须将model发布为entity才能使用. schema使用model ：this.model('blog');

<li>2.models find remove
<li>3.Entity save (包含 insert 和 update)
</ul>
使用介绍：http://cnodejs.org/topic/504b4924e2b84515770103dd

#node-canvas安装
使用验证码，使用canvas ，在ubuntu环境下
<ul>
<li>sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++</li>
<li>npm install canvas -g</li>
</ul>

