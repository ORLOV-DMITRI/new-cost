const api = {
    add: 'http://localhost:3005/api/update'
}
export const formModel = {
    apiEndpoint: api.add,
    data: {},
    
    setData(data) {
        this.data = { ...data };
    },
    getData() {
        return this.data;
    },
    async create() {
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.data),
            });
            return await response.json();
        } catch (error) {
            throw new Error('Ошибка при создании записи: ' + error.message);
        }
    },
    async update(id) {
        try {
            const response = await fetch(`${this.apiEndpoint}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.data),
            });
            return await response.json();
        } catch (error) {
            throw new Error('Ошибка при обновлении записи: ' + error.message);
        }
    }
};
