export const formView = {
    form: () => document.querySelector('#createForm'),
    toggleCheckboxes: document.querySelector('.chooseCheckboxes'),


    getFormData() {
        const formData = new FormData(this.form());
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    },
    setFormData({category}) {
        for (const [key, value] of Object.entries(category)) {
            const field = this.form().querySelector(`[name="${key}"`);
            if (field && field.type === 'radio') {
                const field = this.form().querySelector(`[name="${key}"][value="${value}"]`);
                field.checked = true;
            } else if (field) {
                field.value = value; // Для остальных типов полей
            }
        }
    },

    showMessage(message, type = 'success') {
        alert(`${type.toUpperCase()}: ${message}`);
    },
    changeMod(mode = 'create') {
        const form = this.form();
        const formContainer = document.querySelector('.createHead');
        const formTitle = formContainer.querySelector('h2');
        const formBtn = form.querySelector('.create');
        const formDeleteBtn = form.querySelector('.delete');
        if (mode === 'update') {
            formTitle.textContent = 'Редактирование категории'
            formBtn.textContent = 'Сохранить'
            formDeleteBtn.classList.remove('hidden')
        } else {
            formTitle.textContent = 'Создание категории'
            formBtn.textContent = 'Создать'
            formDeleteBtn.classList.add('hidden')
        }

    }

};
