// CategoryModel.js
export const CardModel = {
    baseUrl: 'https://orlov-finance.ru/new-cost',
    async getWallet() {
        try {
            const response = await fetch(`${this.baseUrl}/api/wallet/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении кошелька');
            }

            const walletData = await response.json();
            return walletData;
        } catch (error) {
            console.error("Ошибка в модели CategoryModel (getWallet):", error);
            throw error;
        }
    },
    async addMoneyToCategory(category, amount) {
        try {
            const response = await fetch(this.baseUrl + '/api/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category, amount })
            });

            if (!response.ok) {
                throw new Error('Ошибка при пополнении категории');
            }

            const updatedCategory = await response.json();
            return updatedCategory;
        } catch (error) {
            console.error("Ошибка в модели CategoryModel (addMoneyToCategory):", error);
            throw error;
        }
    },
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
            console.error("Ошибка в модели CategoryModel (addMoneyToCategory):", error);
            throw error;
        }
    }


};
