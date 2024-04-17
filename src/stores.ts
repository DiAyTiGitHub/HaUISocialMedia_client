import AuthStore from "./components/Auth/AuthStore";
import ChatStore from "./components/ChatV2/ChatStore";
import RelationshipStore from "./components/Relationship/RelationshipStore";
import { createContext, useContext } from "react";

export const stores = {
  chatStore: new ChatStore(),
  authStore: new AuthStore(),
  relationshipStore: new RelationshipStore(),
};

export const StoreContext = createContext(stores);

export function useStore() {
  return useContext(StoreContext);
}
