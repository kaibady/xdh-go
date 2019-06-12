## FormItem 表单域

文档： [xdh-form-item](#/src/widgets%2Fmodule-widgets_xdh-form-item.html)

### 字段类型预览
:::demo
```html
<template>
 <xdh-form :inline="true" label-width="100px" inline-size="medium">
     <xdh-form-item prop="date" label="日期" type="date"></xdh-form-item>
     <xdh-form-item prop="input" label="文本框" type="input"></xdh-form-item>
     <xdh-form-item prop="inputTag" label="标签框" type="inputTag"></xdh-form-item>
     <xdh-form-item prop="number" label="数字框" type="number"></xdh-form-item>
     <xdh-form-item prop="range" label="范围" type="range" :props="{dataType:'date'}"></xdh-form-item>
     <xdh-form-item prop="select" label="下拉框" type="select" :options="options"></xdh-form-item>
     <xdh-form-item prop="time" label="时间" type="time"></xdh-form-item>
     <xdh-form-item prop="tree" label="下拉树" type="tree" :options="treeOptions" :props="{multiple:true,collapseTags:true}"></xdh-form-item>
     <xdh-form-item prop="cascader" label="级联" type="cascader" :options="treeOptions" :props="{clearable:true}"></xdh-form-item>
     
     <xdh-form-item type="divider" :props="{content:'分割线'}"></xdh-form-item>
     
     <xdh-form-item prop="checkbox" label="复选框" type="checkbox" :options="options"></xdh-form-item>
     <xdh-form-item prop="color" label="颜色" type="color"></xdh-form-item>
     <xdh-form-item prop="radio" label="单选框" type="radio" :options="options"></xdh-form-item> 
     <xdh-form-item prop="rate" label="评分" type="rate"></xdh-form-item>
     <xdh-form-item prop="radioBtn" label="单选框" type="radio" :options="options" value="1" :props="{button:true}"></xdh-form-item> 
     <xdh-form-item prop="checkboxBtn" label="复选框" type="checkbox" :options="options" :value="['1']" :props="{button:true}"></xdh-form-item>
     <xdh-form-item prop="switch" label="开关" type="switch"></xdh-form-item>
     
     <xdh-form-item type="divider" :props="{content:'分割线'}"></xdh-form-item>
     
     <xdh-form-item prop="editor" label="富文本" type="editor" :block="true"></xdh-form-item>
     <xdh-form-item prop="tag" label="标签" type="tag" :block="true"></xdh-form-item>
     <xdh-form-item prop="slider" label="滑块" type="slider" :block="true"></xdh-form-item>
     <xdh-form-item prop="upload" label="上传" type="upload" :block="true" :props="{action:'/api/upload', autoUpload:true}"></xdh-form-item>
          
</xdh-form>
</template>
<script>
import XdhForm from '@/widgets/xdh-form'
import XdhFormItem from '@/widgets/xdh-form/xdh-form-item'
function createTree() {
  const tree = []
  for (let i = 0; i < 10; i++) {
    tree.push({
      id: i.toString(),
      label: '选项' + i,
      value: i.toString(),
      parentId: null
    })
    for (let j = 0; j < 10; j++) {
      tree.push({
        id: `${i}-${j}`,
        label: '选项' + i + '-' + j,
        value: `${i}-${j}`,
        parentId: i.toString()
      })

      for (let k = 0; k < 10; k++) {
        tree.push({
          id: `${i}-${j}-${k}`,
          label: '选项' + i + '-' + j + '-' + k,
          value: `${i}-${j}-${k}`,
          parentId: `${i}-${j}`
        })
      }
    }
  }

  return tree
}

export default {
  components: {
    XdhForm,
    XdhFormItem
  },
  data() {
    return {
      treeOptions: [...createTree()],
      options:[
        {
          label: '选项一',
          value: '1'
        },
        {
          label: '选项二',
          value: '2'
        }
      ]
    }
  }
}
</script>

```
:::
