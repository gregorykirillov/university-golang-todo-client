import axios from 'axios';
import {
    addItemURL,
    deleteItemURL,
    getItemsURL,
    getItemURL,
    updateItemURL,
} from '../routes';

export default class ItemsService {
    static async getItemByLink(id: number) {
        return axios.get(getItemURL(id));
    }

    static async getItemsByLink(params?: object) {
        return axios.get(getItemsURL(params));
    }

    static async addItem(title: string, active = true) {
        return axios.post(addItemURL, {
            title,
            active,
        });
    }

    static async deleteItem(id: number) {
        return axios.delete(deleteItemURL(id));
    }

    static async updateItem({
        ID,
        title,
        active,
    }: {
        ID: number;
        title: string;
        active: boolean;
    }) {
        return axios.put(updateItemURL(ID), {
            title,
            active,
        });
    }
}
