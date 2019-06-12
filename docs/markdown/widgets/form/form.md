
## From 自定义表单

可通过配置数据创建表单，支持表单分支和子表单。包含以下组件：

- [xdh-form](#/src/widgets%2Fmodule-widgets_xdh-form.html)
- [xdh-form-item](#/src/widgets%2Fmodule-widgets_xdh-form-item.html)
- [xdh-form-array](#/src/widgets%2Fmodule-widgets_xdh-form-array.html)
- [xdh-form-object](#/src/widgets%2Fmodule-widgets_xdh-form-object.html)
- [xdh-form-divider](#/src/widgets%2Fmodule-widgets_xdh-form-divider.html)

### 基础用法

:::demo
```html
<template>
 <xdh-form :model="model" @submit="handleSubmit" @change="handleChange">
    <xdh-form-item prop="title" label="标题" type="input" :rules="rules"></xdh-form-item>
    <xdh-form-item prop="date" label="日期" type="date" :rules="rules"></xdh-form-item>
</xdh-form>
</template>
<script>
import XdhForm from '@/widgets/xdh-form'
import XdhFormItem from '@/widgets/xdh-form/xdh-form-item'
// 可以简化为：
// import {XdhForm, XdhFormItem} from '@/widgets/xdh-form'
export default {
  components: {
    XdhForm,
    XdhFormItem
  },
  data() {
    return {
      rules: {
        required: true,
        message: '此项不能为空'
      },
      // 初始化数据回填，可选
      model: {
        title: '我是标题',
        date: '2019-10-04'
      }
    }
  },
  methods: {
    handleSubmit(model) {
      console.log('submit', model)
    },
    handleChange(model) {
        console.log('change', model)
    }
  }
}
</script>

```
:::

### 自定义布局排版，内行模式
:::demo
```html
<template>
 <xdh-form :inline="true" inline-size="small" label-width="100px" size="small">
    <xdh-form-item prop="text" label="文本" type="input"></xdh-form-item>
    <xdh-form-item prop="date" label="日期" type="date"></xdh-form-item>
    <xdh-form-item prop="time" label="时间" type="time"></xdh-form-item>
    <xdh-form-item prop="range" label="范围" type="range"></xdh-form-item>
    <xdh-form-item prop="select" label="下拉框" type="select" :options="tree"></xdh-form-item>
    <xdh-form-item prop="number" label="数字" type="number"></xdh-form-item>
    <xdh-form-item prop="tags" label="标签框" type="inputTag"></xdh-form-item>
    <xdh-form-item prop="cascader" label="级联" type="cascader" :options="tree"></xdh-form-item>
    <xdh-form-item prop="tree" label="下拉树" type="tree" :options="tree" :props="{popperWidth:300,popperHeight:300}"></xdh-form-item>
    <xdh-form-divider content="分隔线"></xdh-form-divider>
    <xdh-form-item prop="text" label="文本" type="input" :props="{type:'textarea',rows:3}" :block="true"></xdh-form-item>
</xdh-form>
</template>
<script>
import XdhForm from '@/widgets/xdh-form'
import XdhFormItem from '@/widgets/xdh-form/xdh-form-item'
import XdhFormDivider from '@/widgets/xdh-form/xdh-form-divider'
export default {
  components: {
    XdhForm,
    XdhFormItem,
    XdhFormDivider
  },
  data() {
    return {
      options:[
        {
          label: '选项一',
          value: '1'
        },
        {
          label: '选项二',
          value: '2'
        }
      ],
      tree:[
        {
          id: '1',
          label: '选项1',
          value: '1',
          parentId: null
        },
        {
          id: '2',
          label: '选项2',
          value: '2',
          parentId: null
        },
        {
          id: '3',
          label: '选项1-1',
          value: '1-1',
          parentId: '1'
        },
        {
          id: '4',
          label: '选项1-2',
          value: '1-2',
          parentId: '1'
        },
        {
          id: '5',
          label: '选项2-1',
          value: '2-1',
          parentId: '2'
        }
      ]
    }
  }
}
</script>

```
:::

### 固定列数布局
:::demo
```html
<template>
 <xdh-form size="small" label-width="80px">
   <xdh-form-group :block="false" width="25%">
      <xdh-form-item prop="text" label="文本" type="input"></xdh-form-item>
   </xdh-form-group><xdh-form-group :block="false" width="25%">
      <xdh-form-item prop="date" label="日期" type="date"></xdh-form-item>
   </xdh-form-group><xdh-form-group :block="false" width="25%">
       <xdh-form-item prop="time" label="时间" type="time"></xdh-form-item>
   </xdh-form-group><xdh-form-group :block="false" width="25%">
      <xdh-form-item prop="range" label="范围" type="range"></xdh-form-item>
   </xdh-form-group>
</xdh-form>
</template>
<script>
import XdhForm from '@/widgets/xdh-form'
import XdhFormItem from '@/widgets/xdh-form/xdh-form-item'
import XdhFormGroup from '@/widgets/xdh-form/xdh-form-group'
export default {
  components: {
    XdhForm,
    XdhFormItem,
    XdhFormGroup
  }
}
</script>
```
:::

### 改变提交按钮位置

:::demo
```html
<template>
 <xdh-form size="small" label-width="80px" :inline="true" footer-align="inline" inline-size="small" submit-text="查询">
    <xdh-form-item prop="text" label="文本" type="input"></xdh-form-item>
    <xdh-form-item prop="range" label="范围" type="range"></xdh-form-item>
    <xdh-form-item prop="date" label="日期" type="date"></xdh-form-item>
</xdh-form>
</template>
<script>
import XdhForm from '@/widgets/xdh-form'
import XdhFormItem from '@/widgets/xdh-form/xdh-form-item'
import XdhFormGroup from '@/widgets/xdh-form/xdh-form-group'
export default {
  components: {
    XdhForm,
    XdhFormItem,
    XdhFormGroup
  }
}
</script>
```
:::

### 依赖联动

:::demo
```html
<template>
 <xdh-form size="small" label-width="80px">
    <xdh-form-item prop="radio" label="类型选择" type="radio" :options="options" value="1" :props="{button:true}"></xdh-form-item>
    <xdh-form-item prop="slider" label="滑块" type="slider" depend="radio" depend-value="2"></xdh-form-item>
    <xdh-form-item prop="rate" label="评分" type="rate" depend="radio" depend-value="1"></xdh-form-item>
</xdh-form>
</template>
<script>
import XdhForm from '@/widgets/xdh-form'
import XdhFormItem from '@/widgets/xdh-form/xdh-form-item'
export default {
  components: {
    XdhForm,
    XdhFormItem
  },
  data() {
    return {
       options:[
          {
            label: '评分',
            value: '1'
          },
          {
            label: '滑块',
            value: '2'
          }
        ]
    }
  }
}
</script>
```
:::

### 对象类型值
:::demo
```html
<template>
 <xdh-form size="small" label-width="100px" @change="handleChange">
   <xdh-form-object prop="user" label="用户">
     <xdh-form-item prop="name" label="姓名" type="input"></xdh-form-item>
     <xdh-form-item prop="date" label="出生日期" type="date"></xdh-form-item>
   </xdh-form-object>

   <div>{{JSON.stringify(model)}}</div>
</xdh-form>
</template>
<script>
import XdhForm from '@/widgets/xdh-form'
import XdhFormItem from '@/widgets/xdh-form/xdh-form-item'
import XdhFormObject from '@/widgets/xdh-form/xdh-form-object'
export default {
  components: {
    XdhForm,
    XdhFormItem,
    XdhFormObject
  },
  data() {
    return {
      model:null
    }
  },
  methods: {
    handleChange(model) {
      this.model = model
    }
  }
}
</script>
```
:::

### 动态增减表单项
:::demo
```html
<template>
 <xdh-form label-width="100px" @change="handleChange">
    <xdh-form-array prop="arr">
        <xdh-form-group v-for="(item,index) in list" :key="index" :inline="true" inline-size="small">
          <xdh-form-item
            v-bind="item"
            :prop="index"
            :label="`域名${index+1}`"
            :rules="{required: true}"></xdh-form-item>
          <el-button @click="add">新增</el-button>
          <el-button v-if="index>0" @click="remove(index)">删除</el-button>
        </xdh-form-group>
    </xdh-form-array>
</xdh-form>
</template>
<script>
import XdhForm from '@/widgets/xdh-form'
import XdhFormItem from '@/widgets/xdh-form/xdh-form-item'
import XdhFormArray from '@/widgets/xdh-form/xdh-form-array'
import XdhFormGroup from '@/widgets/xdh-form/xdh-form-group'
export default {
  components: {
    XdhForm,
    XdhFormItem,
    XdhFormArray,
    XdhFormGroup
  },
  data() {
    return {
      list:[{type: 'input'}]
    }
  },
  methods: {
    handleChange(model) {
      console.log(model)
    },
    add() {
      this.list.push({type: 'input'})
    },
    remove(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

```
:::

### 表格二维表单
:::demo
```html
<template>
<xdh-form @change="handleChange" :model="model" class="tableForm" size="small">
    <xdh-form-array prop="table">
      <el-table
        :data="model.table"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
          <template slot-scope="{row, $index}">
            <xdh-form-item v-model="row.date" :prop="`${$index}.date`" type="date" :rules="{required:true}"></xdh-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
          <template slot-scope="{row, $index}">
            <xdh-form-item v-model="row.name" :prop="`${$index}.name`" :rules="{required:true}"></xdh-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
          <template slot-scope="{row, $index}">
            <xdh-form-item v-model="row.address" :prop="`${$index}.address`" :rules="{required:true}"></xdh-form-item>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="{$index}">
               <el-button @click="add" size="small">新增</el-button>
                <el-button v-if="$index>0" @click="remove($index)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </xdh-form-array>
 </xdh-form>
</template>
<script>
import XdhForm from '@/widgets/xdh-form'
import XdhFormItem from '@/widgets/xdh-form/xdh-form-item'
import XdhFormArray from '@/widgets/xdh-form/xdh-form-array'
export default {
  components: {
    XdhForm,
    XdhFormItem,
    XdhFormArray
  },
  data() {
    return {
      model:{
        table: [
            {
              name: '',
              date: '',
              address: ''
            }
        ]
      }
    }
  },
  methods: {
    handleChange(model) {
      console.log(model)
    },
    add() {
      this.model.table.push({
          name: '',
          date: '',
          address: ''
      })
    },
    remove(index) {
      this.model.table.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.tableForm {
 /deep/ .el-table td {
    vertical-align: top;
 }
}
</style>

```
:::
