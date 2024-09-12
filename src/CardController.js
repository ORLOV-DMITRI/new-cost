import { CardView } from "./CardView.js";

export const CardController ={
    init() {
        this.openDetailInfo()
        this.closeDetailInfo()
    },
    
    openDetailInfo() {
        CardView.cards.forEach(card => {
            card.addEventListener('click', () => CardView.renderDetailInfo(card))
        })
    },
    closeDetailInfo() {
        CardView.backBtn.addEventListener('click', () => CardView.deleteDetailInfo())
    }
}
