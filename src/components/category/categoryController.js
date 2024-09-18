import { categoryView } from "./categoryView.js";
import { categoryModel } from "./categoryModel.js";
import { formController } from "../form/formController.js";
import { PagesController } from "../pages/pagesController.js";

export const categoryController = {
    model: categoryModel,
    view: categoryView,
    form: document.querySelector("#createForm"),
    init() {
        this.updateCategories()
    },

    async getCategories() {
        this.data = await this.model.getAllCategory();
    },
    async updateCategories() {
        const res = await this.model.getAllCategory();
        this.view.clearCategories()
        const data = res.sort((a, b) => a.id - b.id );
        this.view.renderCategories(data, false);
        const filrers = data.filter(item => item.favorite )
        this.view.renderCategories(filrers, true);
        
        this.view.cards().forEach(item => {
            item.addEventListener('click', async (e) => {
                console.log(e.currentTarget)
                if(e.target.classList.contains('delete')) {
                    await categoryModel.deleteCategory(+e.currentTarget.id);
                    this.updateCategories()
                }else  {
                    this.form.dataset.recordId = item.id;
                    PagesController.updateForm()
                    formController.updateMode('update')
                }
                
            })
        })
        
    },
    async updateFafvoritesCategories() {

    },

    openDetailInfo() {
        categoryView.cards.forEach(card => {
            card.addEventListener('click', () => categoryView.renderDetailInfo(card))
        })
    },
    closeDetailInfo() {
        categoryView.backBtn.addEventListener('click', () => categoryView.deleteDetailInfo())
    },
    updateWalletInfo(walletData) {
        categoryView.renderWalletInfo(walletData)
    },
    incrementWallet() {
        categoryView.cards.forEach(card => {
            const addBtn = card.querySelector('.add');
            const input = card.querySelector('input')
            addBtn.addEventListener('click', () => {
                categoryView.toggleLoader(true);
                this.addMoney(card.id, +input.value)
                input.value = ''
                categoryView.toggleLoader(false);

            });
        })
    },
    dicrementWallet() {
        categoryView.cards.forEach(card => {
            const removeBtn = card.querySelector('.remove');
            const input = card.querySelector('input')
            removeBtn.addEventListener('click', () => {
                categoryView.toggleLoader(true);
                this.removeMoney(card.id, +input.value)
                input.value = ''
                categoryView.toggleLoader(false);

            });
        })
    },

    async getWalletData() {
        try {
            categoryView.toggleLoader(true);
            const walletData = await categoryModel.getWallet();
            this.updateWalletInfo(walletData);
            categoryView.toggleLoader(false)
        } catch (error) {
            console.error("Ошибка в контроллере (getWalletData):", error);
        }
    },
    async addMoney(category, amount) {
        try {
            const updatedCategory = await categoryModel.addMoneyToCategory(category, amount);
            this.getWalletData()
        } catch (error) {
            console.error("Ошибка в контроллере (addMoney):", error);
        }
    },
    async removeMoney(category, amount) {
        try {
            const updatedCategory = await categoryModel.removeMoneyToCategory(category, amount);
            this.getWalletData()
        } catch (error) {
            console.error("Ошибка в контроллере (addMoney):", error);
        }
    }
}
