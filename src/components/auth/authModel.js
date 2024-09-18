import { api,  headers } from "../../constants.js";
import Cookies from 'js-cookie'

export const authModel = {
    apiAuth: api.auth,
    apiCurrent: api.current,

    async auth(data) {
        try {
            const response = await fetch(this.apiAuth, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            throw new Error('Ошибка при создании записи: ' + error.message);
        }
    },
    async current() {
        try {
            let token = Cookies.get('token');
            const response = await fetch(this.apiCurrent, {
                method: 'GET',
                headers: headers(token)
            });
            return await response.json();
        } catch (error) {
            throw new Error('Ошибка при получении пользователя: ' + error.message);
        }
    }
}