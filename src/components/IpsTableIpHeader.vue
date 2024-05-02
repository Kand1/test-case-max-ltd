<script setup lang="ts">
const props = defineProps({
  shouldRenderDeleteButton: Boolean
})

</script>

<template>
<div class="container">
  <div>IP2</div>
  <el-button
      v-show="shouldRenderDeleteButton"
      type="danger"
  >
    Удалить выбранные
  </el-button>
</div>
</template>

<style scoped>
.container {
  display: flex;

  align-items: center;

  justify-content: space-between;
}
</style>