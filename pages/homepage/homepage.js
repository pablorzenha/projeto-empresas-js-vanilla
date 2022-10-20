import { Request } from "../../script/api.js"
class HomePage{
    
    static async user(){
        const Admin = await Request.renderProfile()

        if(Admin.error){
            const dataUser                   = await Request.resquestAllUser()
            const user = dataUser.find(element=>{
                if(element.uuid === localStorage.getItem("@KenzieEmpresas:user_uuid")){
                    return element
                }
            })
            return user
        }else{
        const dataUser                   = await Request.renderProfile()
        
        return dataUser
        }
    }

    static async logOut(){
        const logout = document.querySelector(".bx-log-out")
        logout.addEventListener("click",()=>{
            localStorage.removeItem("@KenzieEmpresas:user_uuid")
            localStorage.removeItem("@KenzieEmpresas:token")
            window.location.assign("../index/index.html")
        })
    }
    static async renderUser(){
        if(localStorage.getItem("@KenzieEmpresas:user_uuid")){
            const user                      = await HomePage.user()
            const nameAndJob                = document.querySelector(".name__job")
            nameAndJob.innerHTML            = ""
            nameAndJob.innerHTML            = `<div class="name">${user.username}</div>
            <div class="userLevel">${(user.is_admin?"Admin":"User")}</div>
            <div class="job">${user.kind_of_work} (${user.professional_level})</div>`
            HomePage.sectionUser()
            HomePage.renderSectionSector()
            HomePage.renderCompanies()
            HomePage.renderSectionDepartament()
            HomePage.renderSectionEmployeer()
            HomePage.logOut()
            HomePage.dashboard()
        }else{
            window.location.assign("../index/index.html")
        }
       
    }

    static async dashboard(){
        const dashboard = document.querySelector(".bx-grid-alt")
        const dashboardLabel = document.querySelector(".bx-grid-altLabel")
        
        dashboard.addEventListener("click", async(event)=>{
            event.preventDefault()
            HomePage.dashboardRender()
           
        })
        dashboardLabel.addEventListener("click",(event)=>{
            event.preventDefault()
            HomePage.dashboardRender()
        })
    }

    static async dashboardRender(){
        const companies                 = await Request.requestAllCompanies()
        const sections                  = await Request.resquestAllsectors()
        const body = document.querySelector(".main__body")
        const dados = document.createElement("h4")
        dados.classList.add("main__subtitle")
        const dashboardContainer = document.createElement("div")
        dashboardContainer.classList.add("main__dashboardContainer")
        dados.innerText = "RzenhaHelp > Dashboard"
        const dashboard = document.createElement("div")
        dashboard.classList.add("main__body__dashboard")
        const dashboardSectors = document.createElement("div")
        dashboardSectors.classList.add("main__body__dashboard")
        const dashboardCompanies = document.createElement("div")
        dashboardCompanies.classList.add("main__body__dashboard")
        body.innerHTML = ""
     
        //  div para usuarios
        const users                  = await Request.resquestAllUser()
        const divUsers = document.createElement("div")
        divUsers.classList.add("main__body__infoHeadline")
        const infoUsers = document.createElement("h2")
        infoUsers.innerText = "Quantidade usuários"
        const numUsers = document.createElement("h3")
        numUsers.innerText= users.length
        divUsers.append(infoUsers,numUsers)

        // div estagio
        const filterEstagiario = users.filter(elemento =>{
            if(elemento.professional_level === "estagiario"){
                return elemento
            }
        })
        const divUsersEstagio = document.createElement("div")
        divUsersEstagio.classList.add("main__body__info")
        const infoUsersEstagio = document.createElement("h2")
        infoUsersEstagio.innerText = "Estágiario"
        const numUsersEstagio = document.createElement("h3")
        numUsersEstagio.innerText= filterEstagiario.length
        divUsersEstagio.append(infoUsersEstagio,numUsersEstagio)

        // div Junior
        const filterJunior = users.filter(elemento =>{
            if(elemento.professional_level === "júnior" || elemento.professional_level === "junior"){
                return elemento
            }
        })
        const divUsersJunior = document.createElement("div")
        divUsersJunior.classList.add("main__body__info")
        const infoUsersJunior = document.createElement("h2")
        infoUsersJunior.innerText = "Júnior"
        const numUsersJunior = document.createElement("h3")
        numUsersJunior.innerText= filterJunior.length
        divUsersJunior.append(infoUsersJunior,numUsersJunior)

        //div pleno
        const filterPleno = users.filter(elemento =>{
            if(elemento.professional_level === "pleno"){
                return elemento
            }
        })
        const divUsersPleno = document.createElement("div")
        divUsersPleno.classList.add("main__body__info")
        const infoUsersPleno = document.createElement("h2")
        infoUsersPleno.innerText = "Pleno"
        const numUsersPleno = document.createElement("h3")
        numUsersPleno.innerText= filterPleno.length
        divUsersPleno.append(infoUsersPleno,numUsersPleno)
        // div senior
        const filterSenior = users.filter(elemento =>{
            if(elemento.professional_level === "sênior" || elemento.professional_level === "senior"){
                return elemento
            }
        })
        const divUsersSenior = document.createElement("div")
        divUsersSenior.classList.add("main__body__info")
        const infoUsersSenior = document.createElement("h2")
        infoUsersSenior.innerText = "Sênior"
        const numUsersSenior = document.createElement("h3")
        numUsersSenior.innerText= filterSenior.length
        divUsersSenior.append(infoUsersSenior,numUsersSenior)
    

        // div para sections
        const divSections = document.createElement("div")
        divSections.classList.add("main__body__infoHeadline")
        const infoSections = document.createElement("h2")
        infoSections.innerText = "Quantidade setores"
        const numSections = document.createElement("h3")
        numSections.innerText = sections.length
        divSections.append(infoSections,numSections)

        //number para sectors
        const sectionsDetails = document.createElement("div")
        sectionsDetails.classList.add("main__body__infoSectors")
        sections.forEach( async (setor)=>{
            let soma = 0
            companies.forEach( async (compania) =>{
                if(compania.sectors.uuid === setor.uuid){
                    soma++
                }
            })
            const mensage = document.createElement("p")
            mensage.innerText = `Setor ${setor.description} possui ${soma} empresas`
            sectionsDetails.appendChild(mensage)
        })
       
        
        //div para empresas
        
        const divCompanies = document.createElement("div")
        divCompanies.classList.add("main__body__infoHeadline")
        const infoCompanies = document.createElement("h2")
        infoCompanies.innerText = "Quantidade empresas"
        const numCompanies = document.createElement("h3")
        numCompanies.innerText = companies.length
        divCompanies.append(infoCompanies,numCompanies)

        


        dashboard.append(divUsers,divUsersEstagio,divUsersJunior,divUsersPleno,divUsersSenior)
        dashboardSectors.append(divSections,sectionsDetails)
        dashboardCompanies.appendChild(divCompanies)
        dashboardContainer.append(dados,dashboard,dashboardSectors,dashboardCompanies )
    
        body.append(dashboardContainer)
    }

    static async sectionUser(){ 
        const sectionUser               = document.querySelector(".bx-user")
        const labelUser                 = document.querySelector(".bx-userlabel")
        sectionUser.addEventListener("click",(event)=>{
            event.preventDefault()
            HomePage.renderSectionUser()       
        })
        labelUser.addEventListener("click",(event)=>{
            event.preventDefault()
            HomePage.renderSectionUser()
        })
    }
    static async renderSectionUser(){
        const user                      = await HomePage.user()
        const mainContent               = document.querySelector(".main__body")
        mainContent.innerHTML           = ""

        const dados = document.createElement("h4")
        dados.classList.add("main__subtitle")
        dados.innerText = "RzenhaHelp > usuário"
        const nome                      = document.createElement("h3")
        nome.innerText                  = `nome: ${user.username}`
        const email                     = document.createElement("h3")
        email.innerText                 = `email: ${user.email}`
        const id                        = document.createElement("h3")
        id.innerText                    = `id: ${user.uuid}`
        const typeUser                  = document.createElement("h3")
        typeUser.innerText              = `Tipo de usuário: ${(user.is_admin?"Admin":"User")}`
        const work                      = document.createElement("h3")
        work.innerText                  = `Cargo: ${user.kind_of_work}`
        const levelWork                 = document.createElement("h3")
        levelWork.innerText             = `Nivel: ${user.professional_level}`
        mainContent.append(dados,nome,email,id,typeUser,work,levelWork)
        if(user.is_admin === false){
            const departaments = await Request.listAllDepartamentRequest()
           
            departaments.forEach( async (element) => {
                if(element.uuid === user.department_uuid){   
                    const departament = document.createElement("h3")
                    departament.innerText = `Departamento: ${element.name}`
                    const empresa = document.createElement("h3")
                    empresa.innerText = `Empresa: ${element.companies.name}`
                    const Funcionarios = document.createElement("h3")
                    Funcionarios.innerText = "Funcionários:"
                    const coWorkers = await Request.requestCoWorkers()
                    
                    const ulCoWorkers = document.createElement("ol")
                    coWorkers.forEach(coworker=>{
                        coworker.users.forEach(user=>{
                            const liWorker  = document.createElement("li")    
                            const nameWorker = document.createElement("p")
                            nameWorker.innerText = user.username
                            liWorker.appendChild(nameWorker)
                            ulCoWorkers.appendChild(liWorker)
                        })
                    })
                    mainContent.append(departament,empresa,Funcionarios,ulCoWorkers,)
                }
            })
            const btnEdit = document.createElement("button")
            btnEdit.innerText = "Editar usuário"
            btnEdit.classList.add("mainContent__btnEdit")
            mainContent.append(btnEdit)
            HomePage.sectionEditUser()
        }
    }   
    static async sectionEditUser(){
        const user = await Request.requestUserProfile()
        const btnEdit = document.querySelector(".mainContent__btnEdit")
        btnEdit.addEventListener("click",()=>{
            const mainContent               = document.querySelector(".main__body")
            mainContent.innerHTML           = ""

            const inputName = document.createElement("input")
            inputName.classList.add("mainContent__inputName")
            inputName.value = user.username
            const btnName = document.createElement("button")
            btnName.innerText = "trocar nome"
            btnName.classList.add("mainContent__btnName")
            const inputEmail = document.createElement("input")
            inputEmail.classList.add("mainContent__inputEmail")
            inputEmail.value = user.email
            const btnEmail = document.createElement("button")
            btnEmail.innerText = "Trocar Email"
            btnEmail.classList.add("mainContent__btnEmail")
            const inputPassword = document.createElement("input")
            inputPassword.classList.add("mainContent__inputPassword")
            inputPassword.placeholder = "Digite nova senha"
            const buttonChange  = document.createElement("button")
            buttonChange.innerText = "Fazer Mudanças"
            buttonChange.classList.add("mainContent__buttonChange")
            mainContent.append(inputName,btnName,inputEmail,btnEmail,inputPassword,buttonChange)
            HomePage.editUser()
        })
    }  
    static async editUser(){
        const btnName = document.querySelector(".mainContent__btnName")
        btnName.addEventListener("click", async()=>{
            const inputName = document.querySelector(".mainContent__inputName").value
            const data = {
                username: inputName
              }
            await Request.requestEditUser(data)
        })
        const btnEmail = document.querySelector(".mainContent__btnEmail")
        btnEmail.addEventListener("click",async ()=>{
            const inputEmail = document.querySelector(".mainContent__inputEmail").value
            const data = {
                email: inputEmail
              }
        await Request.requestEditUser(data)
        })
        const btnPassword = document.querySelector(".mainContent__buttonChange")
        btnPassword.addEventListener("click",async ()=>{
            const inputPassword =  document.querySelector(".mainContent__inputPassword").value
            const data = {
                    password: inputPassword
                  }
            await Request.requestEditUser(data)
        })
    }
    static async renderSectionSector(){
      
        const user                      = await HomePage.user()
        const mainContent               = document.querySelector(".main__body")
        const btnSector                 = document.querySelector(".bx-folder-open")
        const btnSectorLabel            = document.querySelector(".bx-folder-open-label")
        if(user.is_admin){
        const sectors                   = await Request.resquestAllsectors()
        btnSector.addEventListener("click",(event)=>{
            event.preventDefault()
            mainContent.innerHTML       = ""
            const container = document.createElement("div")
            container.classList.add("mainContent__containerSectors")
            const sectorsh2 = document.createElement("h4")
            sectorsh2.innerText = "RzenhaHelp > Lista de setores"
            sectorsh2.classList.add("main__subtitle")
            container.appendChild(sectorsh2)
            const ul = document.createElement("ul")
            ul.classList.add("mainContent__ulCarrossel")
            sectors.map(elemento=> {
           
                const li = document.createElement("li")
                const img = document.createElement("img")
                img.src = `../../img/${elemento.description}.jpg`
                const sector            = document.createElement("h4")
                sector.classList.add("nameSector")
                sector.innerText        = elemento.description
                li.append(img,sector)
                ul.appendChild(li)  
            })
            container.appendChild(ul)
            mainContent.appendChild(container)
        })
        btnSectorLabel.addEventListener("click",(event)=>{
            event.preventDefault()
            mainContent.innerHTML       = ""
            const container = document.createElement("div")
            container.classList.add("mainContent__containerSectors")
            const sectorsh2 = document.createElement("h4")
            sectorsh2.innerText = "RzenhaHelp > Lista de setores"
            sectorsh2.classList.add("main__subtitle")
            container.appendChild(sectorsh2)
            const ul = document.createElement("ul")
            ul.classList.add("mainContent__ulCarrossel")
            sectors.map(elemento=> {
                
                const li = document.createElement("li")
                const img = document.createElement("img")
                img.src = `../../img/${elemento.description}.jpg`
                const sector            = document.createElement("h4")
                sector.innerText        = elemento.description
                sector.classList.add("nameSector")
                li.append(img,sector)
                ul.appendChild(li)  
            })
            container.appendChild(ul)
            mainContent.appendChild(container)
        })
        }else{
            btnSector.addEventListener("click",(event)=>{
                event.preventDefault()
                mainContent.innerHTML       = ""
                const notPermission = document.createElement("h2")
                notPermission.innerText = "Você não tem permissão suficiente para navegar por aqui"
                mainContent.appendChild(notPermission)
            })
            btnSectorLabel.addEventListener("click",(event)=>{
                event.preventDefault()
                mainContent.innerHTML       = ""
                const notPermission = document.createElement("h2")
                notPermission.innerText = "Você não tem permissão suficiente para navegar por aqui"
                mainContent.appendChild(notPermission)
            })
        }
    }
    static async renderCompanies(){
        const btnCompanie               = document.querySelector(".bxs-buildings")
        const btnCompanielabel          = document.querySelector(".bxs-buildingslabel")
        btnCompanie.addEventListener("click",(event)=>{
            event.preventDefault()
           HomePage.renderSectionCompanies()
        })
        btnCompanielabel.addEventListener("click",(event)=>{
            event.preventDefault()
            HomePage.renderSectionCompanies()    
        }) 
    }

    static async renderSectionCompanies(){
        const user                      = await HomePage.user()
        const mainContent               = document.querySelector(".main__body")
        if(user.is_admin){
        const companies                 = await Request.requestAllCompanies()
        const selectCompanies           = document.createElement("select")
        selectCompanies.classList.add("selectCompanies")
        const btnSearchCompanies        = document.createElement("button")
        btnSearchCompanies.classList.add("btnSearchCompanies")
        const selectSector           = document.createElement("select")
        selectSector.classList.add("selectSector")
        const btnSearchSector        = document.createElement("button")
        btnSearchSector.classList.add("btnSearchSector")
        btnSearchSector.innerText       = "Pesquisar por setor"
        btnSearchCompanies.innerText    = "Pesquisar Empresa"
        const containerSearchCompanies  = document.createElement("div")
        containerSearchCompanies.classList.add("mainContent__pesquisaContainer")
        mainContent.innerHTML           = ""
    const subTitle = document.createElement("h4")
    subTitle.innerText = "RzenhaHelp > Empresas"
    subTitle.classList.add("main__subtitle")
        const listaCompanies            = document.createElement("ul")
        listaCompanies.classList.add("mainContent__ul")
        const containerButtons          = document.createElement("div")
        containerButtons.classList.add("mainContent__containerButtons")
        const buttonShowCompanier       = document.createElement("button")
        buttonShowCompanier.innerText   = "Mostrar Empresas"
        buttonShowCompanier.classList.add("mainContent__btnShow")
        const buttonRegisterCompanier   = document.createElement("button")
        buttonRegisterCompanier.classList.add("mainContent__btnRegister")
        buttonRegisterCompanier.innerText= "Cadastrar Empresa"
        companies.forEach((elemento,index)=>{
            if(index===0){
                const optionAll = document.createElement("option")
                optionAll.innerText = "Todas as empresas"
                selectCompanies.appendChild(optionAll)
                const optionAllSector = document.createElement("option")
                optionAllSector.innerText = "Todas os setores"
                selectSector.appendChild(optionAllSector)
            }
            const optionCompanie        = document.createElement("option")
            optionCompanie.innerText    = elemento.name
            selectCompanies.appendChild(optionCompanie)
            const cardCompanie          = document.createElement("li")
            cardCompanie.classList.add("ul__cardCompanie")
            const name                  = document.createElement("h3")
            name.innerText              = elemento.name
            const horario               = document.createElement("p")
            horario.innerText           = elemento.opening_hours
            const setor                 = document.createElement("p")
            setor.innerText             = elemento.description
            cardCompanie.append(name,setor,horario)
            listaCompanies.appendChild(cardCompanie)
        })
        const sectors                   = await Request.resquestAllsectors()
        sectors.forEach(e=> {
       
            const optionSector        = document.createElement("option")
            optionSector.value = e.uuid
            optionSector.innerText    = e.description
            selectSector.appendChild(optionSector)
        })
            containerButtons.append(buttonShowCompanier,buttonRegisterCompanier)
            const containerSelector = document.createElement("div")
            containerSelector.append(selectCompanies,btnSearchCompanies,selectSector,btnSearchSector)
            containerSelector.classList.add("containerSerch")
            const containerRegister = await HomePage.createCompanie()
            containerSearchCompanies.append(containerSelector,listaCompanies)
            mainContent.append(subTitle,containerButtons,containerSearchCompanies,containerRegister)
            HomePage.RegisterOrShowCompanies()
            HomePage.registerCompanie()  
            HomePage.listCompanieForSector()
    }else{  
            mainContent.innerHTML       = ""
            const notPermission = document.createElement("h2")
            notPermission.innerText = "Você não tem permissão suficiente para navegar por aqui"
            mainContent.appendChild(notPermission)
    }
    }
    static async createCompanie(){
        const sectors = await Request.resquestAllsectors()
        const containerRegister = document.createElement("div")
        containerRegister.classList.add("mainContent__register")
        containerRegister.classList.add("hidden")
        const registerText      = document.createElement("h2")
        registerText.innerText  = "Cadastrar"
        const inputNameLabel    = document.createElement("p")
        inputNameLabel.innerText= "Nome da empresa:"
        const inputName         = document.createElement("input")
        inputName.classList.add("inputName")
        const inputHourLabel    = document.createElement("p")
        inputHourLabel.innerText= "Horário de funcionamento"
        const inputHour         = document.createElement("input")
        inputHour.classList.add("inputHour")
        const inputDescriptionLabel = document.createElement("p")
        inputDescriptionLabel.innerText= "Descrição da empresa"
        const inputDescription  = document.createElement("input")
        inputDescription.classList.add("inputDescriptionLabel")
        const inputSelectLabel  = document.createElement("p")
        inputSelectLabel.innerText = "Ramo da empresa"
        const inputSelect       = document.createElement("Select")
        inputSelect.classList.add("inputSelect")
        const btnregister       = document.createElement("button")
        btnregister.innerText   = "Cadastrar"
        btnregister.classList.add("btnregister")
        sectors.forEach((e,i)=>{
            const descriptionSelect = document.createElement("option")
            descriptionSelect.innerText = e.description
            descriptionSelect.value = e.uuid
            inputSelect.appendChild(descriptionSelect)
            })
        containerRegister.append(registerText,inputNameLabel,inputName,inputHourLabel,inputHour,inputDescriptionLabel,inputDescription,inputSelectLabel,inputSelect,btnregister)
        return containerRegister
    }
    static RegisterOrShowCompanies(){
       
        HomePage.listCompanie()
        const btnShow           = document.querySelector(".mainContent__btnShow")
        const btnRegister       = document.querySelector(".mainContent__btnRegister")
        btnShow.addEventListener("click",(event)=>{
            event.preventDefault()
            const ul            = document.querySelector(".mainContent__pesquisaContainer")
            const register      = document.querySelector(".mainContent__register")
            ul.classList.remove("hidden")
            register.classList.add("hidden")
        })
        btnRegister.addEventListener("click",(event)=>{
            event.preventDefault()
            const ul            = document.querySelector(".mainContent__pesquisaContainer")
            const register      = document.querySelector(".mainContent__register")
            ul.classList.add("hidden")
            register.classList.remove("hidden")
        })
    }
    static async listCompanie(){
        const companies                 = await Request.requestAllCompanies()
        const selectCompanies = document.querySelector(".selectCompanies")
        const btnSelectCompanies = document.querySelector(".btnSearchCompanies")

        btnSelectCompanies.addEventListener("click",()=>{
            if(selectCompanies.value === "Todas as empresas"){
                HomePage.renderSectionCompanies()
            }else{
                const companie =  companies.find(e=>e.name === selectCompanies.value)
                const ul = document.querySelector(".mainContent__ul")
                ul.innerText =""
                const cardCompanie          = document.createElement("li")
                cardCompanie.classList.add("ul__cardCompanie")
                const name                  = document.createElement("h3")
                name.innerText              = companie.name
                const horario               = document.createElement("p")
                horario.innerText           = companie.opening_hours
                const setor                 = document.createElement("p")
                setor.innerText             = companie.description
                cardCompanie.append(name,setor,horario)
                ul.appendChild(cardCompanie)
                }
        })
    }
    static async listCompanieForSector(){
        const companies = await Request.requestAllCompanies()
       
        const btnSector = document.querySelector(".btnSearchSector")
        btnSector.addEventListener("click",()=>{
            const selectValue = document.querySelector(".selectSector").value
            if(selectValue === "Todas os setores"){
                HomePage.renderSectionCompanies()
            }else{
                const companieFilter =  companies.filter(e=>e.sectors.uuid === selectValue)
                const ul = document.querySelector(".mainContent__ul")
                ul.innerText =""
                companieFilter.forEach(elemento=>{

                    const cardCompanie          = document.createElement("li")
                    cardCompanie.classList.add("ul__cardCompanie")
                    const name                  = document.createElement("h3")
                    name.innerText              = elemento.name
                    const horario               = document.createElement("p")
                    horario.innerText           = elemento.opening_hours
                    const setor                 = document.createElement("p")
                    setor.innerText             = elemento.description
                    cardCompanie.append(name,setor,horario)
                    ul.appendChild(cardCompanie)
                })
                }
 
        })
        
    }
    static async registerCompanie(){
        const btnRegister = document.querySelector(".btnregister")
        btnRegister.addEventListener("click",()=>{
           const inputName = document.querySelector(".inputName")
           const inputHour = document.querySelector(".inputHour")
           const inputDescriptionLabel = document.querySelector(".inputDescriptionLabel")
           const inputSelect = document.querySelector(".inputSelect option")
           const body ={ 
            name: inputName.value,
            opening_hours:inputHour.value,
            description:inputDescriptionLabel.value,
            sector_uuid:inputSelect.value
        }
        Request.registerCompanie(body)
    }
        )
    }
    static async renderSectionDepartament(){
        const user                      = await HomePage.user()
        const main = document.querySelector(".main__body")
        const btnDepartamentLabel = document.querySelector(".bx-chart-label")
        if(user.is_admin){
        const btnDepartament = document.querySelector(".bx-chart")
        btnDepartament.addEventListener("click",(event)=>{
            event.preventDefault()
            main.innerHTML = ""
        const subTitle = document.createElement("h4")
        subTitle.innerHTML = "RzenhaHelp > Departamentos"
        subTitle.classList.add("main__subtitle")
            const containerBtns = document.createElement("div")
            containerBtns.classList.add("mainContent__containerBtns__departament")
            const createDepartament = document.createElement("button")
            const deleteDepartament = document.createElement("button")
            createDepartament.classList.add("createDepartament")
            createDepartament.innerText = "Criar departamento"
            deleteDepartament.innerText = "Deletar departamento"
            deleteDepartament.classList.add("deleteDepartament")
            const listDepartament = document.createElement("button")
            listDepartament.classList.add("listDepartament")
            listDepartament.innerText = "Listar departamentos"
            const containerDepartamentInfo = document.createElement("div")
            containerDepartamentInfo.classList.add("maincontent__departamentInfo")
            containerBtns.append(createDepartament,deleteDepartament,listDepartament)
            main.append(subTitle,containerBtns,containerDepartamentInfo)
            HomePage.createDepartament()
            HomePage.listAllDepartament()
            HomePage.deleteDepartament()
        })
        btnDepartamentLabel.addEventListener("click",(event)=>{
            event.preventDefault()
            main.innerHTML = ""
            const containerBtns = document.createElement("div")
            containerBtns.classList.add("mainContent__containerBtns__departament")
            const createDepartament = document.createElement("button")
            createDepartament.classList.add("createDepartament")
            createDepartament.innerText = "Criar departamento"
            const listDepartament = document.createElement("button")
            listDepartament.classList.add("listDepartament")
            listDepartament.innerText = "Listar departamentos"
            const containerDepartamentInfo = document.createElement("div")
            containerDepartamentInfo.classList.add("maincontent__departamentInfo")
            containerBtns.append(createDepartament,listDepartament)
            main.append(containerBtns,containerDepartamentInfo)
            HomePage.createDepartament()
            HomePage.listAllDepartament()
            HomePage.deleteDepartament()
        })
        }else{
        const btnDepartament = document.querySelector(".bx-chart")
            btnDepartament.addEventListener("click",(event)=>{
                event.preventDefault()
            main.innerHTML       = ""
            const notPermission = document.createElement("h2")
            notPermission.innerText = "Você não tem permissão suficiente para navegar por aqui"
            main.appendChild(notPermission)
            })
        btnDepartamentLabel.addEventListener("click",(event)=>{
                event.preventDefault()
            main.innerHTML       = ""
            const notPermission = document.createElement("h2")
            notPermission.innerText = "Você não tem permissão suficiente para navegar por aqui"
            main.appendChild(notPermission)
            })
        }
    }
    static async createDepartament(){
        const createDepartament = document.querySelector(".createDepartament")
        createDepartament.addEventListener("click",async ()=>{
            const companies = await Request.requestAllCompanies()
            const containerCreate = document.querySelector(".maincontent__departamentInfo")
            containerCreate.innerHTML = ""
            const inputName = document.createElement("input")
            inputName.placeholder = "Nome do departamento"
            inputName.classList.add("inputName")
            const inputDescription = document.createElement("input")
            inputDescription.placeholder = "Decrição do departamento"
            inputDescription.classList.add("inputDescription")
            const nameEmpresa = document.createElement("select")
            nameEmpresa.classList.add("nameEmpresa")
            const btnCreate = document.createElement("button")
            btnCreate.innerText = "Criar empresa"
            btnCreate.classList.add("btnCreateDepartament")
            companies.forEach(element=>{
                const name = document.createElement("option")
                name.innerText = element.name
                name.value = element.uuid
                nameEmpresa.appendChild(name)
            })
            containerCreate.append(inputName,inputDescription,nameEmpresa,btnCreate)
            HomePage.captureCreateRequest()
        })
    }
    static async captureCreateRequest(){
        const btnCreateDepartament = document.querySelector(".btnCreateDepartament")
        btnCreateDepartament.addEventListener("click", async()=>{
            const inputName = document.querySelector(".inputName").value
            const inputDescription  = document.querySelector(".inputDescription").value
            const nameEmpresa = document.querySelector(".nameEmpresa").value
            const data ={
                name: inputName,
                description: inputDescription,
                company_uuid: nameEmpresa
            }
            const request = await Request.createRequest(data)
        })
    }

    static async deleteDepartament(){
        const btnDelete = document.querySelector(".deleteDepartament")
        const companies = await Request.requestAllCompanies()
        btnDelete.addEventListener("click",()=>{
            const container = document.querySelector(".maincontent__departamentInfo")
            container.innerHTML = ""
            const select    = document.createElement("select")
            select.classList.add("selectComp")
            companies.forEach(companie =>{
                const option = document.createElement("option")
                option.innerText = companie.name
                option.value    = companie.uuid
                select.appendChild(option)
            })
            const btnSelect = document.createElement("button")
            btnSelect.classList.add("btnSelect")
            btnSelect.innerText = "Confirma empresa"
            container.append(select,btnSelect)
            HomePage.confirmCompDeleteDepar()
        })
    }

    static async confirmCompDeleteDepar(){
        const btnSelect = document.querySelector(".btnSelect")
        const container = document.querySelector(".maincontent__departamentInfo")
        const allDepartament = await Request.listAllDepartamentRequest()
        btnSelect.addEventListener("click", ()=>{
            if(document.querySelector(".selectDepartament")){
                const selectDepart = document.querySelector(".selectDepartament")
                const btdepart = document.querySelector(".confirmDelete")
                selectDepart.remove()
                btdepart.remove()
            }
            const selectComp = document.querySelector(".selectComp").value
            const selectDepartament = document.createElement("select")
            selectDepartament.classList.add("selectDepartament")
            allDepartament.forEach((element)=>{
                if(element.companies.uuid == selectComp){
                    const option = document.createElement("option")
                    option.innerText = element.name
                    option.value = element.uuid
                    selectDepartament.appendChild(option)
                }
            })
            const btnDeletar = document.createElement("button")
            btnDeletar.innerText = "Deletar departamento"
            btnDeletar.classList.add("confirmDelete")
            container.append(selectDepartament,btnDeletar)
            HomePage.deletingDepart()
        })
    }
    static async deletingDepart(){
        const btnDelete = document.querySelector(".confirmDelete")
        btnDelete.addEventListener("click", ()=>{
            const select = document.querySelector(".selectDepartament").value
            Request.deleteDepartament(select)
        })
    }



    static async listAllDepartament(){
        const containerCreate = document.querySelector(".maincontent__departamentInfo")
        const btnListDepartament= document.querySelector(".listDepartament")
        btnListDepartament.addEventListener("click", async ()=>{
            containerCreate.innerHTML= ""
            const companies = await Request.requestAllCompanies()
            const listaCompanies = document.createElement("select")
            listaCompanies.classList.add("listDepartament__companie")
            const btnListDepartament = document.createElement("button")
            btnListDepartament.classList.add("btnListDepartament")
            btnListDepartament.innerText = "Buscar por empresa"
            const ulDepartament = document.createElement("ul")
            ulDepartament.classList.add("mainContent__ulDepartament")
            companies.forEach((element,index)=>{
                if(index === 0){
                    const allCompanies = document.createElement("option")
                    allCompanies.innerText = "Todas empresas"
                    listaCompanies.appendChild(allCompanies)
                }
                const companieName = document.createElement("option")
                companieName.innerText = element.name
                companieName.value = element.uuid
                listaCompanies.appendChild(companieName)
            })
            containerCreate.append(listaCompanies,btnListDepartament,ulDepartament)
            HomePage.listDepartament() 
        })
    }
    static async listDepartament(){
        const select = document.querySelector(".listDepartament__companie")
        const btnSelectDepartament = document.querySelector(".btnListDepartament")
        btnSelectDepartament.addEventListener("click", async ()=>{
           const ulDepartament = document.querySelector(".mainContent__ulDepartament")
           ulDepartament.innerHTML= ""
            if(select.value === "Todas empresas"){
                ulDepartament.classList.remove("column")
                const allDepartament = await Request.listAllDepartamentRequest()
                allDepartament.forEach(element=>{
                    const liDepartament = document.createElement("li")
                    const nameCompanie = document.createElement("p")
                    nameCompanie.innerText = "Empresa:"
                    const name = document.createElement("p")
                    name.innerText = element.companies.name
                    const nameDepartamentP = document.createElement("p")
                    nameDepartamentP.innerText = "Departamento:"
                    const nameDepartament = document.createElement("p")
                    nameDepartament.innerHTML = element.name
                    const descriptionDepartamentP = document.createElement("p")
                    descriptionDepartamentP.innerText = "Descrição:"
                    const descriptionDepartament = document.createElement("p")
                    descriptionDepartament.innerText = element.description
                    liDepartament.append(nameCompanie,name,nameDepartamentP,nameDepartament,descriptionDepartamentP,descriptionDepartament)
                    ulDepartament.appendChild(liDepartament)
                })
            }else{
                ulDepartament.classList.add("column")
                const allDepartament = await Request.listAllDepartamentRequest()
                const selectDepartament = document.createElement("select")
                selectDepartament.classList.add("selectDepartamentForComapanie")
                const buttonSearchDepartament = document.createElement("button")
                buttonSearchDepartament.innerText = "Buscar Departamento"
                const ulDepartamentForCompanie = document.createElement("ul")
                ulDepartamentForCompanie.classList.add("mainContent__departamentForCompanie")
                ulDepartament.append(selectDepartament,buttonSearchDepartament,ulDepartamentForCompanie)
                allDepartament.forEach((element)=>{
                    if(select.value === element.companies.uuid){
                        const selectForCompanie = document.querySelector(".selectDepartamentForComapanie")
                        const optionForCompanie = document.createElement("option")
                        optionForCompanie.innerText = element.name
                        optionForCompanie.value = element.uuid
                        selectForCompanie.appendChild(optionForCompanie)
                        const liDepartament = document.createElement("li")
                        const nameCompanie = document.createElement("p")
                        nameCompanie.innerText = "Empresa:"
                        const name = document.createElement("p")
                        name.innerText = element.companies.name
                        const nameDepartamentP = document.createElement("p")
                        nameDepartamentP.innerText = "Departamento:"
                        const nameDepartament = document.createElement("p")
                        nameDepartament.innerHTML = element.name
                        const descriptionDepartamentP = document.createElement("p")
                        descriptionDepartamentP.innerText = "Descrição:"
                        const descriptionDepartament = document.createElement("p")
                        descriptionDepartament.innerText = element.description
                        liDepartament.append(nameCompanie,name,nameDepartamentP,nameDepartament,descriptionDepartamentP,descriptionDepartament)
                        ulDepartamentForCompanie.appendChild(liDepartament)
                    }
                }) 
                HomePage.listDepartamentSpecifOf()
             }      
        })
    }
    static async listDepartamentSpecifOf(){
        const search = document.querySelector(".mainContent__ulDepartament button")
        search.addEventListener("click", async ()=>{
            const container = document.querySelector(".mainContent__departamentForCompanie")
            container.innerHTML =""
            const allDepartament = await Request.listAllDepartamentRequest()
            allDepartament.forEach(element=>{
                const selectCompanie = document.querySelector(".listDepartament__companie").value
                const selectDepartament = document.querySelector(".selectDepartamentForComapanie").value
                if(element.companies.uuid === selectCompanie){
                    if(element.uuid === selectDepartament){
                        const liDepartament = document.createElement("li")
                        const nameCompanie = document.createElement("p")
                        nameCompanie.innerText = "Empresa:"
                        const name = document.createElement("p")
                        name.innerText = element.companies.name
                        const nameDepartamentP = document.createElement("p")
                        nameDepartamentP.innerText = "Departamento:"
                        const nameDepartament = document.createElement("p")
                        nameDepartament.innerHTML = element.name
                        const descriptionDepartamentP = document.createElement("p")
                        descriptionDepartamentP.innerText = "Descrição:"
                        const descriptionDepartament = document.createElement("p")
                        descriptionDepartament.innerText = element.description
                        liDepartament.append(nameCompanie,name,nameDepartamentP,nameDepartament,descriptionDepartamentP,descriptionDepartament)
                        container.appendChild(liDepartament)   
                    }
                }
            })

        })
    }
    static async renderSectionEmployeer(){
        const user                      = await HomePage.user()
        const employeer = document.querySelector(".bxs-id-card")
        const employeerLabel = document.querySelector(".bxs-id-card-label")
        const mainContainer = document.querySelector(".main__body")
        if(user.is_admin){
        employeer.addEventListener("click",async (event)=>{
            event.preventDefault()
            mainContainer.innerHTML = ""
            const subTitle   = document.createElement("h4")
            subTitle.innerText = "RzenhaHelp > Funcionários"
            subTitle.classList.add("main__subtitle")
            const containerbuttons = document.createElement("div")
            containerbuttons.classList.add("mainContent__containerButtonsEmployeers")
            const listAllEmploy = document.createElement("button")
            listAllEmploy.classList.add("button__listAllEmploy")
            listAllEmploy.innerText = "Funcionários por departamento"
            const contract = document.createElement("button")
            contract.classList.add("button__contract")
            contract.innerText = "Contratar funcionário"
            const dismiss = document.createElement("button")
            dismiss.classList.add("button__dismiss")
            dismiss.innerText = "Demitir funcionário"
            const modifier = document.createElement("button")
            modifier.classList.add("button__modifier")
            modifier.innerText = "Modificar função/cargo"
            const userNot = document.createElement("button")
            userNot.classList.add("button__userNot")
            userNot.innerText = "Usuários sem função/cargo"
            const containerActButton = document.createElement("div")
            containerActButton.classList.add("mainContent__actButtonsEmployeers")
            containerbuttons.append(listAllEmploy,contract,dismiss,modifier,userNot)
            mainContainer.append(subTitle,containerbuttons,containerActButton)
            HomePage.listEmployeerForDepartament()
            HomePage.renderContractEmployeer()
            HomePage.renderDismissEmployeer()
            HomePage.renderModifierWork()
            HomePage.renderUserNotEmployer()
            })
        employeerLabel.addEventListener("click",async (event)=>{
            event.preventDefault()
            mainContainer.innerHTML = ""
            const heading   = document.createElement("h2")
            heading.innerText = "Funcionários"
            const containerbuttons = document.createElement("div")
            containerbuttons.classList.add("mainContent__containerButtonsEmployeers")
            const listAllEmploy = document.createElement("button")
            listAllEmploy.classList.add("button__listAllEmploy")
            listAllEmploy.innerText = "Funcionários por departamento"
            const contract = document.createElement("button")
            contract.classList.add("button__contract")
            contract.innerText = "Contratar funcionário"
            const dismiss = document.createElement("button")
            dismiss.classList.add("button__dismiss")
            dismiss.innerText = "Demitir funcionário"
            const modifier = document.createElement("button")
            modifier.classList.add("button__modifier")
            modifier.innerText = "Modificar função/cargo"
            const userNot = document.createElement("button")
            userNot.classList.add("button__userNot")
            userNot.innerText = "Usuários sem função/cargo"
            const containerActButton = document.createElement("div")
            containerActButton.classList.add("mainContent__actButtonsEmployeers")
            containerbuttons.append(listAllEmploy,contract,dismiss,modifier,userNot)
            mainContainer.append(heading,containerbuttons,containerActButton)
            HomePage.listEmployeerForDepartament()
            HomePage.renderContractEmployeer()
            HomePage.renderDismissEmployeer()
            HomePage.renderModifierWork()
            HomePage.renderUserNotEmployer()
            })
            }else{
                employeer.addEventListener("click", async (event)=>{
                    event.preventDefault()
                    mainContainer.innerHTML       = ""
                    const notPermission = document.createElement("h2")
                    notPermission.innerText = "Você não tem permissão suficiente para navegar por aqui"
                    mainContainer.appendChild(notPermission)
                })
            employeerLabel.addEventListener("click", async (event)=>{
                event.preventDefault()
                mainContainer.innerHTML       = ""
                const notPermission = document.createElement("h2")
                notPermission.innerText = "Você não tem permissão suficiente para navegar por aqui"
                mainContainer.appendChild(notPermission)
                })
            }
        }
    static async listEmployeerForDepartament(){
            const listButton = document.querySelector(".button__listAllEmploy")
            listButton.addEventListener("click",async()=>{
                const users              = await Request.resquestAllUser()
                const container = document.querySelector(".mainContent__actButtonsEmployeers")
                container.innerHTML = ""
                const user = document.createElement("select")
                const renderUser = document.createElement("button")
                renderUser.innerText = "Informações do usuário"
                renderUser.classList.add("button__renderUser")
                const infoEmployer = document.createElement("div")
                infoEmployer.classList.add("mainContent__employeerContent")
                users.forEach( async (element)=>{
                    if(element.department_uuid !== null){
                        const allDepartament = await Request.listAllDepartamentRequest()
                        const filterDepartament = await allDepartament.filter(departament=>{
                            if(departament.uuid === element.department_uuid){
                                return departament
                            }    
                        })
                        const option = document.createElement("option")
                        option.innerText = `${element.username} / ${filterDepartament[0].companies.name}:${filterDepartament[0].name}`
                        option.value    = element.uuid
                        user.appendChild(option)
                    }
                })
                container.append(user,renderUser,infoEmployer)
                HomePage.renderEmployerforDepartament()
            })
    }
    static async renderEmployerforDepartament(){
        const renderUser = document.querySelector(".button__renderUser")
        const selectEmployeer = document.querySelector(".mainContent__actButtonsEmployeers select")
        const container = document.querySelector(".mainContent__employeerContent")
        renderUser.addEventListener("click",async()=>{
            const users              = await Request.resquestAllUser()
            container.innerHTML = ""
            users.forEach(element =>{
                if(element.uuid == selectEmployeer.value){
                    const nameP = document.createElement("p")
                    nameP.innerText = "Nome do funcionário:"
                    const typeWorkP = document.createElement("p")
                    typeWorkP.innerText = "Tipo do trabalho:"
                    const levelWorkP = document.createElement("p")
                    levelWorkP.innerText = "Nível do profissional:"

                    const name = document.createElement("p")
                    name.innerText = element.username
                    const typeWork = document.createElement("p")
                    typeWork.innerText = element.kind_of_work
                    const levelWork = document.createElement("p")
                    levelWork.innerText = element.professional_level
                    container.append(nameP,name,typeWorkP,typeWork,levelWorkP,levelWork)
                }
            })
        })
    }
    static async renderContractEmployeer(){
        const btnSectionContract = document.querySelector(".button__contract")
        const container = document.querySelector(".mainContent__actButtonsEmployeers")
        
        btnSectionContract.addEventListener("click", async()=>{
            container.innerHTML = ""
            const users              = await Request.resquestAllUser()
            const allDepartament = await Request.listAllDepartamentRequest()
            const selectEmployeer = document.createElement("select")
            selectEmployeer.classList.add("select__employeer")
            const selectDepartament = document.createElement("select")
            selectDepartament.classList.add("select__departament")
            const contrat = document.createElement("button")
            contrat.innerText = "Contratar funcionário"
            contrat.classList.add("button__contractEmployeer")
            users.forEach(element=>{
                if(element.department_uuid === null){
                    const optionEmployeer = document.createElement("option")
                    optionEmployeer.innerText = element.username
                    optionEmployeer.value = element.uuid
                    selectEmployeer.appendChild(optionEmployeer)
                }
            })
            allDepartament.forEach(element=>{
                const optionDepartament = document.createElement("option")
                optionDepartament.innerText = `${element.companies.name}: ${element.name}`
                optionDepartament.value = element.uuid
                selectDepartament.appendChild(optionDepartament)
            })
        container.append(selectEmployeer,selectDepartament,contrat)
        HomePage.contractEmployeer()
        })
    }
    static async contractEmployeer(){

        const btnContract = document.querySelector(".button__contractEmployeer")
        btnContract.addEventListener("click",()=>{
            const selectUser = document.querySelector(".select__employeer").value
            const selectDepartament = document.querySelector(".select__departament").value
            const data = {
                    user_uuid: selectUser,
                    department_uuid: selectDepartament
                  }
          Request.requestContractEmployeer(data)
        })
    }
    static async renderDismissEmployeer(){
        const btnSectionDismiss = document.querySelector(".button__dismiss")
        const container = document.querySelector(".mainContent__actButtonsEmployeers")     
        btnSectionDismiss.addEventListener("click", async()=>{
            container.innerHTML = ""
            const users              = await Request.resquestAllUser()
            const selectEmployeer = document.createElement("select")
            selectEmployeer.classList.add("select__employeer")
            const dismiss = document.createElement("button")
            dismiss.innerText = "Demitir funcionário"
            dismiss.classList.add("button__dismissEmployeer")
            users.forEach(element=>{
                if(element.department_uuid !== null){
                    const optionEmployeer = document.createElement("option")
                    optionEmployeer.innerText = element.username
                    optionEmployeer.value = element.uuid
                    selectEmployeer.appendChild(optionEmployeer)
                }
            })
        container.append(selectEmployeer,dismiss)
        HomePage.renderConfirmDepartament()
        })
    }
    static async renderConfirmDepartament(){
        const btnDismiss = document.querySelector(".button__dismissEmployeer")
        const container = document.querySelector(".mainContent__actButtonsEmployeers")
        btnDismiss.addEventListener("click", async ()=>{
            const select = document.querySelector(".select__employeer")
            const employeer = document.querySelector(".select__employeer").value
            const users              = await Request.resquestAllUser()
            users.forEach(async (element) =>{
                if(element.uuid === employeer){
                    const allDepartament = await Request.listAllDepartamentRequest()
                    allDepartament.forEach(depar=>{
                        if(element.department_uuid == depar.uuid){
                            select.disabled = "disabled"
                            const dismiss = document.querySelector(".button__dismissEmployeer")
                            dismiss.classList.add("hidden")
                            const nameDeparP = document.createElement("p")
                            
                            nameDeparP.innerText = `Funcionário da empresa ${depar.companies.name} departamento ${depar.name}.`
                            const confirm = document.createElement("p")
                            confirm.innerText = "Confirma sua demissão ?"
                            const btnOk = document.createElement("button")
                            btnOk.innerText = "Ok"
                            btnOk.classList.add("button__dismissOk")
                            const btnNo = document.createElement("button")
                            btnNo.classList.add("button__dismissNo")
                            btnNo.innerText = "Não"
                            container.append(nameDeparP,confirm,btnOk,btnNo)
                            HomePage.ConfirmDepartament()
                        }
                    })
                }
            })
        })
    }
    static async ConfirmDepartament(){
        const container = document.querySelector(".mainContent__actButtonsEmployeers")  
        const btnOk = document.querySelector(".button__dismissOk")
        const btnNo = document.querySelector(".button__dismissNo")
        btnNo.addEventListener("click",async()=>{
            container.innerHTML = ""
            const users              = await Request.resquestAllUser()
            const selectEmployeer = document.createElement("select")
            selectEmployeer.classList.add("select__employeer")
            const dismiss = document.createElement("button")
            dismiss.innerText = "Demitir funcionário"
            dismiss.classList.add("button__dismissEmployeer")
            users.forEach(element=>{
                if(element.department_uuid !== null){
                    const optionEmployeer = document.createElement("option")
                    optionEmployeer.innerText = element.username
                    optionEmployeer.value = element.uuid
                    selectEmployeer.appendChild(optionEmployeer)
                }
            })
            container.append(selectEmployeer,dismiss)
            HomePage.renderConfirmDepartament()
        })
        btnOk.addEventListener("click",()=>{
            const select = document.querySelector(".select__employeer").value

            Request.requestDismissEmployeer(select)
        })
    }
    static async renderModifierWork(){
        const btnSectionModifier = document.querySelector(".button__modifier")
        const container = document.querySelector(".mainContent__actButtonsEmployeers")     
        btnSectionModifier.addEventListener("click", async()=>{
            container.innerHTML = ""
            const users              = await Request.resquestAllUser()
            const selectEmployeer = document.createElement("select")
            selectEmployeer.classList.add("select__employeer")
            const modifier = document.createElement("button")
            modifier.innerText = "Modificar funcionário"
            modifier.classList.add("button__modifierEmployeer")
            users.forEach(element=>{
                if(element.department_uuid !== null){
                    const optionEmployeer = document.createElement("option")
                    optionEmployeer.innerText = element.username
                    optionEmployeer.value = element.uuid
                    selectEmployeer.appendChild(optionEmployeer)
                }
            })
        container.append(selectEmployeer,modifier)
        HomePage.confirmModifierWork()
        })
    }
    static async confirmModifierWork(){
        const btnModifier = document.querySelector(".button__modifierEmployeer")
        const container = document.querySelector(".mainContent__actButtonsEmployeers") 
        btnModifier.addEventListener("click", async ()=>{
            const select = document.querySelector(".select__employeer")
            const users              = await Request.resquestAllUser()
            users.forEach(element=>{
                if(element.uuid == select.value){
                    btnModifier.classList.add("hidden")
                    select.disabled = "disabled"
                    const cargoP = document.createElement("p")
                    cargoP.innerText = `O funcionário ${element.username} atualmente tem o tipo de trabalho de:`
                    const cargo = document.createElement("input")
                    cargo.classList.add("select__kindWork")
                    cargo.value = element.kind_of_work
                    const nivelP = document.createElement("p")
                    nivelP.innerText = "E, atualmente possui o nível:"
                    const nivel = document.createElement("input")
                    nivel.classList.add("select__level")
                    nivel.value = element.professional_level
                    const modifierOk = document.createElement("button")
                    modifierOk.innerText = "Fazer mudanças"
                    modifierOk.classList.add("button__modifierOk")
                    container.append(cargoP,cargo,nivelP,nivel,modifierOk)
                    HomePage.ModifierWork()
                }
            })
        })
    }

    static async ModifierWork(){
        const btnmodifier = document.querySelector(".button__modifierOk")
       
        btnmodifier.addEventListener("click",()=>{
            
            const select = document.querySelector(".select__employeer").value
            const selectKind = document.querySelector(".select__kindWork").value
            const selectLevel = document.querySelector(".select__level").value
            const data = {
                kind_of_work: selectKind,
                professional_level: selectLevel
            }
            Request.requestModifierEmployeer(select,data)
        })

    }
    static async renderUserNotEmployer(){
        const btnNotEmployeer = document.querySelector(".button__userNot")
        btnNotEmployeer.addEventListener("click",async ()=>{
           
            const container = document.querySelector(".mainContent__actButtonsEmployeers")
            container.innerHTML = ""
            const users              = await Request.resquestAllUser()
            const ul = document.createElement("ul")
            ul.classList.add("UserNotEmployer")
            users.forEach(element=>{
                if(element.department_uuid === null){
                    const li = document.createElement("li")
                    const name = document.createElement("p")
                    name.innerText = element.username
                    li.appendChild(name)
                    ul.appendChild(li)
                }
            })
            container.appendChild(ul)

        })

    }
}

HomePage.renderUser()