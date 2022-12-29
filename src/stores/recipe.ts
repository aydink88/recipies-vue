import { defineStore } from 'pinia';
import * as api from 'src/service/api'

export interface IIngredient {
  id: number;
  name: string;
  measures: { us: { unitShort: string; amount: number } };
}

export interface IInstructions {
  steps: Array<{ number: string; step: string }>;
}
export interface IRecipe {
  id: number;
  title: string;
  analyzedInstructions: Array<IInstructions>;
  readyInMinutes: number;
  image: string;
  preparationMinutes: number;
  servings: string;
  diets: Array<string>;
  extendedIngredients: Array<IIngredient>;
}

export interface IRecipeState {
  isLoading: boolean;
  data: IRecipe | null;
  error: { message: string } | null;
}

export const useRecipeStore = defineStore("recipe", {
  state: (): IRecipeState => ({
    isLoading: false,
    data: null,
    error: null,
  }),
  actions: {
    getRecipe: async function (id: number) {
      this.error = null;
      this.isLoading = true;
      try {
        const { data } = (await api.getRecipe(id)) as { data: IRecipe };
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
    }
  }
})