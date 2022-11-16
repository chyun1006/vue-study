<template>
  <div>
    <Card :title="title" style="width: 300px">
      <a slot="extra" href="#">more</a>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
      <template slot="actions">
          action
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/Jsx/card/card";
export default {
  data() {
    return {
      title: "card title",
    };
  },
  components: {Card },
  mounted() {},
};
</script>

<style></style>
