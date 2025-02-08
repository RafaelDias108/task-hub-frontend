import * as yup from 'yup';
import { Login } from '../types/loginInterface';

export const loginSchema = yup.object<Login>({
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: yup.string().matches(/[a-z]/, "A senha deve ter pelo menos 1 letra minúscula").matches(/[A-Z]/, "A senha deve ter pelo menos 1 letra maiúscula").matches(/[\d]/, "A senha deve ter pelo menos 1 número").matches(/[@$!%*?&.]/, "A senha deve ter pelo menos 1 caractere especial (@ $ ! % * ? & .)").min(8, "A senha deve ter pelo menos 8 caracteres").required("Senha é obrigatória")
})