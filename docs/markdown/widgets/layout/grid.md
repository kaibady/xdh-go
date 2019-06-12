## Grid 网格排版

采用css3 flex 布局。文档： [xdh-grid](#/src/widgets%2Fmodule-widgets_xdh-grid.html)

### 基础用法

横向布局


:::demo
```html
<template>
  <xdh-grid :data="list" direction="row" justify="flex-start" wrap="wrap">
     <div class="box-wrapper" slot-scope="scope">
         <div class="box">{{scope.item}}</div>
      </div>
  </xdh-grid>
</template>
<style lang="scss" scoped>
  .box-wrapper {
    padding: 10px;

  }
  .box{
    background: #ccc;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
</style>
<script>
  export default {
    data() {
      return {
        list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
      }
    }
  }
</script>

```
:::


### 垂直方向布局

:::demo `direction` 决定主轴的方向(即项目的排列方向, `justify` 定义item在主轴的对齐方式, `wrap` 确定容器内item是否可换行
```html
<template>
  <xdh-grid class="grid-demo" :data="list" direction="column" justify="flex-start" wrap="wrap" align-content="flex-start">
     <div class="box-wrapper" slot-scope="scope">
         <div class="box">{{scope.item}}</div>
      </div>
  </xdh-grid>
</template>
<style lang="scss" scoped>
  .grid-demo{
    height: 400px;
  }
  .box-wrapper {
    padding: 10px;

  }
  .box{
    background: #ccc;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
</style>
<script>
  export default {
    data() {
      return {
        list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
      }
    }
  }
</script>

```
:::

### 定义布局
:::demo
```html
<template>
    <xdh-grid :data="grid" justify="space-between" wrap="wrap" class="my-grid">
      <div slot-scope="scope" class="my-panel">
        <xdh-panel :title="`index: ${scope.index}`">
          {{scope.item}}
        </xdh-panel>
      </div>
    </xdh-grid>
</template>
<style lang="scss" scoped>

  .my-grid {
    padding: 10px 10px 10px 0;
  }

  .my-panel {
    padding: 0 0 0 10px;
  }
</style>
<script>

  export default {
    data() {
      return {
        grid: [
          {
            basis: '40%'
          },
          {
            basis: '60%'
          },
          {
            basis: '60%'
          },
          {
            basis: '40%'
          },
          {
            basis: '30%'
          },
          {
            basis: '40%'
          },
          {
            basis: '30%'
          }
        ]
      }
    }
  }
</script>

```
:::


### 可拖拽排序
:::demo
```html
<template>
  <xdh-grid :data.sync="list" direction="row" justify="flex-start" wrap="wrap" sortable>
     <div class="box-wrapper" slot-scope="scope">
         <div class="box">{{scope.item}}</div>
      </div>
  </xdh-grid>
</template>
<style lang="scss" scoped>
  .box{
    background: #ccc;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
  .xdh-grid__item.sortable-ghost .box{
    background:orange;
     opacity:0.3;
  }

</style>
<script>
  export default {
    data() {
      return {
        list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
      }
    }
  }
</script>

```
:::


### 分组拖放
:::demo
```html
 <template>
    <xdh-panel title="A组">
       <xdh-grid :data.sync="list1" direction="row" justify="flex-start" wrap="wrap" :sortable="sortable1">
           <div class="box-wrapper" slot-scope="scope">
               <div class="box">{{scope.item}}</div>
            </div>
      </xdh-grid>
    </xdh-panel>

    <xdh-panel title="B组">
      <xdh-grid :data.sync="list2" direction="row" justify="flex-start" wrap="wrap" :sortable="sortable2">
           <div class="box-wrapper" slot-scope="scope">
               <div class="box">{{scope.item}}</div>
            </div>
      </xdh-grid>
    </xdh-panel>
 </template>
<style lang="scss" scoped>
  .box-wrapper {
    padding: 10px;

  }
  .box{
    background: #ccc;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
</style>
 <script>
   export default {
     data() {
       return {
        list1: [1,2,3,4,5,6,7,8,9,10],
        list2: [11,12,13,14,15,16,17,18,19,20],
        sortable1: {
          sort: false,
          group: {
            name: 'A',
            pull: true,
            put: true
          }
        },
        sortable2: {
          sort: false,
          group: {
            name: 'A',
            pull: true,
            put: true
          }
         }
       }
     }
   }
 </script>
```
:::
