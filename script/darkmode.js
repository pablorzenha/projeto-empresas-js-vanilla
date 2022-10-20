class DarkMode{
    static DarkModeOn(){
        const chk = document.querySelector("#chk")
        chk.addEventListener('change',()=>{
            const homeContent = document.querySelector(".homeContent")
            const header = document.querySelector(".main__header")
            homeContent.classList.toggle("darkMode")
            header.classList.toggle("darkMode")  
        })
    }
}
DarkMode.DarkModeOn()
