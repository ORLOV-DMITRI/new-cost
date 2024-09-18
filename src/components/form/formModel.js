import { api } from "../../constants.js";

export const formModel = {
    apiEndpoint: api.add,
    data: {},
    
    setData(data) {
        this.data = { ...data };
    },
    getData() {
        return this.data;
    },
};
