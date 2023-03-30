import { useState } from "react";

import API from "../API/Book";
import useUserStore from "../storages/AuthStore";


export default function useBook() {

    const [loadingBook, setLoadingBook] = useState(false);

    const apiObject = new API();
    const { token } = useUserStore();

    return {

        loadingBook,

        async checkIn(code, driver, type) {
            setLoadingBook(true);
            const response = await apiObject.Checkin(token,
                {
                    "code": code,
                    "driver": driver,
                    "type": type,
                    "time": new Date().toISOString()
                }
            );
            setLoadingBook(false);

            return response;
        },


        async confirm(code, driver, type) {
            setLoadingBook(true);
            const response = await apiObject.Confirm(token,
                {
                    "code": code,
                    "driver": driver,
                    "type": type,
                    "time": new Date().toISOString()
                }
            );
            setLoadingBook(false);

            return response;
        },

        async checkout(code) {
            setLoadingBook(true);
            const response = await apiObject.Checkin(token, code);
            setLoadingBook(false);

            return response;
        },




    };
}
