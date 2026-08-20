export function responderErro(res, resultado) {
  if (resultado.tipo === 'id_invalido') {
    return res.status(400).json({
      mensagem: resultado.mensagem,
    });
  }

  if (resultado.tipo === 'validacao') {
    return res.status(400).json({
      mensagem: resultado.mensagem,
    });
  }

  if (resultado.tipo === 'nao_encontrado') {
    return res.status(404).json({
      mensagem: resultado.mensagem,
    });
  }

  return res.status(500).json({
    mensagem: 'Erro interno do servidor',
  });
}
