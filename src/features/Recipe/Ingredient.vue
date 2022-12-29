<template>
  <div class="ingredient" @click="$emit('ingredient-clicked', ingredient)">
    <mdi-cart-arrow-down title="Add to Shop List" class="cart-icon" />
    {{ amount }} {{ ingredient.measures.us.unitShort }} {{ ingredient.name }}
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";
import { IIngredient } from "src/stores";

const props = defineProps({
  ingredient: { type: Object as PropType<IIngredient>, required: true },
})
const amount = ref(0);
amount.value = Math.round(props.ingredient.measures.us.amount * 10) / 10;

</script>

<style lang="scss" scoped>
.ingredient {
  cursor: pointer;
  width: 180px;
  border: 1px solid #e9ecef;
  padding: 0.3rem;
  margin: 0.3rem;
  display: flex;
  align-items: center;
}

.cart-icon {
  color: #28a745;
  margin-right: 0.5rem;
  display: inline-block;
  font-weight: 900;
}
</style>
