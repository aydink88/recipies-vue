<template>
  <Modal :show="error ? true : false" :modalClosed="clearError">
    {{ error ? error.message : null }}
  </Modal>
  <div class="apistat" :title="title">
    {{
        Number(usedCallsDisplay) > 0
          ? `Api: ${usedCallsDisplay} of 150 used`
          : `Fake data is used now`
    }}
  </div>
  <slot />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import useHttpErrorHandler from "src/hooks/httpErrorHandler";
import axios from "src/axios-recipies";
import Modal from "src/components/Modal.vue";

const title = ref("");
const [error, clearError, usedCalls] = useHttpErrorHandler(axios);

const usedCallsDisplay = ref(Number(usedCalls).toFixed(2));
title.value =
  Number(usedCallsDisplay) > 0
    ? "shows how many calls used of day's limit at api https://spoonacular.com"
    : "";
</script>

<style lang="scss">
</style>
