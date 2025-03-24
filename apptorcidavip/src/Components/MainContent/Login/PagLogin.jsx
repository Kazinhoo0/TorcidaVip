import Favotireproduct from "../../Favorite/FavoriteProductEmpity";
import InfoAtendimentos from "../Index/InfoAtendimentos";
import InfoSite from "../Index/InfoSite";
import TopFlap from "../Index/TopFlap";
import ComponentAreaTorcedor from "./ComponentAreaTorcedor";
import ComponentCadastro from "../Register/ComponentCadastro";
import ComponentLogin from "./ComponentLogin";
import './login.css';
import { Helmet } from "react-helmet";





export default function PagLogin () {


    return (
      
        <div className="container-login-register">

            <Helmet>
                <title>Torcida Vip | Entre na sua conta</title>
            </Helmet>

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