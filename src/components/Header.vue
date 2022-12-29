<template>
  <header class="header">
    <img src="../assets/img/logo.png" alt="Recipe-App" className="logo" />
    <div className="title  d-none d-lg-block">RecipiesApp</div>
    <SearchForm />
    <a
      class="text-success ml-3 mt-2"
      href="https://github.com/pylnata/recipies-app"
      title="Star on GitHub"
    >
      <mdi-github />
    </a>
  </header>
</template>

<script lang="ts" setup>
import SearchForm from "src/features/SearchForm/SearchForm.vue";

</script>


<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Dancing+Script&display=swap");

header {
  grid-area: search;
  .logo {
    width: 32px;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .title {
    font-family: "Dancing Script", cursive;
    font-size: 1.7em;
    font-weight: 500;
    display: inline-block;
    margin: -3px 0 0 5px;
  }
}
</style>
