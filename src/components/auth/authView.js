export const authView = {
    form: document.querySelector("#logInForm"),
    homeBtn: document.querySelector('.homeCategory'),
    authBtn: document.querySelector('.settings'),
    logOutBtn: document.querySelector('.logOut'),


    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    },
    
    toggleAuthBtn(isAuth) {
        if(isAuth) {
            this.authBtn.classList.add('hidden');
            this.logOutBtn.classList.remove('hidden')
        }else  {
            this.authBtn.classList.remove('hidden');
            this.logOutBtn.classList.add('hidden')
        }
      
    }
}