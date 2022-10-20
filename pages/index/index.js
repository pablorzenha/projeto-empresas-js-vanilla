import {Request} from "../../script/api.js"

class LoginPage{
    static loginAndRegisterToggle(){
        const btnRegister = document.querySelectorAll(".btn__back")
        LoginPage.login()
        LoginPage.register()
        LoginPage.renderCompanies()
        btnRegister.forEach(button=>{
            button.addEventListener("click",()=>{
                const loginAndRegister = document.querySelectorAll(".container__form")
                loginAndRegister.forEach(form=>{
                    form.classList.toggle("hidden")
                   
                })
            })
        })
    }
    static login(){
        const btnlogin = document.querySelector(".btn__login")

        btnlogin.addEventListener("click",(event)=>{
            event.preventDefault()
            const loginMail = document.querySelector(".inputEmailLogin")
            const loginPassword = document.querySelector(".inputPasswordLogin")
            
        const data = {
                email: loginMail.value,
                password: loginPassword.value
              };
        
        Request.requestUser(data)
        
        })
        
    }
    static register(){
        const btnRegister = document.querySelector(".btn__register")

        btnRegister.addEventListener("click",(event)=>{
            event.preventDefault()
            const mail = document.querySelector(".inputEmailRegister")
            const password = document.querySelector(".inputPasswordRegister")
            const cargo     = document.querySelector(".inputCargoRegister")
            const user = document.querySelector(".inputUserRegister")
            
            const data = {
                    email: mail.value,
                    password: password.value,
                    professional_level: cargo.value,
                    username: user.value   
            };
            Request.requestRegister(data)
          
        })
    }
    static async renderCompanies(){
        const companies = await Request.requestAllCompanies()
        const ul = document.querySelector(".listCompanies")
        companies.forEach(element=>{
            const li = document.createElement("li")
            const name = document.createElement("h4")
            name.innerText = element.name
            li.appendChild(name)
            ul.appendChild(li)
        })
    }
}
LoginPage.loginAndRegisterToggle()