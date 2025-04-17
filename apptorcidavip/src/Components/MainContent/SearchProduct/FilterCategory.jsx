import { useContext, useEffect, useState } from "react";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import ContextProducts from "../../../context/ContextProduct";



export default function FilterCategory ({nameitem}) {

    const {setProductsFiltred, filterstate, setFilterState} = useContext(ContextProducts)
    
    const handleChooseState = (FilterName, value) => {

        setFilterState(prev => {
            const currentValues = prev[FilterName];
            const newValues = currentValues.includes(value) ?
            currentValues.filter(v => v !== value) :
            [...currentValues, value];

            return {...prev, [FilterName]: newValues}
        })
    
    }

    console.log('CATERIAS E VALORES ESCOLHIDOS:' , filterstate);

    useEffect(() => {

        const handlefilterproduct = async () => {
            try {
                const response = await fetch ('http://localhost:5000/api/get/filterproducts' , {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                       filterstate: filterstate,
                       nameitem: nameitem
                    })
                });

                const data = await response.json()
                console.log('PRODUTOS FILTRADOS NO FRONTEND:', data)
                if(data.success) {
                    setProductsFiltred(data.filterproducts);
                    console.log('Produtos filtrados com sucesso')
                }

                if (!response) {
                    Toastify({
                        text: 'Falha ao filtrar produto',
                        position: 'center',
                        style: {
                            background: '#db2d0e',
                            color: '#ffffff'
                        }
                    }).showToast();
                }


            } catch (err) {
                console.log('ERRO:', err)
                Toastify({
                    text: 'Falha ao filtrar produto' || err,
                    position: 'center',
                    style: {
                        background: '#db2d0e',
                        color: '#ffffff'
                    }
                }).showToast();
            }
        }

        handlefilterproduct();
    }, [filterstate])
   

    useEffect(() => {
        console.log('CATERIAS E VALORES ESCOLHIDOS:' , filterstate);
    }, [filterstate])


    const [isbuttonclicked, setisbuttonactivated] = useState({
        categoria: false,
        tamanho: false,
        marca: false,
        acessorios: false,
        genero: false,
        idade: false,
        cor: false,
        esporte: false
    });

    const openfilter = (filtername) => {
        setisbuttonactivated((prevFilters) => ({
            ...prevFilters,
            [filtername]: !prevFilters[filtername],
        }))
    }

    return (

        <div className='container-filtercategory'>

            <ul className="search-filters">

                {/* <label onClick={() =>  openfilter('categoria')} htmlFor="">

                    <span>Categoria</span>

                    <span>+</span>
                   
                </label> */}

                {/* {isbuttonclicked.categoria && (
                    <>
                        <input placeholder="Buscar..." className="input-search-filters"  type="text" />
                        <ul className="options-filter" >
                            <li>
                                <input 
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={() => handleChooseState('categoria', 'Camisas de time')}
                                />
                                <span className="text-filter-search">Camisas de time</span>
                            </li>
                            <li>
                                <input 
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={() => handleChooseState('categoria', 'Flamengo')}
                                />
                                <span className="text-filter-search">Flamengo</span>
                            </li>
                            <li>
                                <input 
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={() => handleChooseState('categoria', 'Vasco')}
                                />
                                <span className="text-filter-search">Vasco</span>
                            </li>
                            <li>
                                <input 
                                    type="checkbox"
                                    name="" 
                                    id=""
                                    onChange={() => handleChooseState('categoria', 'Fluminense')}
                                />
                                <span className="text-filter-search">Fluminense</span>
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={() => handleChooseState('categoria', 'Botafogo')}
                                />
                                <span className="text-filter-search">Botafogo</span>
                            </li>
                            <li></li>
                        </ul>
                    </>                      
                )} */}


                {/* <label onClick={() =>  openfilter('acessorios')} htmlFor="acessorios">

                <span>Acessórios</span>

                <span >+</span>
                </label> */}
                {/* 
                    {isbuttonclicked.acessorios && (
                    <>
                        <input placeholder="Buscar..." className="input-search-filters"  type="text" />
                        <ul className="options-filter" >
                            <li>
                                <input 
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={() => handleChooseState('acessorios' , 'Futebol')}
                                   />
                                <span className="text-filter-search">Futebol</span>
                            </li>
                            <li>
                                <input 
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={() => handleChooseState('acessorios' , 'Basquete')}
                                   />
                                <span className="text-filter-search">Basquete</span>
                            </li>
                            <li>
                                <input 
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={() => handleChooseState('acessorios' , 'Corrida')}
                                   />
                                <span className="text-filter-search">Corrida</span>
                            </li>
                            <li>
                                <input 
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={() => handleChooseState('acessorios' , 'Fitness e musculação')}
                                   />
                                <span className="text-filter-search">Fitness e musculação</span>
                            </li>
                        </ul>
                    </>                      
                    )} */}


                    <label onClick={() =>  openfilter('cor')} htmlFor="">

                        <span>Cor</span>

                        <span>+</span>
                      
                    </label>

                        {isbuttonclicked.cor && (
                        <>
                            <ul className="options-filter" >
                                <li>
                                    <small style={{background: 'black'}} className="container-filter-cor"></small>
                                    <span className="text-filter-search">Preto</span>
                                </li>
                                <li>
                                    <small style={{background: 'red'}} className="container-filter-cor"  type="checkbox" name="" id="" />
                                    <span className="text-filter-search">Vermelho</span>
                                </li>
                                <li>
                                    <small style={{background: 'yellow'}} className="container-filter-cor"  type="checkbox" name="" id="" />
                                    <span className="text-filter-search">Amarelo</span>
                                </li>
                                <li>
                                    <small style={{background: 'white'}} className="container-filter-cor"  type="checkbox" name="" id="" />
                                    <span className="text-filter-search">Branco</span>
                                </li>
                                <li>
                                    <small style={{background: 'grey'}} className="container-filter-cor"  type="checkbox" name="" id="" />
                                    <span className="text-filter-search">Cinza</span>
                                </li>
                                <li>
                                    <small style={{background: 'black'}} className="container-filter-cor"  type="checkbox" name="" id="" />
                                    <span className="text-filter-search">Marrom</span>
                                </li>
                                <li>
                                    <small style={{background: 'green'}} className="container-filter-cor"  type="checkbox" name="" id="" />
                                    <span className="text-filter-search">Verde</span>
                                </li>
                                <li></li>
                            </ul>
                        </>                      
                        )}


                <label onClick={() =>  openfilter('tamanho')} htmlFor="">

                <span>Tamanho</span>

                <span>+</span>
                {/* <img src="" alt="" /> */}
                </label>

                {isbuttonclicked.tamanho && (
                <>
                    <ul className="options-filter" >
                        <li>
                            <input 
                            type="checkbox"
                            name="P"
                            onChange={() => handleChooseState('tamanho', 'P')}
                               />
                            <span className="text-filter-search">P</span>
                        </li>
                        <li>
                            <input 
                            type="checkbox"
                            name="M"
                            onChange={() => handleChooseState('tamanho', 'M')}
                               />
                            <span className="text-filter-search">M</span>
                        </li>
                        <li>
                            <input 
                            type="checkbox"
                            name="G"
                            onChange={() => handleChooseState('tamanho', 'G')}
                               />
                            <span className="text-filter-search">G</span>
                        </li>
                        <li>
                            <input 
                            type="checkbox"
                            name="GG"
                            onChange={() => handleChooseState('tamanho', 'GG')}
                               />
                            <span className="text-filter-search">GG</span>
                        </li>
                        <li>
                            <input 
                            type="checkbox"
                            name="XG"
                            onChange={() => handleChooseState('tamanho', 'XG')}
                               />
                            <span className="text-filter-search">XG</span>
                        </li>
                    </ul>
                </>                      
                )}


                <label onClick={() => openfilter('marca')} htmlFor="">

                <span>Marca</span>

                <span >+</span>
                {/* <img src="" alt="" /> */}
                </label>

                {isbuttonclicked.marca && (
                <>
                    <input placeholder="Buscar..." className="input-search-filters"  type="text" />
                    <ul className="options-filter" >
                        <li>
                            <input 
                                type="checkbox"
                                name=""
                                id=""
                                onChange={() => handleChooseState('marca', 'Nike')}
                            />
                            <span className="text-filter-search">Nike</span>
                        </li>
                        <li>
                            <input 
                                type="checkbox"
                                name=""
                                id=""
                                onChange={() => handleChooseState('marca', 'Adidas')}
                            />
                            <span className="text-filter-search">Adidas</span>
                        </li>
                        <li>
                            <input 
                                type="checkbox"
                                name=""
                                id=""
                                onChange={() => handleChooseState('marca', 'Under Armour')}
                            />
                            <span className="text-filter-search">Under Armour 
                            </span>
                        </li>
                        <li>
                            <input 
                                type="checkbox"
                                name=""
                                id=""
                                onChange={() => handleChooseState('marca', 'Braziline')}
                            />
                            <span className="text-filter-search">Braziline</span>
                        </li>

                        <li>
                            <input 
                                type="checkbox"
                                name=""
                                id=""
                                onChange={() => handleChooseState('marca', 'Torcida baby')}
                            />
                            <span className="text-filter-search">Torcida baby</span>
                        </li>
                        <li>
                            <input 
                                type="checkbox"
                                name=""
                                id=""
                                onChange={() => handleChooseState('marca', 'Umbro')}
                            />
                            <span className="text-filter-search">Umbro</span>
                        </li>

                        <li>
                            <input 
                                type="checkbox"
                                name=""
                                id=""
                                onChange={() => handleChooseState('marca', 'Kappa')}
                            />
                            <span className="text-filter-search">Kappa</span>
                        </li>
                    </ul>
                </>                      
                )}




                <label onClick={() =>  openfilter('genero')} htmlFor="">

                <span>Gênero</span>

                <span>+</span>
                {/* <img src="" alt="" /> */}
                </label>

                    {isbuttonclicked.genero && (
                    <>
                        <ul className="options-filter" >
                            <li>
                                <input  
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={() => handleChooseState('genero', 'Feminino')}
                                   />
                                <span className="text-filter-search">Feminino</span>
                            </li>
                            <li>
                                <input 
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={() => handleChooseState('genero', 'Masculino')}
                                   />
                                <span className="text-filter-search">Masculino</span>
                            </li>
                            <li>
                                <input 
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={() => handleChooseState('genero', 'Unissex')}
                                   />
                                <span className="text-filter-search">Unissex</span>
                            </li>
                            <li></li>
                        </ul>
                    </>                      
                    )}



                    {/* <label onClick={() =>  openfilter('idade')} htmlFor="">

                    <span>Idade</span>

                    <span>+</span>
                   
                    </label> */}
{/* 
                        {isbuttonclicked.idade && (
                        <>
                            <ul className="options-filter" >
                                <li>
                                    <input type="checkbox" name="" id="" />
                                    <span className="text-filter-search">3 a 8 anos</span>
                                </li>
                                <li>
                                    <input type="checkbox" name="" id="" />
                                    <span className="text-filter-search">Adulto</span>
                                </li>
                                <li>
                                    <input type="checkbox" name="" id="" />
                                    <span className="text-filter-search">Infantil</span>
                                </li>
                                <li></li>
                            </ul>
                        </>                      
                        )} */}

                
                    {/* <label onClick={() =>  openfilter('esporte')} htmlFor="">

                        <span>Esporte</span>

                        <span >+</span>
                 
                    </label> */}

                    {/* {isbuttonclicked.esporte && (
                        <>
                            <input placeholder="Buscar..." className="input-search-filters"  type="text" />
                            <ul className="options-filter" >
                                <li>
                                    <input type="checkbox" name="" id="" />
                                    <span className="text-filter-search">Futebol</span>
                                </li>
                                <li>
                                    <input type="checkbox" name="" id="" />
                                    <span className="text-filter-search">Basquete</span>
                                </li>
                                <li>
                                    <input type="checkbox" name="" id="" />
                                    <span className="text-filter-search">Corrida</span>
                                </li>
                                <li>
                                    <input type="checkbox" name="" id="" />
                                    <span className="text-filter-search">Fitness e musculação</span>
                                </li>
                            </ul>
                        </>                      
                    )} */}

            </ul>

            <ul>


            </ul>

        </div>

    )
}