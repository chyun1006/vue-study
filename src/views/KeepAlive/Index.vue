<template>
  <div>
    <div>
      <button
        @click="changeCom(index + 1)"
        v-for="(com, index) in components"
        :key="index"
      >
        com{{ index }}
      </button>
    </div>
    <keep-alive>
      <component :is="currCom"></component>
    </keep-alive>
  </div>
</template>

<script>
const com1 = {
  data() {
    return {
      color: 'red',
    }
  },
  render: function(createElement) {
    return createElement(
      'a',
      {
        style: {
          color: this.color,
        },
        on: {
          click: this.changeColor,
        },
      },
      'click11'
    )
  },
  mounted() {
    console.log(11)
    this.color = 'pink'
  },
  methods: {
    changeColor() {
      this.color = 'green'
    },
  },
}

const com2 = {
  render: function(createElement) {
    return createElement('a', 'click22')
  },
}

const com3 = {
  render: function(createElement) {
    return createElement('a', 'click33')
  },
}

export default {
  data() {
    return {
      currCom: com1,
      components: [11, 22, 33],
    }
  },
  components: {
    com1,
    com2,
    com3,
  },

  methods: {
    changeCom(com) {
      this.currCom = 'com' + com
    },
  },
}
</script>

<style></style>
