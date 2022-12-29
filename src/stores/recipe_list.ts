import { defineStore } from "pinia";
import * as api from 'src/service/api'

interface IRecipe {
  id: number;
  title: string;
  readyInMinutes: number;
}

export interface IData {
  results?: Array<IRecipe>;
  totalResults?: number;
  offset?: number;
}

export interface IRecipeListState {
  isLoading?: boolean;
  error?: { message: string } | null;
  data?: IData;
  searchTerm: string;
}

export const useRecipeListStore = defineStore("recipe_list", {
  state: (): IRecipeListState => ({
    isLoading: false,
    data: { totalResults: 0 },
    error: null,
    searchTerm: "pizza",
  }),
  actions: {
    searchRecipes: async function (searchTerm: string, offset: number) {
      this.error = null;
      this.isLoading = true;
      const st = searchTerm ? searchTerm : "pizza";
      const os = offset ? offset : 0;
      try {
        const { data } = (await api.getSearchResults(st, os)) as {
          data: IData;
        };
        if (data) {
          this.error = null;
          this.isLoading = false;
          this.data = data;
        }
      } catch (error: any) {
        console.log(error);
        this.isLoading = false;
        this.error = error;
      }
    },
    setSearchTerm(term: string) {
      this.searchTerm = term;
    }
  }
})