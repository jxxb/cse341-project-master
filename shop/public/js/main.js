const backdrop = document.querySelector('backdrop');
const sideDrawer = document.querySelector('.module-nav');
const menuToggle = document.querySelector('#side-menu-toggle');

function backdropClickHandler() {
   backdrop.style.display = 'none';
   sideDrawer.classList.remove('open');
}

function menuToggleClickerHandler() {
   backdrop.style.display = 'block';
   sideDrawer.classList.add('open');
}
 backdrop.addEventListener('click', backdropClickHandler);
 menuToggle.addEventListener('click', menuToggleClickerHandler);