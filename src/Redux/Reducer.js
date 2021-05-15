import { today, earlier } from "../utils/dateFormater";
const baseUrl = `https://api.covid19api.com/world?from=${earlier(
  15
)}T00:00:00Z&to=${today()}T00:00:00Z`;
const Linkstate = {
  country: undefined,
  period: undefined,
  url: baseUrl,
};
const editUrl = (state = Linkstate, action) => {
  switch (action.type) {
    case "EDIT":
      return action.payload.data;
    default:
      return state;
  }
};
export { editUrl };
