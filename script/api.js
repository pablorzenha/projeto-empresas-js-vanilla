
export class Request{
    static baseURL = "http://localhost:6278/"
    static token = localStorage.getItem("@KenzieEmpresas:token")

    static async requestUser(body){
        
       const login = await fetch(`${Request.baseURL}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(resp => {
            localStorage.setItem("@KenzieEmpresas:user_uuid",resp.uuid)
            localStorage.setItem("@KenzieEmpresas:token",resp.token)
            if(localStorage.getItem("@KenzieEmpresas:user_uuid") !== "undefined"){

              window.location.assign("../homepage/homepage.html")
            }else{ 
              const modal = document.querySelector(".modal__background")
              modal.classList.remove("hidden")
                localStorage.removeItem("@KenzieEmpresas:user_uuid",resp.uuid)
                localStorage.removeItem("@KenzieEmpresas:token",resp.token)         
            }
        })
        .catch(err=>console.log(err))
        return login
    }


    static async requestRegister(body){
        const register = await fetch(`${Request.baseURL}auth/register/user`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(resp => {
                if(resp.error){
                  const modal = document.querySelector(".modal__background__register")
                  modal.classList.remove("hidden")
                    console.log(resp)
                }else{
                    window.location.assign("./index.html")
                }
            })
            .catch(resp => console.log(resp))


        return register
    }
    static async resquestAllUser(){
        const dataUser = await fetch(`http://localhost:6278/users`,{
            method: 'GET',
            headers: {
              Authorization: `Bearer ${Request.token}`
            }
          })
          .then(resp=>resp.json())
          .then(resp=>resp)
          .catch(err=> console.log(err,"po"))

        return dataUser
    }
    
    static async renderProfile(){
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Request.token}`
        }
      };
      
      const request = await fetch('http://localhost:6278/users/profile', options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
      
      return request
    }
    static async resquestAllsectors(){
        const dataSector = await fetch(`http://localhost:6278/sectors`,{
            method: 'GET',
            headers: {
              Authorization: `Bearer ${Request.token}`
            }
          })
          .then(resp=>resp.json())
          .then(resp=>resp)
          .catch(err=> console.log(err))

        return dataSector
    }
    static async requestAllCompanies(){
        const dataCompanies = await fetch(`http://localhost:6278/companies`,{
            method: 'GET',
            headers: {
              Authorization: `Bearer null`
            }
          })
          .then(resp=>resp.json())
          .then(resp=>resp)
          .catch(err=> console.log(err))

        return dataCompanies
    }
    static async registerCompanie(body){
        const dataCompanies = await fetch(`http://localhost:6278/companies`,{
            method: 'POST',
            headers: {
                "Content-Type"  :"application/json",
                Authorization : `Bearer ${Request.token}`
            },
            body: JSON.stringify(body)

          })
          .then(resp=>resp.json())
          .then(resp=>{
            window.location.assign("./homepage.html")
          })
          .catch(err=> console.log(err))
    }
    static async createRequest(body){
        const options = {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${Request.token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          };
          
          const create = await fetch('http://localhost:6278/departments', options)
            .then(response => response.json())
            .then(response =>  {
              window.location.assign("./homepage.html")
            })
            .catch(err => console.log(err));
    }

    static async listAllDepartamentRequest(){
      const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTQxMDRiMGUtYjc2YS00MDA2LWI0MmUtOWNhMmJiOTRlMjE3IiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2Mjk4NzEwOSwiZXhwIjoxNjYzODUxMTA5LCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.QAIJdtnbEwS9LU31Ge02mCo_v9WmnlD8plOfb6b9IAE'
        }
      };
      
      const request = await fetch('http://localhost:6278/departments', options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));

        return request
    }

    static async requestContractEmployeer(data){
        const options = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Request.token}`
            },
            body: JSON.stringify(data)
          };
          
          const request = await fetch('http://localhost:6278/departments/hire/', options)
            .then(response => response.json())
            .then(response => {
              window.location.assign("./homepage.html")
            })
            .catch(err => console.error(err));
        
        return request
    }
    static async requestDismissEmployeer(id){
        const option = {
            method: "PATCH",
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Request.token}`
            }
        }
        const request = await fetch(`http://localhost:6278/departments/dismiss/${id}`, option)
            .then(response => response.json())
            .then(response => {
              window.location.assign("./homepage.html")
            })
            .catch(err =>  console.error(err))
        
        return request
    }
    static async requestModifierEmployeer(id,data){
        const options = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Request.token}`
            },
            body: JSON.stringify(data)
          };
          
          const request = await fetch(`http://localhost:6278/admin/update_user/${id}`, options)
            .then(response => response.json())
            .then(response => {
              window.location.assign("./homepage.html")
            })
            .catch(err => console.error(err));
    }
    static async requestCoWorkers(){
        const options = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${Request.token}`
            }
          };
          
          const request = await fetch('http://localhost:6278/users/departments/coworkers', options)
            .then(response => response.json())
            .then(response => response)
            .catch(err => console.error(err));
          return request
        }
    static async requestUserProfile(){
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Request.token}`
        }
      };
      
      const request = await fetch('http://localhost:6278/users/profile', options)
        .then(response => response.json())
        .then(response => response)
        
        return request
    }
    static async requestEditUser(data){
      const options = {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${Request.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      
      const request = await fetch('http://localhost:6278/users', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
        return request
    }
    static async deleteDepartament(depart){
      const option = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Request.token}`,
          "Content-Type": "application/json"
        }
      }

      const request = await fetch(`http://localhost:6278/departments/${depart}`, option)
        .then(resp=>{
          window.location.assign("./homepage.html")
        })
        .catch(err=>console.log(err))

        return request
    }
}
