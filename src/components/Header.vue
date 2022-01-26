<template>
  <div class="fly-header">
    <div class="header-container">
      <a href="/" class="fly-logo">
        <img src="../assets/logo.png" alt="" class="img-size">
      </a>
    </div>
    <ul class="fly-nav">
      <li class="nav-item">
        <a href="/"><i class="fa fa-comments-o">&nbsp;&nbsp;交流</i></a>
      </li>
      <li class="nav-item">
        <a href="./case/case.html"><i class="fa fa-envelope-o">&nbsp;&nbsp;案例</i></a>
      </li>
      <li class="nav-item">
        <a href="https://v3.bootcss.com" target="_blank"><i class="fa fa-folder-o">&nbsp;&nbsp;框架</i></a>
      </li>
    </ul>

    <ul class="fly-nav-user">
      <!-- 未登入的状态 -->
      <li class="nav-item">
        <a href="../user/login.html" class="fa fa-user-circle"></a>
      </li>
      <li class="nav-item">
        <a href="../user/login.html">登入</a>
      </li>
      <li class="nav-item">
        <a href="../user/reg.html">注册</a>
      </li>
      <li class="nav-item">
        <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade:0.1, time:0})" title="QQ登入" class="fa fa-qq"></a>
      </li>
      <li class="nav-item">
        <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade:0.1, time:0})" title="微博登入" class="fa fa-weibo"></a>
      </li>

      <!-- 登入后的状态 -->
      <!-- <li class="nav-item">
        <a href="" class="fly-nav-avator">
          <cite>八月</cite>
          <i class="fa fa-user-o" title="认证信息：august 作者"></i>
          <i>VIP3</i>
          <img src="">
        </a>
        <dl class="nav-child">
          <dd><a href="../user/set.html"><i>&#xe620;</i>基本设置</a></dd>
          <dd><a href="../user/message.html"><i class="fa fa-commenting-o" style="top: 4px;"></i>我的消息</a></dd>
          <dd><a href="../user/home.html"><i class="fa fa-commenting-o" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</a></dd>
          <hr style="margin: 5px 0;">
          <dd><a href="../user/logout.html" style="text-align: center;">退出</a></dd>
        </dl>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.fly-header {
  width: 100%;
  height: 100px;
  padding: 25px;
  background: paleturquoise;
}
.header-container {
  display: inline-block;
}
.img-size {
  width: 50px;
  width: 50px;
}
ul {
  display: inline-block;
}
li {
  float: left;
  list-style: none;
  margin-right: 20px;
}
</style>
