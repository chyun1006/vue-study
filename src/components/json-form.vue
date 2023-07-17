<template>
  <div>
    <el-form
      :label-position="labelPosition"
      :model="modelForm"
      :rules="rules"
      ref="modelForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item v-bind="com.formItem" :label="com.label" :prop="com.prop" v-for="com in config" :key="com.field">
        <el-select v-bind="com.attrs" v-if="com.type == 'el-select'" v-model="com.modelValue">
          <el-option v-for="item in com.options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-radio-group v-bind="com.attrs" v-else-if="com.type == 'el-radio'" v-model="com.modelValue">
          <el-radio v-for="item in com.options" :key="item.value" :label="item.label" :value="item.value"> </el-radio>
        </el-radio-group>
        <el-checkbox-group v-model="com.modelValue"  v-bind="com.attrs" v-else-if="com.type == 'el-checkbox'">
            <el-checkbox v-for="item in com.options" :key="item.value" :label="item.label" >{{item.label}}</el-checkbox>
        </el-checkbox-group>
        <component v-else v-bind="com.attrs" v-model="com.modelValue" :is="com.type"></component>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    config: Array,
    labelPosition: {
      type: String,
      default: "right",
    },
  },
  computed: {
    modelForm() {
      let form = {};
      this.config.map(item => {
        form[item.prop] = item.modelValue;
      });
      return form;
    },
    rules() {
      let rules = {};
      this.config.map(item => {
        const rules = item.formItem?.rules || [];
        rules[item.prop] = rules;
      });
      return rules;
    },
  },
  methods: {
    submitForm() {
      this.$refs["modelForm"].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
