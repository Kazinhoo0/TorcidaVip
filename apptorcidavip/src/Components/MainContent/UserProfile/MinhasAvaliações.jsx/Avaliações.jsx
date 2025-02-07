import './Avaliações.css';
import Cardavaliacoes from './cardavaliacoes';


export default function Minhasavaliacoes () {

    return (

        <div className="container-avaliacoes">

            <div className='title-avaliacoes'>
                <h3>Avaliações</h3>
            </div>

            <div className='realizadas-pendentes'>
                <a style={{ padding: 13, textDecoration: 'none', color: 'black'}} href="">Pendentes</a>
                <a style={{ padding: 13, textDecoration: 'none', color: 'black'}} href="">Realizações</a>
            </div>
            

            <div className='cont-cards-avaliacoes'>
                <Cardavaliacoes/>
                <Cardavaliacoes/>
            </div>

    
        </div>
    )
}