function sidebar(){
    const btn = document.querySelector("#btn");
    const bxSearch = document.querySelector(".bx-search")
    const userOper = document.querySelector(".bx-userlabel")
    const sectorOpen = document.querySelector(".bx-folder-open-label")
    const companieOpen = document.querySelector(".bxs-buildingslabel")
    const departamentOpen = document.querySelector(".bx-chart-label")
    const employeerOpen = document.querySelector(".bxs-id-card-label")
    const sidebar = document.querySelector(".sidebar")
    const home = document.querySelector(".homeContent")
    const darkMode = document.querySelector(".iconDarkMode")
    const dashboard = document.querySelector(".bx-grid-altLabel")

    dashboard.addEventListener("click",()=>{
        sidebar.classList.toggle("active")
        home.classList.toggle("active")
        darkMode.classList.toggle("hidden")
    })

    btn.addEventListener("click", ()=>{
        sidebar.classList.toggle("active")
        home.classList.toggle("active")
        darkMode.classList.toggle("hidden")
    })
    bxSearch.addEventListener("click",()=>{
        sidebar.classList.toggle("active")
        home.classList.toggle("active")
        darkMode.classList.toggle("hidden")
    })
    userOper.addEventListener("click",()=>{
        sidebar.classList.toggle("active")
        home.classList.toggle("active")
        darkMode.classList.toggle("hidden")
    })
    sectorOpen.addEventListener("click",()=>{
        sidebar.classList.toggle("active")
        home.classList.toggle("active")
        darkMode.classList.toggle("hidden")
    })
    companieOpen.addEventListener("click",()=>{
        sidebar.classList.toggle("active")
        home.classList.toggle("active")
        darkMode.classList.toggle("hidden")
    })
    departamentOpen.addEventListener("click",()=>{
        sidebar.classList.toggle("active")
        home.classList.toggle("active")
        darkMode.classList.toggle("hidden")
    })
    employeerOpen.addEventListener("click",()=>{
        sidebar.classList.toggle("active")
        home.classList.toggle("active")
        darkMode.classList.toggle("hidden")
    })
}
sidebar()