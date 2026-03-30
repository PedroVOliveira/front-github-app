
export function JoinDateUtil(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric'
  })

}
