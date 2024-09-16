import { formView } from "./formView.js";
import { formModel } from "./formModel.js";

export const formController = {
    form: document.querySelector(".form"),
    
    init() {
        this.recordId = this.form.dataset.recordId || undefined;
        if (this.recordId) {
            this.loadData(this.recordId);
        }
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleSubmit();
        });
        this.toggleDisplaySubField();
        
    },
    toggleDisplaySubField() {
        const block = document.querySelector(".chooseCheckboxes");
        const fields = block.querySelectorAll(".field ");
        fields?.forEach(item => {
            const checkboxes = item.querySelectorAll("input");
            const hiddenField = item.querySelector('.sub-field')
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener("click", () => {
                    hiddenField.classList.toggle("disabled", !JSON.parse(checkbox.value));
                });
            })
        });
        
    },
    async loadData(id) {
        try {
            const response = await fetch(`${formModel.apiEndpoint}/${id}`);
            const data = await response.json();
            formModel.setData(data);
            this.view.setFormData(data);
        }
        catch (error) {
            this.view.showMessage("Ошибка при загрузке данных: " + error.message, "error");
        }
    },
    
    async handleSubmit() {
        const data = formView.getFormData();
        data.favorite = document.querySelector('.isFavorite').checked;
        formModel.setData(data);
        try {
            let result;
            if (this.recordId) {
                result = await formModel.update(this.recordId);
                formView.showMessage("Запись успешно обновлена!");
            } else {
                result = await formModel.create();
                formView.showMessage("Запись успешно создана!");
            }
            // Дополнительные действия после успешного сохранения
        }
        catch (error) {
            formView.showMessage(error.message, "error");
        }
    }
};
