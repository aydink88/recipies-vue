<template>
  <form class="search-form">
    <el-input placeholder="ex. pizza" v-model="searchTerm">
      <template #suffix>
        <i class="el-input__icon el-icon-search"></i>
      </template>
    </el-input>
  </form>
</template>

<script lang="ts" setup>
import { useRecipeListStore } from "../../stores";
import { onBeforeUnmount, ref, watch } from "vue";

const recipeListStore = useRecipeListStore();
const searchTerm = ref("");
let timeOut: number;

const getRecipes = () => {
  if (timeOut) clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    if (searchTerm.value.length > 2) {
      console.log("searching recipes");
      recipeListStore.searchRecipes(
        searchTerm.value,
        0,
      );
      recipeListStore.setSearchTerm(searchTerm.value);
    }
  }, 1000);
};

watch(searchTerm, () => {
  getRecipes();
});

onBeforeUnmount(() => {
  if (timeOut) clearTimeout(timeOut);
});

</script>

<style lang="scss" scoped>
.search-form {
  display: inline-block;
}
</style>