// Mobile header menu

const mobileMenuToggleBtn = document.getElementById('mobile-menu-toggle')
const mobileMenu = document.querySelector('.header-nav__ul')

mobileMenuToggleBtn.addEventListener('click', () =>{
  mobileMenu.classList.toggle('active')
})

document.addEventListener('keydown', (event)=>{
  if(event.code === "Escape"){
    mobileMenu.classList.toggle('remove')
  }
})