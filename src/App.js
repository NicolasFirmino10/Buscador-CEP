import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './styles.css'
import api from './services/api'

export default function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch(){
    if(input === ''){
      alert('Preencha algum CEP')
      return
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    }

    catch{
      alert('Erro')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador cep </h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep"
          value={input}
          onChange={(e)=>{setInput(e.target.value)}}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff'></FiSearch>
        </button>
      </div>



      {Object.keys(cep).length > 0 && (
            <main className='main'>
            <h2>Cep: {cep.cep}</h2>
    
            <span>DDD: {cep.ddd}</span>
            <span>Logradouro: {cep.logradouro}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Localidade: {cep.localidade}</span>
            <span>UF: {cep.uf}</span>
          </main>
      )}
    

    </div>

  )
}