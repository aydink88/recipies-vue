import { defineStore } from 'pinia';

export interface IItem {
  id: number;
  title: string;
}

export type TLikesState = {likes: IItem[]};

export const useLikesStore = defineStore('likes', {
  state: (): TLikesState => ({likes: []}),
  actions: {
    addLike(payload: IItem) {
      if (this.likes.findIndex((item) => item.id === payload.id) === -1) {
        this.likes.push(payload);
      }
    },
    removeLike(payloadId: number) {
      const itemIndex = this.likes.findIndex((item) => item.id === payloadId);
      if (itemIndex !== -1) {
        this.likes.splice(payloadId, 1);
      }
    },
  },
});
