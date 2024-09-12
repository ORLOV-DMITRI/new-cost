// CardModel.js
export const CardModel = {
    baseUrl: 'https://new-cost-server1.onrender.com',
    /**
     * Получение всех категорий кошелька с бэкенда
     * @returns {Promise<Object>} - Возвращает объект кошелька с категориями (Проезд, Еда, Личные деньги и Копилка)
     */
    async getWallet() {
        try {
            const response = await fetch(`${this.baseUrl}/api/wallet/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Добавляем токен для авторизации
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении кошелька');
            }

            const walletData = await response.json();
            return walletData;
        } catch (error) {
            console.error("Ошибка в модели CardModel (getWallet):", error);
            throw error;
        }
    },

    /**
     * Добавление денег в указанную категорию кошелька
     * @param {string} category - Категория, которую нужно пополнить ("travel", "eat", "cash", "bank")
     * @param {number} amount - Сумма для пополнения
     * @returns {Promise<Object>} - Возвращает обновленные данные категории
     */
    async addMoneyToCategory(category, amount) {
        try {
            const response = await fetch(this.baseUrl + '/api/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Добавляем токен для авторизации
                },
                body: JSON.stringify({ category, amount })
            });

            if (!response.ok) {
                throw new Error('Ошибка при пополнении категории');
            }

            const updatedCategory = await response.json();
            return updatedCategory;
        } catch (error) {
            console.error("Ошибка в модели CardModel (addMoneyToCategory):", error);
            throw error;
        }
    },
    /**
     * Добавление денег в указанную категорию кошелька
     * @param {string} category - Категория, которую нужно пополнить ("travel", "eat", "cash", "bank")
     * @param {number} amount - Сумма для пополнения
     * @returns {Promise<Object>} - Возвращает обновленные данные категории
     */
    async removeMoneyToCategory(category, amount) {
        try {
            const response = await fetch(this.baseUrl + '/api/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Добавляем токен для авторизации
                },
                body: JSON.stringify({ category, amount })
            });

            if (!response.ok) {
                throw new Error('Ошибка при пополнении категории');
            }

            const updatedCategory = await response.json();
            return updatedCategory;
        } catch (error) {
            console.error("Ошибка в модели CardModel (addMoneyToCategory):", error);
            throw error;
        }
    }


};
