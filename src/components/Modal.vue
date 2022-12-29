<template>
  <el-dialog
    title="Tips"
    v-model="show"
    width="70%"
    :before-close="modalClosed"
  >
    <span><slot /></span>
  </el-dialog>
</template>

<script lang="ts" setup>
defineProps({ show: { type: Boolean }, modalClosed: { type: Function } })
</script>


<style lang="scss" scoped>
</style>