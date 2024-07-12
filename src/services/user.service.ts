import axios from './axios';

export class UserService {
    async getCurrent() {
      const response = await axios.get(`/me`);
      return response.data;
    }
  }
  