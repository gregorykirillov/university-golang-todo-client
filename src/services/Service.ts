import qs from 'query-string';
import axios from 'axios';

import { API_URL } from '~/src/settings';

export default class ItemsService {
    static async getItemByLink(id: string) {
        return axios.get(`${API_URL}/${id}`);
    }

    static async getItemsByLink(params: object) {
        return axios.get(`${API_URL}?${qs.stringify({ ...params })}`);
    }
}
