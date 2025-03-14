import { useState } from "react"



export default function FilterCategory () {

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

                <label onClick={() =>  openfilter('categoria')} htmlFor="">

                    <span>Categoria</span>

                    <span>+</span>
                    {/* <img src="" alt="" /> */}
                </label>

                {isbuttonclicked.categoria && (
                    <>
                        <input placeholder="Buscar..." className="input-search-filters"  type="text" />
                        <ul className="options-filter" >
                            <li>
                                <input type="checkbox" name="" id="" />
                                <span className="text-filter-search">Camisas de time</span>
                            </li>
                            <li>
                                <input type="checkbox" name="" id="" />
                                <span className="text-filter-search">Flamengo</span>
                            </li>
                            <li>
                                <input type="checkbox" name="" id="" />
                                <span className="text-filter-search">Vasco</span>
                            </li>
                            <li>
                                <input type="checkbox" name="" id="" />
                                <span className="text-filter-search">Fluminense</span>
                            </li>
                            <li>
                                <input type="checkbox" name="" id="" />
                                <span className="text-filter-search">Botafogo</span>
                            </li>
                            <li></li>
                        </ul>
                    </>                      
                )}


                <label onClick={() =>  openfilter('acessorios')} htmlFor="">

                <span>Acessórios</span>

                <span >+</span>
                {/* <img src="" alt="" /> */}
                </label>

                    {isbuttonclicked.acessorios && (
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
                            <input type="checkbox" name="" id="" />
                            <span className="text-filter-search">P</span>
                        </li>
                        <li>
                            <input type="checkbox" name="" id="" />
                            <span className="text-filter-search">M</span>
                        </li>
                        <li>
                            <input type="checkbox" name="" id="" />
                            <span className="text-filter-search">G</span>
                        </li>
                        <li>
                            <input type="checkbox" name="" id="" />
                            <span className="text-filter-search">GG</span>
                        </li>
                        <li>
                            <input type="checkbox" name="" id="" />
                            <span className="text-filter-search">XG</span>
                        </li>
                        <li></li>
                    </ul>
                </>                      
                )}


                <label onClick={() =>  openfilter('marca')} htmlFor="">

                <span>Marca</span>

                <span >+</span>
                {/* <img src="" alt="" /> */}
                </label>

                {isbuttonclicked.marca && (
                <>
                    <input placeholder="Buscar..." className="input-search-filters"  type="text" />
                    <ul className="options-filter" >
                        <li>
                            <input type="checkbox" name="" id="" />
                            <span className="text-filter-search">Nike</span>
                        </li>
                        <li>
                            <input type="checkbox" name="" id="" />
                            <span className="text-filter-search">Adidas</span>
                        </li>
                        <li>
                            <input type="checkbox" name="" id="" />
                            <span className="text-filter-search">Puma</span>
                        </li>
                        <li>
                            <input type="checkbox" name="" id="" />
                            <span className="text-filter-search">Fila</span>
                        </li>
                        <li></li>
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
                                <input  type="checkbox" name="" id="" />
                                <span className="text-filter-search">Feminino</span>
                            </li>
                            <li>
                                <input type="checkbox" name="" id="" />
                                <span className="text-filter-search">Masculino</span>
                            </li>
                            <li>
                                <input type="checkbox" name="" id="" />
                                <span className="text-filter-search">Unissex</span>
                            </li>
                            <li></li>
                        </ul>
                    </>                      
                    )}



                    <label onClick={() =>  openfilter('idade')} htmlFor="">

                    <span>Idade</span>

                    <span>+</span>
                    {/* <img src="" alt="" /> */}
                    </label>

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
                        )}




                    <label onClick={() =>  openfilter('cor')} htmlFor="">

                    <span>Cor</span>

                    <span>+</span>
                    {/* <img src="" alt="" /> */}
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





                    <label onClick={() =>  openfilter('esporte')} htmlFor="">

                    <span>Esporte</span>

                    <span >+</span>
                    {/* <img src="" alt="" /> */}
                    </label>

                        {isbuttonclicked.esporte && (
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
                        )}

            </ul>

            <ul>


            </ul>

        </div>

    )
}