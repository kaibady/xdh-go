import handleAnimation from './index';
class AnimateManager {
  constructor(diagram, go) {
    this.diagram = diagram;
    this.go = go;
    this.customEvents = {};
  }
  on(event, animation) {
    this.customEvents[event] = animation;
  }
  emit(event, node, afterFinish) {
    if (node === 'all') {
      let nodeCount = this.diagram.nodes.count;
      let finishCount = 0;
      this.diagram.nodes.each(N => {
        let animation = [];
        if (N.data && N.data.animation) {
          animation = N.data.animation;
        } else if (this.customEvents[event]) {
          animation = this.customEvents[event];
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
            finishCount++;
            if (
              finishCount === nodeCount &&
              typeof afterFinish === 'function'
            ) {
              afterFinish();
            }
          }
        );
      });
    } else if (node) {
      let animation = node.data.animation || this.customEvents[event] || [];
      handleAnimation(
        null,
        node,
        event,
        {
          props: {
            animation: animation
          }
        },
        this.go,
        afterFinish
      );
    }
  }
}
export default AnimateManager;
