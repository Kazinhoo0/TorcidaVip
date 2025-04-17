import Favotireproduct from "../../Favorite/FavoriteProductEmpity";
import InfoAtendimentos from "../Index/InfoAtendimentos";
import InfoSite from "../Index/InfoSite";
import TopFlap from "../Index/TopFlap";
import ComponentAreaTorcedor from "./ComponentAreaTorcedor";
import ComponentCadastro from "../Register/ComponentCadastro";
import ComponentLogin from "./ComponentLogin";
import './login.css';
import { Helmet } from "react-helmet";
import ContextProducts from "../../../context/ContextProduct";
import { useContext, useEffect } from "react";


export default function PagLogin () {
    
    const {setLoading,loading } = useContext(ContextProducts);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [setLoading])

    if (loading) {
        return <div style={{ width: '100%', height: '1000px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
          <div className="spinner"></div>
        </div>
    };

    return (
        <>
            {loading ? (
                <div style={{ width: '100%', height: '1000px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="container-login-register">
                    <Helmet>
                        <title>Torcida Vip | Entre na sua conta</title>
                    </Helmet>

                    <TopFlap />
                    
                    <ComponentAreaTorcedor />

                    <div className="container-sun-login">
                        <ComponentLogin />
                        <ComponentCadastro />    
                    </div>

                    <InfoSite customTop={0} />
                    <InfoAtendimentos customcopyrightcontainer={0} customTop={50} />
                </div>
            )}
        
        </>
    )
}