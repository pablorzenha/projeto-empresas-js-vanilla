class Modal{
    static closeModal(){
        const btnModal = document.querySelector(".modal__btn")
        btnModal.addEventListener("click",()=>{
            const modal = document.querySelector(".modal__background")
            modal.classList.add("hidden")
        })
        const btnModalRegister = document.querySelector(".modal__btn__register")
        btnModalRegister.addEventListener("click",()=>{
            const modal = document.querySelector(".modal__background__register")
            modal.classList.add("hidden")
        })
    }   
}

Modal.closeModal()

