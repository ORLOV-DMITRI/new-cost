import { formView } from "./formView.js";
import { formModel } from "./formModel.js";
import Cookies from 'js-cookie'
import { categoryController } from "../category/categoryController.js";
import { categoryModel } from "../category/categoryModel.js";


export const formController = {
    form: document.querySelector("#createForm"),
    view: formView,
    model: formModel,

    init() {
        this.view.changeMod('create')
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleSubmit();
        });
        this.handleDelete()
        this.toggleDisplaySubField();
    },
    updateMode(mode) {
        if (mode === 'update') {
            this.recordId = this.form.dataset.recordId || undefined;
            if (this.recordId) {
                this.loadData(+this.recordId);
            }
        }
        this.view.changeMod(mode)
    },
    toggleDisplaySubField() {
        const block = document.querySelector(".chooseCheckboxes");
        const fields = block.querySelectorAll(".field ");
        fields?.forEach(item => {
            const radioGroup = item.querySelector('.radio-group');
            const checkboxes = radioGroup.querySelectorAll("input");
            const hiddenField = item.querySelector('.sub-field')
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    if (!JSON.parse(checkbox.value)) {
                        hiddenField.classList.add("disabled");
                    } else {
                        hiddenField.classList.remove("disabled");
                    }
                }

                checkbox.addEventListener("click", () => {
                    hiddenField.classList.toggle("disabled", !JSON.parse(checkbox.value));
                });
            })
        });

    },
    async loadData(id) {
        try {
            const data = await categoryModel.getCategoryById(id)
            formModel.setData(data);
            this.view.setFormData(data);
            this.toggleDisplaySubField()
        } catch (error) {
            this.view.showMessage("Ошибка при загрузке данных: " + error.message, "error");
        }
    },
    async handleDelete() {
        const deleteBtn = this.form.querySelector('.delete')
        deleteBtn.addEventListener('click', async () => {
            try {
                if(!this.recordId) return
                await categoryModel.deleteCategory(+this.recordId);
                formView.showMessage("Запись успешно удалена!");
                this.form.reset()
                categoryController.updateCategories()
            } catch (error) {
                formView.showMessage(error.message, "error");
            }
        })

    },
    async handleSubmit() {
        const data = formView.getFormData();
        data.favorite = document.querySelector('.isFavorite').checked;
        data.id = +this.recordId;
        try {
            let result;
            result = await categoryModel.createOrUpdate(data);
            if (this.recordId) {
                formView.showMessage("Запись успешно обновлена!");
            } else {
                formView.showMessage("Запись успешно создана!");
            }
            this.form.reset()
            categoryController.updateCategories()
        } catch (error) {
            formView.showMessage(error.message, "error");
        }
    }
};
