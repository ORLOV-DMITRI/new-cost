import { authView } from "./authView.js";
import { authModel } from "./authModel.js";
import Cookies from 'js-cookie'

export const authController = {
    model: authModel,
    view: authView,


    init() {
        this.view.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleSubmit();
        });
        this.checkIsAuth()
        this.logOut()
    },
    async handleSubmit() {
        const data = this.view.getFormData();
        try {
            const result = await this.model.auth(data);
            if (result.token) {
                Cookies.set('token', result.token)
                Cookies.set('id', result.id)
            }
            this.view.form.reset();
            this.view.homeBtn.click();
            this.view.toggleAuthBtn(true);
        } catch (error) {
            console.log(error)
        }
    },
    async checkIsAuth() {
        try {
            const result = await this.model.current();
            if (!result.id) {
                this.view.authBtn.click()
                this.view.toggleAuthBtn(false);
            } else {
                this.view.toggleAuthBtn(true);
            }
        } catch (error) {
            console.log(error)
        }
    },
    async logOut() {
        this.view.logOutBtn.addEventListener('click', () => {
            const confirmation = window.confirm('Вы уверены, что хотите выйти из приложения?');
            if (confirmation) {
                Cookies.remove('token');
                this.checkIsAuth();
            } else {
                console.log('Пользователь отменил выход');
            }
        })
    }
}
