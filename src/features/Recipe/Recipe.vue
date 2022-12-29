<template>
  <div class="recipe" v-loading="isLoading">
    <div v-if="error">{{ error.message }}</div>
    <div v-if="data">
      <div class="recipe__title">
        <h4>{{ data.title }}</h4>
        <LikeButton :recipe="data" />
      </div>
      <div class="recipe__body">
        <div class="recipe__body-child">
          <img class="main-img" :src="data.image" :alt="data.title" />
          <div>
            <ul class="list-unstyled">
              <li>
                Servings: <strong>{{ data.servings }}</strong>
              </li>
              <li>
                Preparation time:
                <strong>{{ data.readyInMinutes }}</strong> min
              </li>
              <li>
                Cooking time: <strong>{{ data.readyInMinutes }}</strong> min
              </li>
            </ul>
            <el-tag class="badge" v-for="value in data.diets" :key="value">{{
                value
            }}</el-tag>
          </div>
        </div>
        <div class="instructions">
          <span id="togglelink" class="toggler" @click="seeInstructions = !seeInstructions">See instructions</span>
          <div class="collapse" v-if="seeInstructions">
            <ol>
              <li v-for="item in data.analyzedInstructions[0].steps" :key="item.number">
                {{ item.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <Ingredients v-if="data" :ingredients="data.extendedIngredients" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRecipeStore } from "src/stores";
import { toRefs, ref, watch } from "vue";
import LikeButton from "../Likes/LikeButton.vue";
import Ingredients from "./Ingredients.vue";

const props = defineProps({ recipe_id: { type: String, default: "651956" } })
const recipeStore = useRecipeStore();
const { recipe_id } = toRefs(props);
if (recipe_id.value) {
  (async () => await recipeStore.getRecipe(Number(recipe_id.value)))();
}

const { data, isLoading, error } = storeToRefs(recipeStore);

watch(
  () => recipe_id.value,
  async () => await recipeStore.getRecipe(Number(recipe_id.value))
);
const seeInstructions = ref(false);


</script>

<style lang="scss" scoped>
.recipe {
  grid-area: recipe;
  overflow-y: auto;
  font-size: 0.9em;
  border-radius: 5px;
  padding: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  background-color: #fff;

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 0;

    h4 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    &-child {
      display: flex;
      align-items: flex-start;
      flex-direction: row;
      margin-bottom: 1rem;

      img {
        margin-right: 1rem;
        margin-bottom: 0.5rem;
        border-style: none;
      }
    }
  }

  .instructions {
    padding: 1rem;
    align-self: flex-start;
  }

  .list-unstyled {
    list-style: none;
    padding-left: 0;
    margin-bottom: 1rem;
  }

  .badge {
    background-color: #adb5bd;
    color: #fff;
    margin-right: 0.3rem;
    padding: 0.1rem 0.4rem;
  }

  .main-img {
    width: 30%;
    max-width: 500px;
    border-radius: 5px;
    /* @include media-breakpoint-down(md) {
      width: 100%;
    } */
  }

  .toggler {
    border-bottom: 1px dashed #333;
    cursor: pointer;
  }

  ol {
    margin: 0.5rem 0;
    padding: 0.5rem;

    li {
      margin-bottom: 5px;
      font-size: 0.9rem;
    }
  }
}
</style>
