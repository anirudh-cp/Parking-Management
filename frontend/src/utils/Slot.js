import { useState } from "react";

import API from "../API/Slot";
import useUserStore from "../storages/AuthStore";


export default function useSlot() {

    const [loading, setLoading] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const apiObject = new API();
    const { token } = useUserStore();

    return {

        loading, loadingAdd, loadingDelete, 
        
        async getSlot() {
            setLoading(true);
            const response = await apiObject.getSlot(token);
            setLoading(false);

            return response;
        },


        async getAllData() {
            setLoading(true);
            const response = await apiObject.getAllData(token);
            setLoading(false);

            return response;
        },


        async createSlots(num) {
            setLoadingAdd(true);
            const response = await apiObject.CreateSlots(token, num);
            setLoadingAdd(false);

            return response;
        },


        async deleteSlot(code) {
            setLoadingDelete(true);
            const response = await apiObject.DeleteSlot(token, code);
            setLoadingDelete(false);
            return response;
        },

    };
}
