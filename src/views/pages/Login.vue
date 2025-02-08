<template>
    <v-app>
        <v-container class="h-100" fluid>
            <v-row class="d-flex justify-center align-center h-100">
                <v-col md="6" sm="10">
                    <div class="text-h5 text-center mb-8 font-weight-medium">
                        Acesse sua conta
                    </div>
                    <v-card class="px-10 py-15 mx-auto" min-width="340" max-width="450" elevation="3" rounded="lg">
                        <v-form @submit.prevent="submitLogin()" validate-on="submit lazy">
                            <v-row class="mb-1">
                                <v-col>
                                    <v-text-field label="E-mail" variant="outlined" density="compact" type="email"
                                        prepend-inner-icon="mdi-email-outline" v-model="formLogin.email"
                                        :error="!!errors.email" :error-messages="errors.email" />
                                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-end">
                                        <a class="text-caption text-decoration-none text-primary text-body-2 font-weight-bold"
                                            href="#">Esqueci a senha</a>
                                    </div>
                                    <v-text-field label="Senha" variant="outlined" density="compact"
                                        :type="visible ? 'text' : 'password'" prepend-inner-icon="mdi-lock-outline"
                                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                        @click:append-inner="visible = !visible" v-model="formLogin.password"
                                        :error="!!errors.password" :error-messages="errors.password" />
                                </v-col>
                            </v-row>
                            <v-btn type="submit" block color="primary" variant="flat" class="text-none"
                                :loading="loading">
                                Acessar
                            </v-btn>
                            <v-divider class="my-10"><small>Ou acesse com</small></v-divider>
                            <v-row no-gutters class="d-flex ga-4">
                                <v-col :cols="width < 700 ? '12' : ''">
                                    <v-btn block variant="tonal" class="text-none"
                                        prepend-icon="mdi-google">Google</v-btn>
                                </v-col>
                                <v-col :cols="width < 700 ? '12' : ''">
                                    <v-btn block variant="tonal" class="text-none"
                                        prepend-icon="mdi-github">GitHub</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { Login } from '../../types/loginInterface'
import { loginSchema } from '../../validations/loginValidation'
import * as yup from 'yup';
import { useAuthStore } from '../../stores/auth';
import { Notification } from '../../plugins/notifications';
import { useRouter } from 'vue-router';

const router = useRouter();
const { width } = useDisplay()
const visible = ref<boolean>(false)
const loading = ref<boolean>(false)
const errors = ref<Partial<Record<keyof Login, string>>>({})
const authStore = useAuthStore()
const formLogin = ref<Login>({
    email: '',
    password: '',
})

async function validateForm() {
    try {
        errors.value = {};
        await loginSchema.validate(formLogin.value, { abortEarly: false })
        return true;
    } catch (validationError) {
        if (validationError instanceof yup.ValidationError) {
            validationError.inner.forEach(error => {
                if (error.path) {
                    errors.value[error.path as keyof Login] = error.message;
                }
            });
        }
        return false;
    }
}

async function submitLogin() {

    loading.value = true;
    try {
        if (await validateForm()) {
            await authStore.login(formLogin.value.email, formLogin.value.password);
            router.push('/');
        }
    } catch (error: any) {
        Notification.error(error.message)
    } finally {
        loading.value = false;
    }

}

</script>