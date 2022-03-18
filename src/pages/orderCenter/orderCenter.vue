<template>
  <nut-tabs v-model="orderState" type="smile">
    <nut-tabpane title="全部" pane-key="">
      全部
    </nut-tabpane>
    <nut-tabpane title="进行中">
      进行中
    </nut-tabpane>
    <nut-tabpane title="已完成">
      已完成
    </nut-tabpane>
    <nut-tabpane title="已取消">
      已取消
    </nut-tabpane>
  </nut-tabs>
</template>
<script setup>
  import { ref } from 'vue'

  const orderState = ref('')
</script>
<style lang="scss"></style>
