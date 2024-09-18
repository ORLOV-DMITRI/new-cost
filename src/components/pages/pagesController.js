import { PagesView } from "./pagesView.js";
import Cookies from "js-cookie";
import { formController } from "../form/formController.js";

export const PagesController = {
    view: PagesView,
    basePath: "/new-cost",
    init() {
        this.view.renderAllPage();
        this.changePages()
        window.addEventListener('popstate', () => {
            this.view.renderAllPage();
        });
    },
    
    updateForm() {
      this.view.renderUpdateForm()  
    },

    changePages() {
        this.view.routeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                let token = Cookies.get('token');
                if (!token) {
                    history.pushState({page: 'auth'}, "", `${this.basePath}/auth`);
                } else {
                    history.pushState({page: btn.id}, "", `${this.basePath}/${btn.id}`);
                }
             
                if(btn.classList.contains('newCategory')) {
                    console.log(btn)
                    formController.updateMode('create')
                }
                this.view.renderAllPage();
                this.view.updateActiveBtn(btn)
            })
        })
    },
};
