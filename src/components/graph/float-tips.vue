<template>
  <div class="circle">
    <div class="num">{{num}}</div>
    <i :class="icon + ' icon1'"></i>
    <span>{{text}}</span>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    text: {
      type: String,
      default: '可疑对象'
    },
    num: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: 'iconfont icon-briefcase'
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  created() {}
}
</script>
<style type="text/scss" lang="scss" scoped>
.circle {
  position: absolute;
  right: 60px;
  top: 45px;
  color: red;
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  padding: 17px 0;
  border-radius: 50%;
  border: 2px solid red;
  background-color: #000;
  z-index: 3;
  line-height: 1;
}
.num {
  position: absolute;
  right: -5px;
  top: -5px;
  line-height: 15px;
  background-color: red;
  color: #fff;
  padding: 4px 7px;
  border-radius: 15px;
}
.icon1 {
  font-size: 30px;
  display: block;
}
</style>
