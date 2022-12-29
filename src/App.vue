<template>
  <div class="bg-app">
    <div class="content">
      <with-error-handler>
        <Header />
        <RecipeList/>
        <RouterView></RouterView>
      </with-error-handler>
      <Likes />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "./components/Header.vue";
import Likes from "./features/Likes/Likes.vue";
import RecipeList from "./features/RecipeList/RecipeList.vue";

</script>

<style lang="scss">
body {
  color: #343a40;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.bg-app {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),
    url("@/assets/img/bg.jpg");
  background-size: cover;
  z-index: -2;
  padding: 20px;
  height: 100vh;
  /* @include media-breakpoint-down(md) {
    height: 100%;
    background-size: contain;
  } */
}

.content {
  border-radius: 5px;
  height: 95%;
  max-width: 1140px;
  padding: 1rem;
  padding-top: 1.5rem;
  margin: 0 auto;
  /* @include media-breakpoint-down(md) {
    height: auto;
  } */
  background-color: rgba(255, 255, 255, 0.8);
  display: grid;
  justify-items: stretch;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 70px 1fr;
  grid-template-areas:
    "api-stat search likes"
    "recipe-list recipe shop-list";
  /* @include media-breakpoint-down(md) {
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 70px;
    grid-template-areas:
      "search search likes"
      "recipe-list recipe recipe"
      "shop-list shop-list shop-list";
  } */
}

.apistat {
  grid-area: api-stat;
  color: orange;
  font-size: 0.7em;
  /* @include media-breakpoint-down(md) {
    display: none;
  } */
}
</style>