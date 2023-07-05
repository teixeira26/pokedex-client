import axios from 'axios';
import react, { useEffect, useState } from  'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import controlerImg from './image/controllerImg';
import './css/form.css';
import { crearnuevaCopia, aplicarFiltroPorTipo, agregarTipos} from '../redux/actions';
import Swal from 'sweetalert2'



function Form() {
    const tipos = useSelector(estado=>estado.tipos);
    const [tiposCargados, setTiposCargados] = useState(false);
    const pokemons = useSelector(estado=>estado.pokemonsCopia2);
    const dispatch = useDispatch();
    const [error, setError] = useState({})
    const [garantia, setGarantia] = useState(false);
    const pokemonsCopia1 = useSelector(estado=>estado.pokemonsFiltradosTipo)
    const [pokemon, setPokemon] = useState({
        id:undefined,
        nombre: undefined,
        id: '',
        peso:undefined,
        altura:undefined,
        vida:undefined,
        fuerza:undefined,
        velocidad:undefined,
        defensa:undefined,
        imagen:undefined,
        createdinDb:true,
        tipos:[]
    })
    useEffect(async()=>{
        if(!tipos[0]){
            let tipoos = await axios.get('https://pokedex-api-production-7030.up.railway.app/types');
            dispatch(agregarTipos(tipoos.data));
            setTiposCargados(true);
        }
    },[])
    const changstate = (e)=>{
        setPokemon({
            ...pokemon,
            [e.target.name]: e.target.value,
        })
    }
    const handleBlur = (e)=>{
        setGarantia(true);
        if(e.target.name === 'nombre'){
            if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(e.target.value)){
                setError({
                    ...error,
                    [e.target.name]:e.target.value
                    })
                }
            else{
                const nuevoPokemon = pokemons.find(x=>x.nombre === e.target.value);
                if(nuevoPokemon){
                    setError({
                        ...error,
                        [e.target.name]:e.target.value
                        })
                }
                delete error.nombre;
                setError({...error})
            }
        }
        else if(e.target.name === 'imagen'){
            if(!/(https?:\/\/.*\.(?:png|jpg))/i.test(e.target.value)){
                setError({
                    ...error,
                    [e.target.name]:e.target.value
                    })
                }
                else{
                    delete error.imagen;
                    setError({...error})
                }
        }
        else{
            if(!Number.isInteger(parseInt(e.target.value))||e.target.value>9999){
                setError({
                    ...error,
                    [e.target.name]:e.target.value
                    })
                }
            else{
                delete error[e.target.name];
                setError({...error})
            }
        }

    }
    const changstate2 = (e)=>{
        setPokemon({
            ...pokemon,
            tipos: [...pokemon.tipos, e.target.value],
        })

    }
    const sendToDb = async(e)=>{
        e.preventDefault();
        const busqueda = await axios({
            method:'post',
            url:'https://pokedex-api-production-7030.up.railway.app/pokemons',
            data: pokemon});
            Swal.fire({title:'Pokemon creado con suceso',
            confirmButtonColor: '#f22'})
        let copia = pokemon;
        copia.id = busqueda.data[0].pokemonId;
        dispatch(crearnuevaCopia([...pokemons, copia]));
        dispatch(aplicarFiltroPorTipo(...pokemonsCopia1, copia));
    }

  return (
    <div className='contenedor'>
        <form onSubmit={sendToDb} className='Form'>
        <h2>Creá un nuevo pokemon</h2>
            <div className='contenedorCampos'>
                <div className='contenedorChico'>
                    <label htmlFor='nombre'>Nombre: </label>
                    <input type='text' name='nombre' onChange={changstate} className={error.nombre||error.nombre===''?'inputError':'camposInput'}  required onBlur={handleBlur} />
                    {error.nombre||error.nombre === ''?<p>Este campo debe tener un valor válido (texto)</p>:null}
                    <label htmlFor='vida'>Vida: </label>
                    <input type='text' name='vida' onChange={changstate} className={error.vida||error.vida===''?'inputError':'camposInput'} onBlur={handleBlur}/>
                    {error.vida||error.vida === ''?<p>Este campo debe tener un valor válido</p>:null}
                    <label>Fuerza: </label>
                    <input type='text' name='fuerza' onChange={changstate} className={error.fuerza||error.fuerza===''?'inputError':'camposInput'} onBlur={handleBlur}/>
                    {error.fuerza||error.fuerza === ''?<p>Este campo debe tener un valor válido</p>:null}
                    <label>velocidad: </label>
                    <input type='text' name='velocidad' onChange={changstate} className={error.velocidad||error.velocidad===''?'inputError':'camposInput'} onBlur={handleBlur}/>
                    {error.velocidad||error.velocidad === ''?<p>Este campo debe tener un valor válido</p>:null}
                    <label>defensa: </label>
                    <input type='text' name='defensa' onChange={changstate} className={error.defensa||error.defensa===''?'inputError':'camposInput'} onBlur={handleBlur}/>
                    {error.defensa||error.defensa === ''?<p>Este campo debe tener un valor válido</p>:null}
                    <label>Altura: </label>
                    <input type='text' name='altura' onChange={changstate} className={error.altura||error.altura===''?'inputError':'camposInput'} onBlur={handleBlur}/>
                    {error.altura||error.altura === ''?<p>Este campo debe tener un valor válido</p>:null}
                    <label>Peso: </label>
                    <input type='text' name='peso' onChange={changstate} className={error.peso||error.peso===''?'inputError':'camposInput'} onBlur={handleBlur}/>
                    {error.peso||error.peso === ''?<p>Este campo debe tener un valor válido</p>:null}
                    <label>Imagen: </label>
                    <input type='text' name='imagen' onChange={changstate} className={error.imagen||error.imagen===''?'inputError':'camposInput'} onBlur={handleBlur}/>
                    {error.imagen||error.imagen === ''?<p>Este campo debe tener un valor válido(https://ruta.jpg o png)</p>:pokemon.imagen?<img src={pokemon.imagen} className='preview'/>:null}
                </div>
            </div>
            <div className='containerGen'>
                <h3>Elegí el tipo(s) de tu pokemon</h3>
                <hr/>
                <div className='tiposContainer'>
                    {tiposCargados || tipos[0]?tipos.map(x=>{
                        return(
                            <div key={x} className='inputsImg'>
                            <img src={controlerImg(x)} className="imagenes"></img>
                            <input type='checkbox' name='checkbox' value={x} onChange={changstate2}></input>
                            <label htmlFor={x}>{x}</label>
                            </div>
                        )
                    }):null}
                </div>
            </div>
            <div className='buttonSub'>
            <input type='submit' className='enviar' disabled={garantia === true && Object.keys(error).length === 0?false:true}></input>
            </div>
        </form>
    </div>
  );
}

export default Form;
