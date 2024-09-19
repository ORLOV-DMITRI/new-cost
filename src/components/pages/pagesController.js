import { PagesView } from "./pagesView.js";
import Cookies from "js-cookie";
import { formController } from "../form/formController.js";

export const PagesController = {
    view: PagesView,
    basePath: "/new-cost",
    init() {
        this.view.renderAllPage();
        this.changePages()
    },
    
    updateForm() {
      this.view.renderUpdateForm()  
    },

    changePages() {
        this.view.routeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                let token = Cookies.get('token');
                this.view.pages.forEach(page => {
                    page.classList.remove('active')
                    if (!token) {
                        if(page.classList.contains('logIn')) {
                            page.classList.add('active')
                        }
                    } else {
                        if(page.classList.contains(btn.id)) {
                            page.classList.add('active')
                        }
                    }
                })
              
                if(btn.classList.contains('newCategory')) {
                    formController.updateMode('create')
                }
                this.view.renderAllPage();
                this.view.updateActiveBtn(btn)
            })
        })
    },
};
