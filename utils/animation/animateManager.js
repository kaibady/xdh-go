import handleAnimation from './index'
class AnimateManager {
  constructor(diagram, go) {
    if (!diagram) {
      throw new Error('diagram对象为必须参数')
    }
    this.diagram = diagram
    if (!go) {
      throw new Error('gojs库为必须参数')
    }
    this.go = go
    this.customEvents = {}
  }
  off(event, target) {
    delete this.customEvents[event]
    if (target === 'all') {
      this.diagram.nodes.each(N => {
        if (N.data.animation && N.data.animation.length !== 0) {
          N.data.animation = N.data.animation.filter(ev => ev.trigger !== event)
        }
      })
    } else if (
      target instanceof Array ||
      typeof target === 'string' ||
      typeof target === 'number' ||
      target instanceof this.go.Node ||
      typeof target === 'object'
    ) {
      let nodes
      if (target instanceof Array) {
        nodes = target
      } else if (
        typeof target === 'string' ||
        typeof target === 'number' ||
        target instanceof this.go.Node ||
        typeof target === 'object'
      ) {
        nodes = [target]
      }
      nodes.forEach(elem => {
        let nodeData
        if (typeof elem === 'number' || typeof node === 'string') {
          nodeData = this.diagram.model.findNodeDataForKey(elem)
        } else if (elem instanceof this.go.Node) {
          nodeData = elem.data
        } else if (typeof elem === 'object') {
          nodeData = elem
        }
        if (nodeData.animation && nodeData.animation.length !== 0) {
          nodeData.animation = nodeData.animation.filter(
            ev => ev.trigger !== event
          )
        }
      })
    }
  }
  on(event, target, animation, isLink = false) {
    if (target === 'all') {
      this.customEvents[event] = animation
      let handleBinding = N => {
        let _animation
        this.off(event, N)
        if (N.data.animation) {
          _animation = N.data.animation
        } else {
          _animation = []
        }
        _animation.push(...animation)
        N.data.animation = _animation
      }
      if (isLink) {
        this.diagram.links.each(handleBinding)
      } else {
        this.diagram.nodes.each(handleBinding)
      }
    } else if (target instanceof Array) {
      target.forEach(elem => {
        let nodeData
        if (typeof elem === 'number' || typeof node === 'string') {
          nodeData = this.diagram.model.findNodeDataForKey(elem)
        } else if (
          elem instanceof this.go.Node ||
          elem instanceof this.go.Link
        ) {
          nodeData = elem.data
        } else if (typeof elem === 'object') {
          nodeData = elem
        }
        if (nodeData) {
          let _animation
          if (nodeData.animation) {
            _animation = nodeData.animation
          } else {
            _animation = []
          }
          _animation.push(...animation)
          nodeData.animation = _animation
        }
      })
    }
  }
  emit(event, target, afterFinish, isLink = false) {
    if (target === 'all') {
      let nodeCount
      let finishCount = 0
      let its
      if (isLink) {
        its = this.diagram.links
      } else {
        its = this.diagram.nodes
      }
      nodeCount = its.count
      its.each(N => {
        let animation = []
        if (N.data && N.data.animation) {
          animation = N.data.animation
        } else if (this.customEvents[event]) {
          animation = this.customEvents[event]
        }
        handleAnimation(
          null,
          N,
          event,
          {
            props: {
              animation: animation
            }
          },
          this.go,
          () => {
            finishCount++
            if (
              finishCount === nodeCount &&
              typeof afterFinish === 'function'
            ) {
              afterFinish()
            }
          }
        )
      })
    } else if (
      target instanceof Array ||
      typeof target === 'string' ||
      typeof target === 'number' ||
      target instanceof this.go.Node ||
      target instanceof this.go.Link ||
      typeof target === 'object'
    ) {
      let nodes
      if (target instanceof Array) {
        nodes = target
      } else if (
        typeof target === 'string' ||
        typeof target === 'number' ||
        target instanceof this.go.Node ||
        target instanceof this.go.Link ||
        typeof target === 'object'
      ) {
        nodes = [target]
      }
      let nodeCount = nodes.length
      let finishCount = 0
      nodes.forEach(elem => {
        let nodeData
        if (typeof elem === 'number' || typeof node === 'string') {
          nodeData = this.diagram.model.findNodeDataForKey(elem)
        } else if (
          elem instanceof this.go.Node ||
          elem instanceof this.go.Link
        ) {
          nodeData = elem.data
        } else if (typeof elem === 'object') {
          nodeData = elem
        }
        if (nodeData) {
          let animation = nodeData.animation || this.customEvents[event]

          let N
          if (nodeData.from && nodeData.to) {
            N = this.diagram
              .findLinksByExample({ from: nodeData.from, to: nodeData.to })
              .first()
          } else {
            N = this.diagram.findNodeForData(nodeData)
          }
          handleAnimation(
            null,
            N,
            event,
            {
              props: {
                animation: animation
              }
            },
            this.go,
            () => {
              finishCount++
              if (
                finishCount === nodeCount &&
                typeof afterFinish === 'function'
              ) {
                afterFinish()
              }
            }
          )
        }
      })
    }
  }
}
export default AnimateManager
