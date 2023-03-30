import { useState } from "react";

import API from "../API/Driver";
import useUserStore from "../storages/AuthStore";


export default function useDriver() {

  const [loading, setLoading] = useState(false);

  const apiObject = new API();
  const { token, setName, setPlate } = useUserStore();

  return {

    loading,

    async driverAdd(name, plate) {
      setLoading(true);
      const response = await apiObject.AddDriver(token, name, plate);
      setLoading(false);

      if (response['code'] === 200 || response['code'] === 201)
      {
        setName(name);
        setPlate(plate);
      }

      return response;
    },

  };
}
