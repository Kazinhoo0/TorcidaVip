import { useContext, useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import ContextProducts from "../../../context/ContextProduct";
import Cardfrete from "./Frete/CardFrete";


export default function FreteeResumo ({totalpedido}) {

    const {produtosoncarrinho, setResumoPedido, freteSelecionado, setFreteSelecionado, loading, setLoading} = useContext(ContextProducts);

    const [inputcep, setInputCep] = useState('');

    const [resultado, setResultado]= useState([]);

    const frete = Number(freteSelecionado) || 0;



    useEffect(() => {
        setResumoPedido({
            totalpedido: totalpedido,
            totalpedidowithfrete: (totalpedido + frete).toFixed(2)
        })
    }, [totalpedido, frete])
   
    const handleSelecionarFrete = (preco) => {
        setFreteSelecionado(preco)
    };

    const fetchcalcularFrete = async () => {
        try {
            const qtn = produtosoncarrinho.length
        const response = await fetch("http://localhost:5000/calcular-frete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cep_destino: inputcep,
                    qtnprodoncarrinho : qtn
                }),
            });

            const data = await response.json();
            // console.log('Resultado do frete :',data)
            setResultado(data);
        } catch (error) {
            console.error("Erro ao calcular o frete:", error);
        } 
    }; 
    
    
    return ( 

    <>
        {resultado.length === 0 && (
            <div className="container-freteeresumo">

            <div className="container-frete-empity">

                <div>
                    <header className="title-freteandresumocarrinho">
                        <h3>Frete</h3>
                    </header>

                    <div className="container-inputfrete">
                        <IoHomeOutline style={{position: 'absolute' }}/>
                        <input maxLength={9} onChange={(e) => setInputCep(e.target.value)} className="style-inputcep" placeholder="CEP" type="text" />
                        <button className="btn-calcfrete" onClick={fetchcalcularFrete} >Calcular frete</button>
                        <a style={{marginLeft: '20px'}} href="https://buscacepinter.correios.com.br/app/endereco/index.php">Não sei meu CEP</a>
                    </div>
                </div>
                
            </div>


            <div className="container-resumopedido">
                
                <header className="title-freteandresumocarrinho">
                    <h3>Resumo pedido</h3>
                </header>

                <small style={{display: 'flex', justifyContent: 'space-between', paddingLeft: 23, paddingRight: 20, borderBottom: '3px solid grey'}}>
                    <small>Subtotal</small>
                    <small>R${totalpedido.toFixed(2)}</small>
                </small>

                {freteSelecionado && (
                    <small style={{display: 'flex', justifyContent: 'space-between', paddingLeft: 23, paddingRight: 20, borderBottom: '3px solid grey'}}>
                        <small>Frete</small>
                        <small>R${frete?.toFixed(2)}</small>
                    </small>
                )}

                <small style={{display: 'flex', justifyContent: 'space-between', paddingLeft: 23, paddingRight: 20}}>

                    <small>
                        Total do pedido
                    </small>

                    <smal>
                        <small>R${(totalpedido + frete).toFixed(2)}</small><br/>
                    </smal>
                </small>
            </div>
            </div>
        )}
       

        {resultado.length > 0 && (
            <div className="container-freteeresumo-full">

               <div className="container-frete-full">
   
                   <div>
                       <header className="title-freteandresumocarrinho">
                           <h3>Frete</h3>
                       </header>
   
                       <div className="container-inputfrete">
                           <IoHomeOutline style={{position: 'absolute' }}/>
                           <input maxLength={8} max={8} onChange={(e) => setInputCep(e.target.value)} className="style-inputcep" placeholder="CEP" type="text" />
                           <button className="btn-calcfrete" onClick={fetchcalcularFrete} >Calcular frete</button>
                           <a style={{marginLeft: '20px'}} href="https://buscacepinter.correios.com.br/app/endereco/index.php">Não sei meu CEP</a>
                       </div>
                   </div>
   
                    <div className="container-responsecalcdiv">
                        {resultado.map((resultado, index) => {
                            return <Cardfrete onSelectFrete={handleSelecionarFrete} key={index} resultado={resultado}/>
                        })}
                    </div>
                 
               </div>
   
   
               <div className="container-resumopedido">
                  
                    <header className="title-freteandresumocarrinho">
                        <h3>Resumo pedido</h3>
                    </header>
                    
                    <small style={{display: 'flex', justifyContent: 'space-between', paddingLeft: 23, paddingRight: 20, borderBottom: '3px solid grey'}}>
                        <small>Subtotal</small>
                        <small>R${totalpedido.toFixed(2)}</small>
                    </small>

                    {freteSelecionado && (
                        <small style={{display: 'flex', justifyContent: 'space-between', paddingLeft: 23, paddingRight: 20, borderBottom: '3px solid grey'}}>
                            <small>Frete</small>
                            <small>R${frete?.toFixed(2)}</small>
                        </small>
                    )}

                    <small style={{display: 'flex', justifyContent: 'space-between', paddingLeft: 23, paddingRight: 20}}>
                        <smal>
                            Total do pedido
                        </smal>
    
                        <smal>
                            <small>R${(totalpedido + frete).toFixed(2)}</small><br/>
                        </smal>
                    </small>

                </div>

           </div> 
        )}          
    </>

    
    )
}