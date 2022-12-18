import axios from 'axios';
import { qs } from 'app.modules/util/qs';

const axiosClient = axios.create();

export const request: any = async ({ method, url, data = null }) => {
  try {
    const res: any = await axiosClient({ method, url, data });
    if (res.data.error) throw res.data.error;
    return res;
  } catch (error) {
    return { ...error.response };
  }
};

class API {
  async CALL({ method, url, data = null }) {
    return request({ method, url, data });
  }

  GET({ url, ...params }) {
    return this.CALL({
      method: 'GET',
      url: url + qs.stringURL(params.data, url),
      ...params,
    });
  }

  POST({ url, ...params }) {
    return this.CALL({
      method: 'POST',
      url,
      ...params,
    });
  }

  PUT({ url, ...params }) {
    return this.CALL({
      method: 'PUT',
      url,
      ...params,
    });
  }

  PATCH({ url, ...params }) {
    return this.CALL({
      method: 'PATCH',
      url,
      ...params,
    });
  }

  DELETE({ url, ...params }) {
    return this.CALL({
      method: 'DELETE',
      url,
      ...params,
    });
  }
}

export default new API();
