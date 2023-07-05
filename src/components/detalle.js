import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import image from '../components/image/pokedex.png'
import './css/detalle.css';
import { useSelector } from "react-redux";



const Detalle = ()=>{
    const[detalle, setDetalle] = useState(undefined)
    const params = useParams()
    const pokemons = useSelector(estado=>estado.pokemonsCopia2)

    useEffect(async()=>{

        if(params.id.length<10)setDetalle(pokemons.find(x=>x.id === parseInt(params.id)))
        else setDetalle(pokemons.find(x=>x.id === params.id))

    }, [pokemons])
    return(
        <div>
            <div className="pokedexContainer"><img src={image} className='pokedex'/></div>
            {detalle?
            <React.Fragment>
                <div className="container">
                    <img src={detalle.image||detalle.imagen} className='pokeImg'/>
                    <div className="cuadrado"></div>
                    <div className="cuadrado2"></div>
                    <div className="cuadrado3"></div>
                    <div className="cuadrado4"></div>
                    <p className="nombre">{detalle.name||detalle.nombre}</p>
                    <p className="altura">Altura: {detalle.altura}</p>
                    <p className="peso">Peso:{detalle.peso}</p>
                    <p className="velocidad">velocidad:{detalle.velocidad}</p>
                    <p className="defensa">defensa:{detalle.defensa}</p>
                    <p className="fuerza">fuerza:{detalle.fuerza}</p>
                    <p className="vida">vida:{detalle.vida}</p>
                    {detalle.createdinDb?<p className="tipo">tipos:{detalle.tipos.map(x=>x.nombre).join(',')}</p>:<p className="tipo">tipos:{detalle.tipos.join(',')}</p>}
                    {detalle.createdinDb?<img src={`/assets/${detalle.tipos[0].nombre}.jpg`} className="fondoImg" alt='fondo'/>:<img src={`/assets/${detalle.tipos[0]}.jpg`} className="fondoImg" alt='fondo'/>}
                    {/*  */}
                    <NavLink to="/home" className='cerrar'>X</NavLink>
                </div>
            </React.Fragment>
            :null}

        </div>
    )
}

export default Detalle;
