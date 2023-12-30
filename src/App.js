import {FiSearch} from 'react-icons/fi';
import {useState} from 'react';
import './style.css';


import api from './sevices/api';

function App() {

const [input, setInput] = useState('')
const [cep, setCep] = useState({});


async function handleSearch(){
 //https://viacep.com.br/ws/70160-900/json/

if(input === ''){
  alert("coloque algum CEP!")
  return;
}

try{
  const response = await api.get(`${input}/json`);
  setCep(response.data)
  setInput("")

}catch{
  alert("Erro ao buscar");
  setInput("")
}

}

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
          <input 
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value) }
          />
          
          <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color="#fff"/>
          </button>
      </div>

      {Object.keys(cep).length > 0 && (

          <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade}</span>
          
          </main>
      )}
      

    </div>
  );
}

export default App;
