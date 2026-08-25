const API_URL = 'http://localhost:3031';
//fetch é usado para fazer requisições http pelo front
export async function buscarAlunos() {
  const resposta = await fetch(`${API_URL}/alunos`);
  const dados = await resposta.json();
  return dados;
}
