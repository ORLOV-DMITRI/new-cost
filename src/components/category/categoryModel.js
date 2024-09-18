import { api, headers } from "../../constants.js";
import Cookies from "js-cookie";

export const categoryModel = {
    apiAdd: api.add,
    apiGetAll: api.all,
    apiById: api.id,
    apiDelete: api.remove,


    async createOrUpdate(data) {
        try {
            let token = Cookies.get('token');
            const response = await fetch(this.apiAdd, {
                method: "POST",
                headers: headers(token),
                body: JSON.stringify({...data})
            });
            if (!response.ok) {
                throw new Error("Ошибка при создании или обновлении категории");
            }
            return await response.json();
        } catch (error) {
            console.error("Ошибка в создании или обновлении категории:", error);
            throw error;
        }
    },
    async getAllCategory() {
        try {
            let token = Cookies.get('token');
            const response = await fetch(this.apiGetAll, {
                method: "GET",
                headers: headers(token),
            });
            if (!response.ok) {
                throw new Error("Ошибка при получении всех категорий");
            }
            return await response.json();
        } catch (error) {
            console.error("Ошибка при получении всех категори:", error);
            throw error;
        }
    },
    async getCategoryById(id) {
        try {
            let token = Cookies.get('token');
            const response = await fetch(`${this.apiById}`, {
                method: "POST",
                headers: headers(token),
                body: JSON.stringify({id: id})
            });
            if (!response.ok) {
                throw new Error("Ошибка при получении категории");
            }
            return await response.json();
        } catch (error) {
            console.error("Ошибка при получении категорий:", error);
            throw error;
        }
    },
    async deleteCategory(id) {
        try {
            let token = Cookies.get('token');
            await fetch(`${this.apiDelete}`, {
                method: "DELETE",
                headers: headers(token),
                body: JSON.stringify({id: id})
            });
        } catch (error) {
            console.error("Ошибка в при удалении категорий:", error);
            throw error;
        }
    },


};
