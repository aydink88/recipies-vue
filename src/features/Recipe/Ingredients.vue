<template>
  <div class="recipe-ings">
    <Ingredient v-for="(ingredient, index) in props.ingredients" :key="index"
      @ingredient-clicked="onClickHandler(ingredient)" :ingredient="ingredient" />
    {{ shoplist }}
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { IIngredient, useShoplistStore } from "src/stores";
import Ingredient from "./Ingredient.vue";
import { storeToRefs } from "pinia";

const props = defineProps({ ingredients: { type: Object as PropType<IIngredient[]> } })

const shopListStore = useShoplistStore();
const { list: shoplist } = storeToRefs(shopListStore)
const onClickHandler = (item: IIngredient) => {
  const shopItem = {
    id: item.id,
    name: item.name,
    unit: item.measures.us.unitShort,
    amount: item.measures.us.amount,
  };
  shopListStore.addItem(shopItem);
};

</script>


<style lang="scss" scoped>
.recipe-ings {
  font-size: 0.9em;
  display: flex;
  flex-wrap: wrap;
}
</style>