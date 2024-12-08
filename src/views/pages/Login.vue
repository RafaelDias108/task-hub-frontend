<template>
    <v-app>
        <v-container class="h-100" fluid>
            <v-row class="d-flex justify-center align-center h-100">
                <v-col md="6" sm="10">
                    <div class="text-h5 text-center mb-8 font-weight-medium">
                        Acesse sua conta
                    </div>
                    <v-card class="px-10 py-15 mx-auto" min-width="340" max-width="450" elevation="3" rounded="lg">
                        <v-form>
                            <v-row class="mb-1">
                                <v-col>
                                    <v-text-field label="E-mail" variant="outlined" density="compact" type="email"
                                        prepend-inner-icon="mdi-email-outline"></v-text-field>
                                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-end">
                                        <a class="text-caption text-decoration-none text-primary text-body-2 font-weight-bold"
                                            href="#">Esqueci a senha</a>
                                    </div>
                                    <v-text-field label="Senha" variant="outlined" density="compact"
                                        :type="visible ? 'text' : 'password'" prepend-inner-icon="mdi-lock-outline"
                                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                        @click:append-inner="visible = !visible"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-btn block color="primary" variant="flat" class="text-none">
                                Login in
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

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const { width } = useDisplay()
const visible = ref < Boolean > (false)
</script>