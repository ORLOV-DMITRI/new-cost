export const categoryView = {
    cards: () => document.querySelectorAll('.card'),
    backBtn: document.querySelector('.back'),
    loader: document.querySelector('.loaderContainer'),
    categoryContainer: document.querySelector('.cards.all'),
    categoryContainerHome: document.querySelector('.cards.home'),
    toggleLoader(active) {
        this.loader.classList.toggle('active', active)
    },
    clearCategories() {
        this.categoryContainerHome.innerHTML = ''
        this.categoryContainer.innerHTML = ''
    },
    renderCategories(data, isFavorites) {
        data.forEach(item => {
            const {trackMoney, trackMoneyCount, money, name, id, trackDay, trackDayCount} = item;
            const {percentage, color} = this.calcTemp(money, trackMoneyCount)
            const calculatedDays = Math.floor(money / trackDayCount);

            const cardTemplate = `
              <div class="card travel" id="${id}">
                <div class="card__head">
                    <div class="card__name">${name}</div>
                    <div class="card__icon delete"></div>
                </div>
                <div class="card__body">
                    <div class="card__total"><span>${money}</span> ₽</div>
                    <div class="card__total track ${trackMoney ? '' : 'hidden'}">${trackMoneyCount} ₽</div>
                </div>
                <div class="card__temp ${trackMoney ? '' : 'hidden'}">
                    <div class="card__currentTemp" style="width: ${percentage}%; background-color: ${color}" ></div>
                </div>
                <div class="card__days ${trackDay ? '' : 'hidden'}">
                    <div class="card__day">
                         <span>на <span class="card__dayItem">${calculatedDays}</span> ${this.declensionDays(calculatedDays)}}</span>
                         <span>если по <span class="card__dayItem">${trackDayCount}</span></span>
                     </div>
                     
                </div>
              
                <div class="card__actions">
                    <input type="number" class="input">
                    <div class="btns">
                        <button class="add">Добавить</button>
                        <button class="remove">Отнять</button>
                    </div>
                </div>
            </div>
         
       
         `
            if (isFavorites) {
    
                this.categoryContainerHome.insertAdjacentHTML("beforeend", cardTemplate)
            } else {
                this.categoryContainer.insertAdjacentHTML("beforeend", cardTemplate)
            }
        })

    },


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
                    if (category === 'eat') {
                        days.textContent = calculatedDays < 1 ? "0 дней" : this.declensionWeeks(calculatedDays);

                    } else {
                        days.textContent = calculatedDays < 1 ? "0 дней" : this.declensionDays(calculatedDays);
                    }
                }
            }
        });
    },
    calcTemp(money, maxMoney) {
        const percentage = Math.min(100, (money / maxMoney) * 100); // Рассчитываем процент заполнения шкалы
        let color;
        if (percentage >= 75) {
            color = '#1E90FF'; // Зеленая шкала
        } else if (percentage >= 50) {
            color = '#6495ED'; // Желтая шкала
        } else if (percentage >= 25) {
            color = '#87CEEB'; // Оранжевая шкала
        } else {
            color = '#C5D0E6'; // Красная шкала
        }

        return {percentage, color}
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
