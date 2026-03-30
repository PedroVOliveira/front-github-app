import { JoinDateUtil } from "./join-date.util"

describe('Join-date', () => {
  it.each([
    ['2022-01-25', 'janeiro de 2022'],
    ['2022-02-15', 'fevereiro de 2022'],
    ['2022-03-10', 'março de 2022'],
    ['2022-04-05', 'abril de 2022'],
    ['2022-05-20', 'maio de 2022'],
    ['2022-06-18', 'junho de 2022'],
    ['2022-07-22', 'julho de 2022'],
    ['2022-08-30', 'agosto de 2022'],
    ['2022-09-12', 'setembro de 2022'],
    ['2022-10-08', 'outubro de 2022'],
    ['2023-11-30', 'novembro de 2023'],
    ['2023-12-31', 'dezembro de 2023'],
  ])('Deve formatar %s como "%s"', (input, expected) => {
    expect(JoinDateUtil(input)).toBe(expected)
  })
})
