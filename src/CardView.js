

export const CardView = {
    cards: document.querySelectorAll('.card'),
    backBtn: document.querySelector('.back'),
    
    
    renderDetailInfo(card) {
        
        this.cards.forEach(c => {
            if (c !== card) {
                c.classList.add('hidden');
            }
        })
        card.classList.add('selected');
        this.backBtn.style.display = 'flex';
    },
    deleteDetailInfo() {
        this.cards.forEach(c => {
            c.classList.remove('hidden')
            c.classList.remove('selected')
        })
        this.backBtn.style.display = 'none';
    }
}
