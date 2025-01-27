import './userprofile.css';



export default function EditProfile () {
    



    return ( 
            <>

                <div className='sunprofile-right'>

                        <h2 className='font-title-profilepage2'>Perfil do Usuário</h2>

                        <form style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} action="">

                            <div style={{display: 'grid'}}>
                                <span className='font-text-profilepage'>Nome</span>
                                <input className='style-inputs-profile' type="text" />
                            </div>

                            <div style={{display: 'grid'}}>
                                <span className='font-text-profilepage'>Sobrenome</span>
                                <input className='style-inputs-profile' type="text" />
                            </div>
                
                        </form>

                        <form className='form-profilestyle' action="">
                            <span className='font-text-profilepage'>Nome de exebição</span>
                            <input className='style-inputs-profile2' type="text" />
                            <span className='font-text-profilepage'>Endereço de e-mail</span>
                            <input className='style-inputs-profile2' type="text" />
                            <span className='font-text-profilepage'>Telefone</span>
                            <input className='style-inputs-profile2' type="text" />
                        </form>

                    </div>

                    <div className='sunprofile-right'>
                        <h2 className='font-title-profilepage2'>Alteração de Senha</h2>

                        <form className='form-profilestyle' action="">
                            <span className='font-text-profilepage2'>Senha atual (mantenha em branco para não alterar)</span>
                            <input className='style-inputs-profile2' type="text" />
                            <span className='font-text-profilepage2'>Nova senha (mantenha em branco para não alterar)</span>
                            <input className='style-inputs-profile2' type="text" />
                            <span className='font-text-profilepage2'>Confirmar nova senha</span>
                            <input className='style-inputs-profile2' type="text" />

                            <div className='container-buttonentrar'>
                                <button className='buttonentrar-style' >SALVAR ALTERAÇÕES</button>
                            </div>

                        </form>

                            
                </div>

            </>
    )
}