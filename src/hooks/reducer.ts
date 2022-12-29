import { readonly, ref } from 'vue';

type IReducer<T, U> = (state: T, action: U) => T;

export function useReducer<T, U>(reducer: IReducer<T, U>, initialArg?: T, init?: Function) {
  const state = ref(init ? init(initialArg) : initialArg);
  const dispatch = (action: U) => {
    state.value = reducer(state.value, action);
  };

  return [readonly(state), dispatch];
}
