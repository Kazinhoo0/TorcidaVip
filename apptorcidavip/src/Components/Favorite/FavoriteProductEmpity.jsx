
import './favoriteproduct.css';
import { IoMdClose } from "react-icons/io";
import cartfavorit from '../../imgs/add-to-favorites.png'


export default function FavotireProductEmpity ({handlefavoriteopened}) {

    

    return ( 
            <>
                <div className='container-boxshadow'>
                <div className='container-favoriteproduct'>
                    <div className='tittle-and-close'>

                        <div style={{ width: 350,paddingLeft: '20px',textAlign: 'start',display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0, padding: 0, margin: 0}}>
                            <h3 style={{padding: 0, paddingLeft: '20px', margin: '0px'}}>Lista de Desejos</h3>
                            <h6 style={{padding: 0, paddingLeft: '20px', margin: '0px', color: 'grey'}}>Favorite produtos para todos os momentos</h6>
                        </div>
                    

                        <div onClick={handlefavoriteopened} style={{width: '350px', display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                            <IoMdClose color='grey' className='closepage-style' />
                        </div>

                    </div>

                    <div className=''>
                        <div className='img-carrinho-empty-or-full'>
                            <img src={cartfavorit} alt="" />
                        </div>

                        <div className='infos-favorite'>
                            <h4 style={{padding: '0px'}}>Você não possui nenhum produto <br/>
                            favoritado? Nunca é tarde para começar.
                            </h4>

                            <small style={{paddingbottom: '0px', paddingTop: '0px', color: 'grey', fontWeight: '600px'}}>Para favoritar os seus produtos, basta apenas clicar <br/> no que ele será salvo aqui.</small>
                        </div>

                        <div className='cont-btn-acessarminhaconta'>
                            <button>Acessar minha conta</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
                    
        
    )
}