import { CardView } from "./CardView.js";
import {CardModel} from "./CardModel.js";

export const CardController ={
    init() {
        this.openDetailInfo()
        this.closeDetailInfo()
        this.getWalletData()
        this.incrementWallet()
        this.dicrementWallet()
    },
    
    openDetailInfo() {
        CardView.cards.forEach(card => {
            card.addEventListener('click', () => CardView.renderDetailInfo(card))
        })
    },
    closeDetailInfo() {
        CardView.backBtn.addEventListener('click', () => CardView.deleteDetailInfo())
    },
    updateWalletInfo(walletData) {
        CardView.renderWalletInfo(walletData)
    },
    incrementWallet() {
        CardView.cards.forEach(card => {
            const addBtn = card.querySelector('.add');
            const input = card.querySelector('input')
            addBtn.addEventListener('click', () => {
                CardView.toggleLoader(true);
                this.addMoney(card.id,+input.value)
                input.value = ''
                CardView.toggleLoader(false);

            });
        })
    },
    dicrementWallet() {
        CardView.cards.forEach(card => {
            const removeBtn = card.querySelector('.remove');
            const input = card.querySelector('input')
            removeBtn.addEventListener('click', () => {
                CardView.toggleLoader(true);
                this.removeMoney(card.id,+input.value)
                input.value = ''
                CardView.toggleLoader(false);

            });
        })
    },

    async getWalletData() {
        try {
            CardView.toggleLoader(true);
            const walletData = await CardModel.getWallet();
            this.updateWalletInfo(walletData);
            CardView.toggleLoader(false)
        } catch (error) {
            console.error("Ошибка в контроллере (getWalletData):", error);
        }
    },
    async addMoney(category, amount) {
        try {
            const updatedCategory = await CardModel.addMoneyToCategory(category, amount);
            this.getWalletData()
        } catch (error) {
            console.error("Ошибка в контроллере (addMoney):", error);
        }
    } ,
    async removeMoney(category, amount) {
        try {
            const updatedCategory = await CardModel.removeMoneyToCategory(category, amount);
            this.getWalletData()
        } catch (error) {
            console.error("Ошибка в контроллере (addMoney):", error);
        }
    }
}
