class DataManager {
  constructor(diagram, go, options) {
    this.diagram = diagram
    this.go = go
    this.nodeExist = {}
    this.linkExist = {}
    // 添加节点数据方法
    this.nodeConverter = {}
    this.linkConverter = {}
    // 重复数据合并方法
    this.nodeMergeFun = {}
    this.linkMergeFun = {}
    // 数据更新方法
    this.updateNodeFun = {}
    this.updateLinkFun = {}
  }
  getNode(node, isObject = false, isExample = false) {
    let key, nodeObj
    if (typeof node === 'string' || typeof node === 'number') {
      key = node
    } else if (node instanceof this.go.Node) {
      key = node.key
    } else if (typeof node === 'object' && node.key !== undefined) {
      key = node.key
    }
    if (typeof node === 'object' && isExample) {
      let nodeObjs = this.diagram.findNodesByExample(node)
      let nodeArr = []
      nodeObjs.each(N => {
        if (isObject) {
          nodeArr.push(N)
        } else {
          nodeArr.push(N.data)
        }
      })
      return nodeArr
    } else {
      nodeObj = this.diagram.findNodeForKey(key)
      if (nodeObj) {
        if (isObject) {
          return nodeObj
        } else {
          return nodeObj.data
        }
      }
    }
  }
  getLink(link, isObject, isByExample = false) {
    let linkObj
    console.log(link)
    if (typeof link === 'string' || typeof link === 'number') {
      let data = this.diagram.model.linkDataArray.find(k => k.key === link)
      if (data) {
        linkObj = this.diagram.findLinkForData(data)
      }
    } else if (link instanceof this.go.Link) {
      linkObj = link
    } else if (
      typeof link === 'object' &&
      link.key !== undefined &&
      !isByExample
    ) {
      let data = this.diagram.model.linkDataArray.find(k => k === link)
      if (data) {
        linkObj = this.diagram.findLinkForData(data)
      }
    }
    if (linkObj) {
      if (isObject) {
        return linkObj
      } else {
        return linkObj.data
      }
    } else if (typeof link === 'object' && isByExample) {
      let linkObjs = this.diagram.findLinksByExample(link)
      let linkArr = []
      linkObjs.each(L => {
        if (isObject) {
          linkArr.push(L)
        } else {
          linkArr.push(L.data)
        }
      })
      return linkArr
    }
  }
  setNodeConverter(name, fn, nodeMergeFun = data => data) {
    this.nodeConverter[name] = fn
    this.nodeMergeFun[name] = nodeMergeFun
  }
  setLinkConverter(name, fn, linkMergeFun = data => data) {
    this.linkConverter[name] = fn
    this.linkMergeFun[name] = linkMergeFun
  }
  addNode(data, name, options = {}) {
    let _options = Object.assign(
      {
        // 节点去重
        distinct: true,
        // 节点重复时的混合模式 replace/remain/merge
        duplicate: 'replace',
        mergeFun: ''
      },
      options
    )
    let nodeData = this.nodeConverter[name](data, _options)
    nodeData._originData = data
    if (nodeData.key === undefined) {
      throw new Error('节点数据必须定义key')
    }
    let exist = this.nodeExist[nodeData.key] ? true : false
    if (!exist) {
      this.diagram.model.addNodeData(nodeData)
      this.nodeExist[nodeData.key] = nodeData
    } else {
      if (!_options.distinct) {
        this.diagram.model.addNodeData(nodeData)
      } else {
        // 节点重复的处理方法
        if (_options.duplicate === 'replace') {
          let _data = this.diagram.model.findNodeDataForKey(nodeData.key)
          for (let i in nodeData) {
            if (i !== 'key') {
              this.diagram.model.set(_data, i, nodeData[i])
            }
          }
        } else if (_options.duplicate === 'merge') {
          let mergeFun
          if (_options.mergeFun) {
            mergeFun = this.nodeMergeFun[_options.mergeFun]
          } else {
            mergeFun = this.nodeMergeFun[name]
          }
          if (!mergeFun) {
            throw new Error('mergeFun数据合并方法未定义')
          }
          let _nodeData = mergeFun(
            this.nodeExist[nodeData.key],
            nodeData,
            this.go,
            this.diagram
          )
          if (_nodeData) {
            let _data = this.diagram.model.findNodeDataForKey(_nodeData.key)
            for (let i in _nodeData) {
              if (i !== 'key') {
                this.diagram.model.set(_data, i, _nodeData[i])
              }
            }
          }
        }
      }
    }
  }
  addLink(data, name, options = {}) {
    let _options = Object.assign(
      {
        // 连线去重
        distinct: true,
        // 连线数据重复时的混合模式 replace/remain/merge
        duplicate: 'replace',
        mergeFun: ''
      },
      options
    )
    let linkData = this.linkConverter[name](data, _options)
    linkData._originData = data
    let key = linkData.key || linkData.from + '_' + linkData.to
    let exist = false
    if (linkData.key && this.linkExist[key]) {
      exist = true
    }
    let duplicateLink
    for (let name in this.linkExist) {
      let findLink = this.linkExist[name]
      if (findLink.from === linkData.from && findLink.to === linkData.to) {
        duplicateLink = findLink
        exist = true
        break
      }
    }

    if (!exist) {
      this.diagram.model.addLinkData(linkData)
      this.linkExist[key] = linkData
    } else {
      if (!_options.distinct) {
        this.diagram.model.addLinkData(linkData)
      } else {
        // 节点重复的处理方法
        if (_options.duplicate === 'replace') {
          for (let i in linkData) {
            if (i !== 'key') {
              this.diagram.model.set(duplicateLink, i, linkData[i])
            }
          }
        } else if (_options.duplicate === 'merge') {
          let mergeFun
          if (_options.mergeFun) {
            mergeFun = this.linkMergeFun[_options.mergeFun]
          } else {
            mergeFun = this.linkMergeFun[name]
          }
          if (!mergeFun) {
            throw new Error('mergeFun数据合并方法未定义')
          }
          let _linkData = mergeFun(
            duplicateLink,
            linkData,
            this.go,
            this.diagram
          )
          if (_linkData) {
            for (let i in _linkData) {
              if (i !== 'key') {
                this.diagram.model.set(duplicateLink, i, _linkData[i])
              }
            }
          }
        }
      }
    }
  }
  removeNode(node, isByExample = false) {
    let nodeObj = this.getNode(node, true, isByExample)
    if (nodeObj instanceof Array) {
      nodeObj.forEach(N => {
        this.diagram.remove(N)
      })
    } else {
      this.diagram.remove(nodeObj)
    }
  }
  removeLink(link, isByExample = false) {
    let linkObj = this.getLink(link, true, isByExample)
    if (linkObj instanceof Array) {
      linkObj.forEach(N => {
        this.diagram.remove(N)
      })
    } else {
      this.diagram.remove(linkObj)
    }
  }
  setNodeUpdater(name, fn) {
    this.updateNodeFun[name] = fn
  }
  setLinkUpdater(name, fn) {
    this.updateLinkFun[name] = fn
  }
  updateNode(node, name, value, isOriginData = false, isByExample = false) {
    let nodeObj = this.getNode(node, false, isByExample)
    if (nodeObj instanceof Array) {
      if (!isOriginData) {
        nodeObj.forEach(N => {
          this.diagram.model.set(N, name, value)
        })
      } else {
        nodeObj.forEach(N => {
          N._originData[name] = value
          this.updateNodeFun[name](N, value, this.diagram.model, this.diagram)
        })
      }
    } else {
      if (!isOriginData) {
        this.diagram.model.set(nodeObj, name, value)
      } else {
        nodeObj._originData[name] = value
        this.updateNodeFun[name](
          nodeObj,
          value,
          this.diagram.model,
          this.diagram
        )
      }
    }
  }
  updateLink(link, name, value, isOriginData = false, isByExample = false) {
    let linkObj = this.getLink(link, false, isByExample)
    if (linkObj instanceof Array) {
      if (!isOriginData) {
        linkObj.forEach(N => {
          this.diagram.model.set(N, name, value)
        })
      } else {
        linkObj.forEach(N => {
          N._originData[name] = value
          this.updateLinkFun[name](N, value, this.diagram.model, this.diagram)
        })
      }
    } else {
      if (!isOriginData) {
        this.diagram.model.set(linkObj, name, value)
      } else {
        linkObj._originData[name] = value
        this.updateLinkFun[name](
          linkObj,
          value,
          this.diagram.model,
          this.diagram
        )
      }
    }
  }

  clear() {
    this.nodeExist = {}
    this.linkExist = {}
    this.diagram.clear()
  }
}

export default DataManager
