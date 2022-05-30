export interface PacienteInterface{
    Identity: {
        type: string,
        number: number,
        lasName: string,
        firsName: string,
        birthdate: string,
        sex: string
    },
    appointments: [],
    isPatient: boolean,
    reasonId: string,
    formInput: boolean,
    error: string
}