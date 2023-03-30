import axios from 'axios';


class API {

  async AddDriver(token, name, plate) {

    try {
      const response = await axios.post('/api/driver/add', {
        "name": name,
        "plate": plate
      });

      return {"code": response.status, "data": response.data};

    } catch (error) {
      return {"code": error.response.status, "data": JSON.stringify(error.response.data)}
    }

  }


}

export default API;