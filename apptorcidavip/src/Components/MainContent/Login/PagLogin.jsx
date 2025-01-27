import Favotireproduct from "../../Favorite/FavoriteProductEmpity";
import InfoAtendimentos from "../Index/InfoAtendimentos";
import InfoSite from "../Index/InfoSite";
import TopFlap from "../Index/TopFlap";
import ComponentAreaTorcedor from "./ComponentAreaTorcedor";
import ComponentCadastro from "./ComponentCadastro";
import ComponentLogin from "./ComponentLogin";
import './login.css';






export default function PagLogin () {


    return (
      
        <div className="container-login-register">

            <TopFlap/>
            
            <ComponentAreaTorcedor/>

            <div className="container-sun-login">

                <ComponentLogin/>
                
                <ComponentCadastro/>    
            
            </div>

           
            <InfoSite customTop={1150} />

            <InfoAtendimentos customcopyrightcontainer={1700} customTop={1300}/>

            
            


        </div>
        
       
    )
}