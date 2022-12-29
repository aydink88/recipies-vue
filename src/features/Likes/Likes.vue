<template>
  <div class="likes">
    <div class="like-btn" @click="toggle">
      <span class="like-btn-svg">
        <mdi-heart />{{ likes.length }}
      </span>
    </div>
    <div v-if="isOpen" class="like-list">
      <div>
        <div v-if="likes.length" v-for="item in likes" :key="item.id" class="like-item">
          <router-link :to="`/recipe/${item.id}`">
            <img :src="`https://spoonacular.com/recipeImages/${item.id}-90x90.jpg`" height="40" :alt="item.title" />{{
                item.title.length > 30 ? item.title.slice(0, 30) + '...' : item.title
            }}
          </router-link>
          <span class="like-list__remove" @click="removeLike(item.id)">
            <mdi-trash />
          </span>
        </div>
        <span v-else>You haven't favourite recipies yet</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLikesStore } from '../../stores/likes';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const isOpen = ref(false);
const likesStore = useLikesStore();
const { likes } = storeToRefs(likesStore)
const removeLike = (id: number) => {
  likesStore.removeLike(id);
  isOpen.value = false;
};
const toggle = () => (isOpen.value = !isOpen.value);


</script>

<style lang="scss" scoped>
.likes {
  grid-area: likes;
  justify-self: right;
  padding: 1rem;
  margin-right: 1rem;
  position: relative;
}

.like-btn {
  color: #dc3545;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  padding: 7px;
  width: max-content;

  &:hover {
    background: #dc3545;

    .like-btn-svg {
      color: #fff;
    }
  }
}

.like-list {
  font-size: 0.8em;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  position: absolute;
  right: 0;
  top: 50px;
  box-shadow: 3px 3px 5px 3px #ced4da;

  div {
    padding: 15px;
    border: 1px solid #dee2e6;
    background-color: #fff;

    a,
    a:active,
    a:visited {
      color: #343a40;
    }

    a:hover {
      color: #28a745;
    }
  }

  &__remove {
    color: #6c757d;
    cursor: pointer;

    &:hover {
      color: #ced4da;
    }
  }
}

.like-item {
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;

  a,
  a:active,
  a:visited {
    color: #343a40;
    display: flex;
    align-items: center;
    text-decoration: none;
    background-color: transparent;
    margin-right: 0.5rem;
    line-clamp: 1;

    img {
      margin-right: 0.3rem;
      border-radius: 4px;
    }
  }
}
</style>
