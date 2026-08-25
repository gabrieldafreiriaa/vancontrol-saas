import { useEffect, useState } from 'react';

import { buscarAlunos } from '../../api/api.js';

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregarAlunos() {
    try {
      const dados = await buscarAlunos();

      setAlunos(dados);
    } catch (error) {
      setErro('Erro ao carregar alunos');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarAlunos();
  }, []);

  if (carregando) {
    return <p>Carregando alunos...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <div>
      <h1>VanControl</h1>
      <h2>Alunos</h2>

      {alunos.length === 0 ? (
        <p>Nenhum aluno cadastrado.</p>
      ) : (
        <ul>
          {alunos.map((aluno) => (
            <li key={aluno.id}>
              <strong>{aluno.nome}</strong> - {aluno.escola} - R${' '}
              {aluno.valorMensal}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Alunos;
