import Axios from "axios";
import Store from "../store/index";

export default {
  async getDays(params) {
    const response = await Axios.get(
      Store.state.api + process.env.VUE_APP_ROUTE_MONTH,
      { params }
    );
    return response.data;
  },
  async postDay(params) {
    const response = await Axios.post(
      Store.state.api + process.env.VUE_APP_ROUTE_MONTH,
      params
    );
    return response.data;
  },
  async updateDay(id, params) {
    const response = Axios.post(
      Store.state.api + process.env.VUE_APP_ROUTE_MONTH + `/${id}`,
      params
    );
    return response.data;
  },
  async uploadImage(id, params) {
    const response = await Axios.post(
      Store.state.api + process.env.VUE_APP_ROUTE_MONTH + `/image-upload/${id}`,
      params
    );
    return response.data;
  },
  async checkImage(url) {
    const response = await Axios.get(url);
    return response.data;
  },
};
