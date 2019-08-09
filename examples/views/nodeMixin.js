export default {
  data() {
    return {
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
    config($, go) {
      return {
        initialContentAlignment: go.Spot.Center
      };
    },
    layout($, go) {
      return new go.TreeLayout();
    }
  }
};
