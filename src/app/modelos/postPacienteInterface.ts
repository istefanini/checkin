export interface PostPacienteInterface {
  Identity: {
      type: string,
      number: number,
      lasName: string,
      firsName: string,
      birthdate: string,
      sex: string
  },
  reasonId: string,
  formInput: boolean,
}