<script>
export default {
  render: function(createElement) {
    console.log('---', this)
    return createElement(
      'div',
      {
        class: 'a-color',
        style: {
          fontSize: '20px',
        },
      },
      [createElement('a', { on: { click: this.clickHandle } }, this.title)]
    )
  },
  props: {
    title: {
      type: String,
      default: 'click',
    },
  },
  methods: {
    clickHandle() {
      alert(1)
    },
  },
}
</script>
<style lang="less" scoped>
.a-color {
  color: red;
}
</style>
