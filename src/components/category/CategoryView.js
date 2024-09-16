export const CategoryView = {
    basePath: "/new-cost",
    routeBtns: document.querySelectorAll(".nav > button"),
    pages: document.querySelectorAll(".page"),

    
    renderAllPage() {
        const route = this.getCurrentRoute();
        this.pages.forEach(page => {
            page.classList.add("hidden");
            if(route === '/' || route === '') {
                if (page.classList.contains("home")) page.classList.remove("hidden");
            }
            else if(route === '/add') {
                if (page.classList.contains("createNew")) page.classList.remove("hidden");
            }
            else if(route === '/all') {
                if (page.classList.contains("all")) page.classList.remove("hidden");
            }
            else {
            
            }
        });

    },
    getCurrentRoute() {
        const path = window.location.pathname;
        if (path.startsWith(this.basePath)) {
            return path.slice(this.basePath.length) || "/";
        }
            console.log(path);

        return "/";
    },
    renderCreatePage() {
        this.pages.forEach(page => {
            page.classList.add("hidden");
            if (page.classList.contains("createNew")) {
                page.classList.remove("hidden");
            }
        });
    },
    
    
};
