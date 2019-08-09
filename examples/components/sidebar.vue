<template>
  <div class="sidebar">
    <h3>新德汇关系图应用类库</h3>
    <dl class="list">
      <dt>
        <router-link to="/">API文档</router-link>
      </dt>
      <dt>
        <router-link to="/go">Go</router-link>
      </dt>
      <dt>
        <router-link to="/tooltip">Tooltip</router-link>
      </dt>
      <dt>
        <router-link to="/circle-menu">圆形菜单</router-link>
      </dt>
      <dt>
        <router-link to="/overview">缩略图</router-link>
      </dt>
      <dt>
        <router-link to="/snapshot">快照</router-link>
      </dt>
      <dt>
        <router-link to="/draft">草稿箱</router-link>
      </dt>
      <dt>
        <router-link to="/tool">gojs开发工具</router-link>
      </dt>
      <dt>
        <router-link to="/layout">布局</router-link>
      </dt>
      <dt>
        <router-link to="/view">视图</router-link>
      </dt>
    </dl>
    <div class="copyright">Powered by XDH FE Team.</div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .sidebar {
    float: left;
    width: 220px;
    background: lightgray;
    height: 100%;
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    /deep/ .router-link-active {
      color: red;
    }
    h3 {
      font-size: 18px;
      text-align: center;
      margin: 10px 0 0 0;
      padding: 0;
    }
  }

  .list {
    padding: 10px 20px;
    margin: 0;
    line-height: 1.8em;
    font-size: 14px;
    height: calc(100% - 90px);
    overflow: auto;
    dt {
      margin-top: 10px;
      color: #666;
    }
    dd {
      margin: 0;
      padding: 0;
      text-indent: 1em;
    }
  }

  .copyright {
    text-align: right;
    font-size: 12px;
    color: #999;
    padding: 10px;
  }
</style>
