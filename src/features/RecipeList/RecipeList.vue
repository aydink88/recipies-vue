<template>
  <div class="recipies" v-loading="isLoading">
    <div v-if="error">{{ error.message }}</div>
    <div v-else class="recipies__list">
      <RecipeItem v-for="item in data?.results" :key="item.id" :recipe="item" />
    </div>
    <Paging @page-changed="(page: string) => onPageClickHandler(page)" :totalResults="totalResults"
      :offset="data ? Number(data.offset) : 0" :cntOnPage="COUNT_RECIPIES_ON_PAGE" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef } from "vue";
import { useRecipeListStore } from "src/stores";
import Paging from "./Paging.vue";
import RecipeItem from "./RecipeItem.vue";
import { COUNT_RECIPIES_ON_PAGE } from "../../config";
import { storeToRefs } from "pinia";

const recipeListStore = useRecipeListStore();
recipeListStore.searchRecipes(
  "pizza",
  0,
);
const { data, isLoading, error, searchTerm } = storeToRefs(recipeListStore)


const onPageClickHandler = (page: string) => {
  console.log(page);
  if (page === "next") {
    recipeListStore.searchRecipes(
      searchTerm.value,
      data
        ? Number(data.value!.offset) + COUNT_RECIPIES_ON_PAGE
        : 0
    );
  } else if (page === "prev") {
    recipeListStore.searchRecipes(
      searchTerm.value, data
      ? Number(data.value!.offset) - COUNT_RECIPIES_ON_PAGE
      : 0
    );
  }
};
//const totalResults = computed(() => data!.value!.results!.length);

const totalResults = computed(() => {
  if (data?.value?.results) {
    return Number(data!.value!.totalResults) < data!.value!.results!.length
      ? data!.value!.results!.length
      : Number(data!.value!.totalResults);
  }
}) as ComputedRef<number>;

</script>

<style lang="scss">
.recipies {
  grid-area: recipe-list;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__list {
    /* @include media-breakpoint-down(md) {
      max-height: 500px;
      margin-bottom: 10px;
    } */
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 98%;

    a,
    a:active,
    a:visited {
      text-decoration: none;
      color: #343a40;

      &.active {
        .recipe-item {
          background: rgba(255, 255, 255, 0.5);
        }
      }
    }

    a:hover {
      color: #28a745;
    }
  }
}
</style>
