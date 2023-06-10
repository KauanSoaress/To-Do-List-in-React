import React, { useState, useEffect }  from 'react';
import '../styles/TodoList.css';
import icon from "../assets/icon.webp";

export default function TodoList() {

  const listaStorage = localStorage.getItem('Lista');

  // JSON.parse() => converte para objeto o que tá em string
  const [list, setList] = useState(listaStorage ? JSON.parse(listaStorage) : []);
  const [newItem, setNewItem] = useState("");

  useEffect(()=> {
    localStorage.setItem('Lista', JSON.stringify(list));
  }, [list]);

  function adicionaItem(form) {
    // Usado para não disparar o form, se não ele atualiza a página
    form.preventDefault();

    // Se o newItem estiver vazio, não acontece nada
    if(!newItem) {
      return
    }

    // Adiciona na lista um novo elemento com o novo item e dizendo se está completa ou não
    // Copia a lista e põe um dado na continuação
    setList([...list, {text: newItem, isCompleted: false}])

    // Deixa o setNewItem vazio para adicionar novamente
    setNewItem("");
    // Voltar a focar nesse input
    document.getElementById('input-entrada').focus();
  }

  // Troca o valor do completed na posição desejava e atualiza a lista
  function clicou(index) {
    const listaAux = [...list];
    listaAux[index].isCompleted = !(listaAux[index].isCompleted);
    setList(listaAux);
  }

  function deletar(index) {
    const listaAux = [...list];
    listaAux.splice(index, 1);
    setList(listaAux)
  }

  function deletarTudo() {
    setList([]);
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={adicionaItem}>
        <input 
          id='input-entrada'
          type="text" 
          value={newItem}
          //alimentando o estado de novo item com o conteudo do input
          onChange={(e)=>{setNewItem(e.target.value)}}
          placeholder='Adicione uma tarefa'
        />
        <button type="submit" className="add">Add</button>
      </form>
      <div className="listaTarefas">
        <div className="container">
          {/* Fazer uma validação */}
          {
            // condição ternária
            list.length < 1
              ?
              <img className='icone-central' src={icon} />
              :
              list.map((item, index)=>(
                <div 
                  key={index}
                  className={item.isCompleted ? "item completo" : "item"}
                >
                  <span onClick={()=>{clicou(index)}}>{item.text}</span>
                  <button onClick={() =>{deletar(index)}} className="del">Deletar</button>
                </div>
              ))
          }
          {
            list.length > 0 &&
            <button onClick={()=>{deletarTudo()}} className='deleteAll'>Deletar Todas</button>
          }
        </div>
      </div>
    </div>
  )
}