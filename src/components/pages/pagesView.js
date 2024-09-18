const routes = {
    '/': 'home',
    '/add': 'createNew',
    '/all': 'all',
    '/auth': 'logIn'
};

export const PagesView = {
    basePath: "/new-cost",
    routeBtns: document.querySelectorAll(".nav > button"),
    pages: document.querySelectorAll(".page"),


    renderAllPage() {
        const route = this.getCurrentRoute();
        const pageClass = routes[route] || 'home';
        this.pages.forEach(page => {
            page.classList.toggle('hidden', !page.classList.contains(pageClass));
        });
    },
    renderUpdateForm() {
        this.pages.forEach(page => {
            page.classList.add('hidden');
            if(page.classList.contains('createNew')) {
                page.classList.remove('hidden')
            }
        }); 
    },
    updateActiveBtn(activeBtn) {
        this.routeBtns.forEach(item => {
            item.classList.remove('active');
            if (item === activeBtn) {
                item.classList.add('active');
            }
        })
    },
    getCurrentRoute() {
        const path = window.location.pathname;
        if (path.startsWith(this.basePath)) {
            return path.slice(this.basePath.length) || "/";
        }
        return "/";
    },
};
