import * as yup from 'yup';
import { NewProject } from '../types/projectInterface';

export const ProjectSchema = yup.object<NewProject>({
    name_project: yup.string().max(30, "O nome do projeto deve conter até 30 caracteres.").required("Nome do projeto é obrigatório."),
})