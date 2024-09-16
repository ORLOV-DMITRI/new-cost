export const formView = {
    form: () => document.querySelector('.form'),
    toggleCheckboxes: document.querySelector('.chooseCheckboxes'),
    
    
    
    getFormData() {
        const formData = new FormData(this.form());
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    },
    setFormData(data) {
        for (const [key, value] of Object.entries(data)) {
            const field = this.form().querySelector(`[name="${key}"]`);
            if (field) {
                field.value = value;
            }
        }
    },
    showMessage(message, type = 'success') {
        alert(`${type.toUpperCase()}: ${message}`);
    }
    
};
