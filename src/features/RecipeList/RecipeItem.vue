<template>
  <router-link :to="`/recipe/${recipe.id}`" active-class="active">
    <div class="recipe-item">
      <img
        height="40"
        :src="`https://spoonacular.com/recipeImages/${recipe.id}-90x90.jpg`"
        :alt="recipe.title"
      />
      <div>
        {{ recipe.title }} <span>{{ recipe.readyInMinutes }} min.</span>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>

defineProps({ recipe: { type: Object, required: true } })
</script>


<style lang="scss" scoped>
.recipe-item {
  border: 1px solid #e9ecef;
  margin-bottom: 5px;
  padding: 0.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  /* @include media-breakpoint-down(lg) {
    //flex-direction: column;
  } */
  font-size: 0.9em;
  img {
    margin-right: 10px;
    border-radius: 5px;
  }
  span {
    display: block;
    font-size: 0.8em;
  }
}
</style>