<template>
  <div>
    <p>
      v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件
    </p>
    <ul>
      <li>
        text 和 textarea 元素使用 value property 和 input 事件；
      </li>
      <li>
        checkbox 和 radio 使用 checked property 和 change 事件；
      </li>
      <li>
        select 字段将 value 作为 prop 并将 change 作为事件。
      </li>
      <li>
        model 选项可以避免这样的冲突
      </li>
    </ul>

    {{ price }}
    <div>v-model:<input type="text" v-model="price" /></div>

    <div>
      input value+input
      <input type="text" :value="price" @input="price = $event.target.value" />
    </div>

    <div>组件<MyInput v-model="price"></MyInput></div>

    <div>
      组件checkbox
      <my-checkbox v-model="checked"></my-checkbox>{{ checked }}
    </div>
  </div>
</template>
<script>
import MyInput from '@/components/VModel/MyInput'
import MyCheckbox from '@/components/VModel/MyCheckbox'

export default {
  data() {
    return {
      price: 0,
      checked: false,
    }
  },
  components: { MyInput, MyCheckbox },
  methods: {
    onInput(value) {
      this.price = value
    },
  },
}
</script>
<style scoped></style>
