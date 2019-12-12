# Tooltip 组件

::: tip 提示
XdhGoTooltip可用于实现节点提示功能及简易菜单，组件[XdhGoTooltip](/api.html?url=/xdh-go/doc/module-xdh-go-tooltip.html)，相关组件XdhGoHtml文档[XdhGoHtml](/api.html?url=/xdh-go/doc/module-xdh-go-html.html)
:::

## 基础用法

XdhGoTooltip 必须与 XdhGoHtml 一同使用, 须在 XdhGoHtml 定义 menu-name 参数，该参数名称会在模板方法中通过组件的 htmlInfo 对象提供出来
:::demo

```html
<template>
  <xdh-go
    :diagram-name="'dig1'"
    :nodes="nodes"
    :links="links"
    :type="model"
    :node-template-map="nodeTemplateMap"
    :link-template="linkTemplate"
    :config="config"
    :layout="layout"
    height="200px"
  >
    <xdh-go-html menu-name="tool1" :show-context-menu="showContextMenu">
      <xdh-go-tooltip :text="'提示'"></xdh-go-tooltip>
    </xdh-go-html>
  </xdh-go>
</template>
<script>
  import { XdhGo, XdhGoTooltip, XdhGoHtml } from 'xdh-go';
  export default {
    components: {
      XdhGo,
      XdhGoTooltip,
      XdhGoHtml
    },
    data() {
      return {
        showTimeout: null,
        model: 'GraphLinksModel',
        nodes: [
          { key: 'A', category: 'a' },
          { key: 'B', category: 'b' },
          { key: 'C', category: 'c' }
        ],
        links: [{ from: 'A', to: 'B' }, { from: 'A', to: 'C' }]
      };
    },
    methods: {
      showContextMenu(obj, diagram, tool, menu) {
        if (this.showTimeout) {
          clearTimeout(this.showTimeout);
        }
        menu.style.display = 'block';
        let el = diagram.div;
        let offset = el.getBoundingClientRect();
        let point = diagram.transformDocToView(obj.actualBounds.center);
        menu.style.left = point.x + offset.left + 'px';
        menu.style.top = point.y + offset.top + 20 + 'px';
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 100
        };
      },
      nodeTemplate(
        $,
        go,
        color,
        {
          htmlInfo: { tool1 }
        }
      ) {
        console.log(tool1)
        return $(
          go.Node,
          'Auto',
          { background: color, toolTip: tool1 },
          $(
            go.TextBlock,
            'Default Text',
            { margin: 12, stroke: '#ffffff' },
            new go.Binding('text', 'key')
          )
        );
      },
      linkTemplate($, go) {
        return $(
          go.Link,
          { routing: go.Link.Orthogonal, corner: 5 },
          $(go.Shape, { strokeWidth: 3, stroke: '#555' })
        );
      },
      nodeTemplateMap($, go, vm) {
        const a = this.nodeTemplate($, go, 'red', vm);
        const b = this.nodeTemplate($, go, 'blue', vm);
        const c = this.nodeTemplate($, go, 'green', vm);
        const map = new go.Map();
        map.add('a', a);
        map.add('b', b);
        map.add('c', c);
        return map;
      },
      layout($, go) {
        return new go.TreeLayout();
      }
    }
  };
</script>
```

:::

## 改变 tooltip 内容

可以通过 XdhGoHtml 的 before-show-menu 参数方法改变 tooltip 的内容，从而使 tooltip 按不同节点显示不同内容
:::demo

```html
<template>
  <xdh-go
    :diagram-name="'dig2'"
    :nodes="nodes"
    :links="links"
    :type="model"
    :node-template-map="nodeTemplateMap"
    :link-template="linkTemplate"
    :config="config"
    :layout="layout"
    height="200px"
  >
    <xdh-go-html
      :before-show-menu="beforeShowMenu"
      :show-context-menu="showContextMenu"
      menu-name="tool2"
    >
      <xdh-go-tooltip :text="tooltipText"> </xdh-go-tooltip>
    </xdh-go-html>
  </xdh-go>
</template>
<script>
  import { XdhGo, XdhGoTooltip, XdhGoHtml } from 'xdh-go';
  export default {
    components: {
      XdhGo,
      XdhGoTooltip,
      XdhGoHtml
    },
    data() {
      return {
        tooltipText: '',
        model: 'GraphLinksModel',
        showTimeout: null,
        nodes: [
          { key: 'A', category: 'a' },
          { key: 'B', category: 'b' },
          { key: 'C', category: 'c' }
        ],
        links: [{ from: 'A', to: 'B' }, { from: 'A', to: 'C' }]
      };
    },
    methods: {
      showContextMenu(obj, diagram, tool, menu) {
        if (this.showTimeout) {
          clearTimeout(this.showTimeout);
        }
        menu.style.display = 'block';
        let el = diagram.div;
        let offset = el.getBoundingClientRect();
        let point = diagram.transformDocToView(obj.actualBounds.center);
        menu.style.left = point.x + offset.left + 'px';
        menu.style.top = point.y + offset.top + 20 + 'px';
      },
      beforeShowMenu(obj, diagram, tool, menu) {
        this.tooltipText = obj.part.data.key;
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 100
        };
      },
      nodeTemplate(
        $,
        go,
        color,
        {
          htmlInfo: { tool2 }
        }
      ) {
        return $(
          go.Node,
          'Auto',
          { background: color, toolTip: tool2 },
          $(
            go.TextBlock,
            'Default Text',
            { margin: 12, stroke: '#ffffff' },
            new go.Binding('text', 'key')
          )
        );
      },
      linkTemplate($, go) {
        return $(
          go.Link,
          { routing: go.Link.Orthogonal, corner: 5 },
          $(go.Shape, { strokeWidth: 3, stroke: '#555' })
        );
      },
      nodeTemplateMap($, go, vm) {
        const a = this.nodeTemplate($, go, 'red', vm);
        const b = this.nodeTemplate($, go, 'blue', vm);
        const c = this.nodeTemplate($, go, 'green', vm);
        const map = new go.Map();
        map.add('a', a);
        map.add('b', b);
        map.add('c', c);
        return map;
      },
      layout($, go) {
        return new go.TreeLayout();
      }
    }
  };
</script>
```

:::

## 插槽

tooltip 可以看做一个容器，它支持插槽，你可以通过它实现简单的菜单功能。示例：在节点处点击右键
:::demo

```html
<template>
  <xdh-go
    :diagram-name="'dig3'"
    :nodes="nodes"
    :links="links"
    :type="model"
    :node-template-map="nodeTemplateMap"
    :link-template="linkTemplate"
    :config="config"
    :layout="layout"
    height="200px"
  >
    <xdh-go-html
      :before-show-menu="beforeShowMenu"
      :show-context-menu="showContextMenu"
      menu-name="tool3"
    >
      <xdh-go-tooltip ref="menu">
        <div class="menu-list">
          <div
            v-for="(item, idx) in list"
            class="item"
            :key="idx"
            @click="itemClick"
          >
            {{item.text}}
          </div>
        </div>
      </xdh-go-tooltip>
    </xdh-go-html>
  </xdh-go>
</template>
<script>
  import { XdhGo, XdhGoTooltip, XdhGoHtml } from 'xdh-go';
  export default {
    components: {
      XdhGo,
      XdhGoTooltip,
      XdhGoHtml
    },
    data() {
      return {
        list: [{ text: '编辑' }, { text: '删除' }],
        model: 'GraphLinksModel',
        showTimeout: null,
        nodes: [
          { key: 'A', category: 'a' },
          { key: 'B', category: 'b' },
          { key: 'C', category: 'c' }
        ],
        links: [{ from: 'A', to: 'B' }, { from: 'A', to: 'C' }]
      };
    },
    methods: {
      itemClick(txt) {
        this.$message({
          type: 'info',
          message: '点击了' + txt
        });
        this.$refs.menu.$el.style.display = 'none'
      },
      showContextMenu(obj, diagram, tool, menu) {
        if (this.showTimeout) {
          clearTimeout(this.showTimeout);
        }
        menu.style.display = 'block';
        let el = diagram.div;
        let offset = el.getBoundingClientRect();
        let point = diagram.transformDocToView(obj.actualBounds.center);
        menu.style.left = point.x + offset.left + 'px';
        menu.style.top = point.y + offset.top + 20 + 'px';
      },
      beforeShowMenu(obj, diagram, tool, menu) {
        if (this.list[2]) {
          this.list[2].text = obj.data.key;
        } else {
          this.list.push({
            text: obj.data.key
          });
        }
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center,
          'toolManager.hoverDelay': 100
        };
      },
      nodeTemplate(
        $,
        go,
        color,
        {
          htmlInfo: { tool3 }
        }
      ) {
        return $(
          go.Node,
          'Auto',
          { background: color, contextMenu: tool3 },
          $(
            go.TextBlock,
            'Default Text',
            { margin: 12, stroke: '#ffffff' },
            new go.Binding('text', 'key')
          )
        );
      },
      linkTemplate($, go) {
        return $(
          go.Link,
          { routing: go.Link.Orthogonal, corner: 5 },
          $(go.Shape, { strokeWidth: 3, stroke: '#555' })
        );
      },
      nodeTemplateMap($, go, vm) {
        const a = this.nodeTemplate($, go, 'red', vm);
        const b = this.nodeTemplate($, go, 'blue', vm);
        const c = this.nodeTemplate($, go, 'green', vm);
        const map = new go.Map();
        map.add('a', a);
        map.add('b', b);
        map.add('c', c);
        return map;
      },
      layout($, go) {
        return new go.TreeLayout();
      }
    }
  };
</script>
<style lang="scss" scoped>
  .menu-list {
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    .item {
      padding: 10px;
      width: 100px;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 255, 0.6);
      }
    }
  }
</style>
```

:::
