import axios from 'axios';


class API {

  async getSlot(token) {

    try {
      const response = await axios.get('/api/slot');

      return {"code": response.status, "data": response.data};

    } catch (error) {
      return {"code": error.response.status, "data": JSON.stringify(error.response.data)}
    }

  }


  async getAllData(token) {

    try {
      const response = await axios.get('/api/slots',
      {
        headers: {
          "Authorization": "Token " + token
        }
      });

      return {"code": response.status, "data": response.data};

    } catch (error) {
      return {"code": error.response.status, "data": JSON.stringify(error.response.data)}
    }

  }


  async CreateSlots(token, num) {

    try {
      const response = await axios.post('/api/slots/' + num.toString(), {}, 
      {
        headers: {
          "Authorization": "Token " + token
        },
      });

      return {"code": response.status, "data": response.data};

    } catch (error) {
      return {"code": error.response.status, "data": JSON.stringify(error.response.data)}
    }

  }

  async DeleteSlot(token, code) {

    try {
      const response = await axios.delete('/api/slots/' + code.toString(),
      {
        headers: {
          "Authorization": "Token " + token
        },
      });

      return {"code": response.status, "data": response.data};

    } catch (error) {
      return {"code": error.response.status, "data": JSON.stringify(error.response.data)}
    }

  }

}

export default API;