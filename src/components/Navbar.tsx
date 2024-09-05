import BrandLogo from "../assets/Images/Brand-logo.png"
const Navbar:React.FC=()=>{
    return(
       <nav className="flex w-full h-16 bg-white pl-[89px] items-center">
        <img src={BrandLogo} alt="brand-logo"  className="h-10 w-20" />
       </nav>
    )
}

export default Navbar