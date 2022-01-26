<template>
  <div class="fly-footer">
    <div class="footer-container">
      <p>
        <a href="https://v3.bootcss.com" target="_blank">Bootstrap&nbsp;&nbsp;社区&nbsp;&nbsp;&nbsp;&nbsp;</a> 2017 &copy; &nbsp;&nbsp;&nbsp;&nbsp;<a href="https://v3.bootcss.com" target="_blank">bootcss.com&nbsp;&nbsp;出品</a>
      </p>
      <p>
        <a href="https://v3.bootcss.com/getting-started/" target="_blank">入门&nbsp;&nbsp;&nbsp;&nbsp;</a>
        <a href="https://v3.bootcss.com/css/" target="_blank">全局CSS样式&nbsp;&nbsp;&nbsp;&nbsp;</a>
        <a href="https://v3.bootcss.com/components/" target="_blank">组件</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.fly-footer {
  width: 100%;
  height: 100px;
  padding: 25px;
  position: relative;
  /* background: paleturquoise; */
  border-top: 1px solid #d3d3d3;
}
.footer-container {
  width: 300px;
  height: 100px;
  position:absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>
