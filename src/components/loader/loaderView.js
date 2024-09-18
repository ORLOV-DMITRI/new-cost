export const loaderView = {
    loaderTemplate: `
             <div class="loading-overlay">
                <div class="skeleton"></div>
            </div>
        `,
    toggleLoader(element) {
        if (!element) return;
        
        if (getComputedStyle(element).position === 'static') {
            element.classList.add('relative');
        }
        const isLoading = element.classList.toggle('loading');
            
        if (isLoading) {
            const loaderElement = document.createElement('div');
            loaderElement.innerHTML = this.loaderTemplate;
            console.log(loaderElement)
            element.appendChild(loaderElement.firstChild);
        } else {
            const loader = element.querySelector('.loading-overlay');
            if (loader) {
                loader.remove();
            }
            element.classList.remove('relative');
        }
    },
}