<template>
  <div class="paging">
    <span v-if="offset > 0" class="page" title="Previous page" @click="changePage('prev')">
      <mdi-arrow-left class="page" />
    </span>
    <span v-else class="page page--noactive" title="Previous page" @click="changePage('prev')">
      <mdi-arrow-left class="page" />
    </span>
    <span v-if="offset <= totalResults - cntOnPage" class="page" title="Next page" @click="changePage('next')">
      <mdi-arrow-right class="page" />
    </span>
    <span v-else class="page page--noactive" title="Next page" @click="changePage('next')">
      <mdi-arrow-right class="page" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { PropType, toRefs } from "vue";

const props = defineProps({
  offset: { type: Number, default: 0 },
  totalResults: { type: Number, required: true },
  pageChangedHandler: { type: Function as PropType<(page: string) => void> },
  cntOnPage: { type: Number, required: true },
})
const emit = defineEmits<{
  (e: 'page-changed', id: string): void
}>()
const { offset, totalResults, pageChangedHandler, cntOnPage } = toRefs(props)

const changePage = (page: string) => {
  emit("page-changed", page);
};

</script>

<style lang="scss" scoped>
.paging {
  text-align: center;
  margin-top: 1rem;
}

.page {
  font-size: 1.5em;
  cursor: pointer;
  font-weight: 900;

  &:hover {
    color: #28a745;
  }

  &--noactive {
    cursor: initial;
    color: #adb5bd;

    &:hover {
      color: #adb5bd;
    }
  }
}
</style>
