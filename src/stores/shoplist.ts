import { defineStore } from "pinia";

export interface IShopItem {
  id?: number;
  name: string;
  unit: string;
  amount: number;
}

export interface IPropsCustomItems {
  items: IShopItem[];
  removeCustomItem: (index: number) => void;
}

export interface ICustomAddFormProps {
  isShown: boolean;
  onAdd: (item: IShopItem) => void;
  onClose: () => void;
}

export type TShopListState = { list: IShopItem[] };

const state = (): TShopListState => ({ list: [] });

export const useShoplistStore = defineStore("shoplist", {
  state,
  actions: {
    addItem(shopItemArg: IShopItem) {
      const shopItem = Object.assign<IShopItem, IShopItem>({} as IShopItem, { ...shopItemArg, amount: Math.round(shopItemArg.amount * 10) / 10 });
      const existsItemIndex = this.list.findIndex(
        (item) => item.id === shopItem.id && item.unit === shopItem.unit
      );
      let newState: IShopItem[];
      if (existsItemIndex !== -1) {
        newState = this.list.map((item, index) => {
          if (index === existsItemIndex) {
            const amount = Math.round((item.amount + shopItem.amount) * 10) / 10;
            return { ...item, amount };
          }
          return item;
        });
      } else {
        newState = [...this.list, shopItem];
      }
      this.list = newState
    },
    updateItem(shopItem: IShopItem, newAmount: number) {
      const existsItemIndex = this.list.findIndex(
        (item) => item.id === shopItem.id && item.unit === shopItem.unit
      );

      const updatedItem = { ...shopItem, amount: newAmount };

      // const newState = state.map((item, index) => {
      //   if (index === existsItemIndex) {
      //     return { ...item, amount: newAmount };
      //   }
      //   return item;
      // });
      this.list[existsItemIndex] = updatedItem
    },
    removeItem(shopItem: IShopItem) {
      const existsItemIndex = this.list.findIndex((item) => item.id === shopItem.id);
      this.list.splice(existsItemIndex, 1)
    },
  }
})