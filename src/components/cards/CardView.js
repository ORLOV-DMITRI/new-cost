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
    },

    renderWalletInfo(data) {
        this.cards.forEach(card => {
            let category = null;
            let maxDays = 31;
            if (card.classList.contains('eat')) {
                category = 'eat';
                maxDays = 5;
            }
            if (card.classList.contains('travel')) category = 'travel';
            if (card.classList.contains('cash')) category = 'cash';
            if (card.classList.contains('bank')) category = 'bank';

            if (category) {
                const money = data[category]?.money || 0;
                const rate = data[category]?.rate || 1;
                const total = card.querySelector('.card__total > span');
                const days = card.querySelector('.card__days');

                total.textContent = money;

                const calculatedDays = Math.floor(money / rate);

                if (category !== 'bank') {
                    this.renderTemp(calculatedDays, maxDays, card);
                    if(category === 'eat') {
                        days.textContent = calculatedDays < 1 ? "0 дней" : this.declensionWeeks(calculatedDays);

                    }else {
                        days.textContent = calculatedDays < 1 ? "0 дней" : this.declensionDays(calculatedDays);
                    }
                }
            }
        });
    },
    renderTemp(days, maxDays, card) {
        const currentTemp = card.querySelector('.card__currentTemp');
        const percentage = Math.min(100, (days / maxDays) * 100); // Рассчитываем процент заполнения шкалы

        currentTemp.style.width = `${percentage}%`;

        // Меняем цвет в зависимости от количества дней
        if (percentage >= 75) {
            currentTemp.style.backgroundColor = 'green'; // Зеленая шкала
        } else if (percentage >= 50) {
            currentTemp.style.backgroundColor = 'yellow'; // Желтая шкала
        } else if (percentage >= 25) {
            currentTemp.style.backgroundColor = 'orange'; // Оранжевая шкала
        } else {
            currentTemp.style.backgroundColor = 'red'; // Красная шкала
        }
    },
    declensionDays(number) {
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return `${number} дней`;
        }

        if (lastDigit === 1) {
            return `${number} день`;
        } else if (lastDigit >= 2 && lastDigit <= 4) {
            return `${number} дня`;
        } else {
            return `${number} дней`;
        }
    },
    declensionWeeks(number) {
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return `${number} недель`;
        }

        if (lastDigit === 1) {
            return `${number} неделя`;
        } else if (lastDigit >= 2 && lastDigit <= 4) {
            return `${number} недели`;
        } else {
            return `${number} недель`;
        }
    }

}
