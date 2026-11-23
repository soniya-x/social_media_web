"use client";

import { Provider } from "react-redux";
import { store } from "$domains/application";
import { StoreProviderProps } from "$domains/application";

export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
