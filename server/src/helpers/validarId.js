export function validarId(id) {
  const idNumero = Number(id);

  if (!idNumero || idNumero <= 0) {
    return 'ID inválido';
  }

  return null;
}
