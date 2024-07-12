import axios from './axios';

interface LoadItemsOptions {
  page?: number;
  itemsPerPage?: number;
  search?: string;
  sortBy?: SortOption[];
}

interface SortOption {
  key: string;
  order: 'asc' | 'desc';
}

export class SitesService {
  async getAll(options: LoadItemsOptions) {

    const params: Record<string, any> = {
      _page: options.page,
      _limit: options.itemsPerPage,
      q: options.search,
    };

    if (options.sortBy && options.sortBy.length) {
      params['_sort'] = options.sortBy.map(s => s.key).join(',');
      params['_order'] = options.sortBy.map(s => s.order).join(',');
    }

    const response = await axios.get('/sites?_expand=client', {params});
    return response.data;
  }

  async getById(id: string | string[]) {
    const response = await axios.get(`/sites/${id}?_expand=client`);
    return response.data;
  }

  async fetchTotalCount() {
    const response = await axios.get('/sites');
    return response.data.length;
  }
}
