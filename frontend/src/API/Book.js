import axios from 'axios';


class API {

  async Checkin(token, body) {

    try {
      const response = await axios.post('/api/book', body);

      return {"code": response.status, "data": response.data};

    } catch (error) {
      return {"code": error.response.status, "data": JSON.stringify(error.response.data)}
    }

  }

  async Confirm(token, body) {

    try {
      const response = await axios.put('/api/book', body);

      return {"code": response.status, "data": response.data};

    } catch (error) {
      return {"code": error.response.status, "data": JSON.stringify(error.response.data)}
    }

  }

  async Checkout(token, code) {

    try {
      const response = await axios.delete('/api/book/' +  code.toString());

      return {"code": response.status, "data": response.data};

    } catch (error) {
      return {"code": error.response.status, "data": JSON.stringify(error.response.data)}
    }

  }

}

export default API;