export function validateMiddleware(schema) {
  return (req, res, next) => {
    const resultado = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!resultado.sucess) {
      return res.status(400).json({
        mensagem: 'Erro de validação',
        erros: resultado.error.flatten(),
      });
    }

    req.validated = resultado.data;
    return next();
  };
}
