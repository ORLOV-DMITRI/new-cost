import { CategoryView } from "./CategoryView.js";
import { formController } from "../form/formController.js";

export const CategoryController = {
    basePath: "/new-cost",
    init() {
        CategoryView.renderAllPage();
        this.changePages()
    },
    
    changePages() {
        CategoryView.routeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if(btn.classList.contains('newCategory')) {
                    formController.init('add');
                }
                history.pushState({page: btn.id}, "", `${this.basePath}/${btn.id}`);
                CategoryView.renderAllPage();
            })
        })
    },

    
};
