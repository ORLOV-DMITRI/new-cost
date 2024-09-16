// CategoryModel.js
export const CategoryModel = {
    // baseUrl: 'https://orlov-finance.ru/new-cost',
    baseUrl: "http://localhost:3005/",
    
    async createOrUpdate(data) {
        try {
            const response = await fetch(this.baseUrl + "/api/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...data})
            });
            
            if (!response.ok) {
                throw new Error("Ошибка при пополнении категории");
            }
            
            return await response.json();
        }
        catch (error) {
            console.error("Ошибка в создании или обновлении категории:", error);
            throw error;
        }
    }
};
