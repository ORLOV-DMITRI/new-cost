// Файл: router.js

class Router {
    constructor(options = {}) {
        this.routes = {};
        this.mode = options.mode || 'history'; // 'hash' или 'history'
        this.root = options.root || '/';
        this.beforeEachCallback = null;
        this.afterEachCallback = null;
        this.current = null;
        this.init();
    }
    
    init() {
        if (this.mode === 'history') {
            window.addEventListener('popstate', () => this.navigate(window.location.pathname, false));
        } else {
            window.addEventListener('hashchange', () => this.navigate(this.getFragment(), false));
        }
        this.navigate(this.getCurrentPath(), false);
    }
    
    getCurrentPath() {
        if (this.mode === 'history') {
            return window.location.pathname.replace(this.root, '') || '/';
        } else {
            return this.getFragment() || '/';
        }
    }
    
    getFragment() {
        let fragment = '';
        const match = window.location.href.match(/#(.*)$/);
        fragment = match ? match[1] : '';
        return fragment;
    }
    
    add(route, handler) {
        this.routes[route] = handler;
    }
    
    remove(route) {
        delete this.routes[route];
    }
    
    flush() {
        this.routes = {};
    }
    
    beforeEach(callback) {
        this.beforeEachCallback = callback;
    }
    
    afterEach(callback) {
        this.afterEachCallback = callback;
    }
    
    navigate(path = '/', pushState = true) {
        if (this.beforeEachCallback) {
            const proceed = this.beforeEachCallback(this.current, path);
            if (!proceed) return;
        }
        
        this.current = path;
        
        if (pushState) {
            if (this.mode === 'history') {
                history.pushState(null, null, this.root + path);
            } else {
                window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
            }
        }
        
        this.resolve();
        
        if (this.afterEachCallback) {
            this.afterEachCallback(path);
        }
    }
    
    resolve() {
        const path = this.getCurrentPath();
        const routeHandler = this.routes[path] || this.routes['*'];
        if (routeHandler) {
            routeHandler();
        } else {
            console.error(`Route not found: ${path}`);
        }
    }
}

export default Router;
