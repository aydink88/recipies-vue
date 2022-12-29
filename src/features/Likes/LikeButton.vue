<template>
  <span class="liked-btn" @click="onLikeClickHandler" :title="liked ? 'Remove from favorites' : 'Add to favorites'">
    <mdi-heart v-if="liked" />
    <mdi-heart-outline v-else />
  </span>
</template>

<script lang="ts" setup>
import { useLikesStore, IItem } from 'src/stores';
import { PropType, computed, toRefs } from 'vue';
const props = defineProps({ recipe: { type: Object as PropType<IItem>, required: true } })

const likesStore = useLikesStore();
const { recipe } = toRefs(props);
const liked = computed(
  () => likesStore.likes.findIndex((item) => item.id === recipe.value.id) !== -1
);
const onLikeClickHandler = () => {
  if (liked.value) {
    console.log(recipe.value.id);
    likesStore.removeLike(recipe.value.id);
  } else {
    likesStore.addLike({
      id: recipe.value.id,
      title: recipe.value.title,
    });
  }
};

</script>

<style lang="scss" scoped>
.liked-btn {
  border: none;
  padding: 0;
  appearance: none;
  cursor: pointer;
  color: red;
  font-size: 1.5rem;

  &:focus {
    outline: none;
  }
}
</style>
