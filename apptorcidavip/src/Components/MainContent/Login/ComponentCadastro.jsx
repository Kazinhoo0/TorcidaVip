import { useNavigate } from "react-router-dom"


export default function ComponentCadastro () {


    const navigate = useNavigate();

    const handlenavigateregister = () => {
        navigate('/register')
    }   


    return (
        <div className="container-inputs">
            <h2 className='titleloginregister'>CADASTRO DE USUÁRIO</h2>

            <form action="">
                <input placeholder="NOME" className="inputs-style" type="text" />

                <input placeholder="ENDEREÇO DE E-MAIL"  className="inputs-style" type="password" />

            </form>

            <div className="container-infonewpassword">
                <p className="style-infonewpassword">Um link para definir uma nova senha será enviado para seu endereço de e-mail.</p>

                <p className="style-infonewpassword">Seus dados pessoais serão usados para aprimorar a sua experiência em todo este site, para gerenciar o acesso a sua conta e para outros propósitos, como descritos em nossa política de privacidade.</p>
            </div>

            <div className='container-buttonentrar'>
                <button onClick={handlenavigateregister} className="buttonentrar-style">CADASTRE-SE</button>
            </div>
        </div>
    )
}