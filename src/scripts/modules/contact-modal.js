// Contact modal
const contactToggleBtn = document.querySelectorAll('.contact-modal-toggle')
const contactModal = document.getElementById('contact-modal')
const closeModalBtn = document.getElementById('contact-close-modal')
const closeModalBtn2 = document.getElementById('contact-footer-close-modal')

// Contact modal toggle //
contactToggleBtn.forEach(btn => {
  btn.addEventListener('click', () =>{
    contactModal.classList.toggle('active')
  })
})

// Hide modal //
function hideModal() {
  contactModal.classList.remove('active')
}

closeModalBtn.addEventListener('click', () =>{
  hideModal()
})

closeModalBtn2.addEventListener('click', () =>{
  hideModal()
})

document.addEventListener('click', (event) =>{
  if(event.target === contactModal){
    hideModal()
  }
})

document.addEventListener('keydown', (event)=>{
  if(event.code === "Escape"){
    hideModal()
  }
})