import './register.css';
import TopFlapRegister from "./TopFlapRegister";
import Dadospessoais from "./DadosPessoais";
import { useState } from 'react';
import DadosEntrega from './DadosDeEntrega';





export default function Register () {

    const [nextpage, setnextpage] = useState(false)


    const handlepressnextpage = () => {
        setnextpage(!nextpage)
    }

    return ( 

        <div className="container-registernewuser" >
            
            <TopFlapRegister/>

            <div className="sun-registernewuser">
                {nextpage ? <DadosEntrega/> : <Dadospessoais buttonclicked={handlepressnextpage}/>}
            </div>    

        </div>

    )
}