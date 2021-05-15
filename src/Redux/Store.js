import { createStore } from "redux";
import { editUrl } from "./Reducer";
const Store = createStore(
  editUrl,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default Store;
