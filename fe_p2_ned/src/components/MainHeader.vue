<script setup lang="ts">
import { Button } from 'primevue'
import { useRouter } from 'vue-router'

const router = useRouter()

function irAEventos() {
  router.push('/eventos')
}

function irARecintos() {
  router.push('/recintos')
}
</script>

<template>
  <header class="text-center py-4 mb-4 header-custom">
    <img alt="Vue logo" class="logo mb-2" src="@/assets/logo.svg" width="70" height="70" />

    <!-- Título-->
    <h1 class="titulo-principal fw-bold">Gestión - Parcial II</h1>

    <!-- Subtítulo -->
    <p class="subtitulo">
      Sistema de Administración y Control de Recintos y Eventos Culturales
    </p>

    <div class="d-flex justify-content-center gap-3 mt-3">
      <Button label="Eventos Culturales" icon="pi pi-calendar" severity="info" @click="irAEventos" />
      <Button label="Recintos" icon="pi pi-building" severity="help" @click="irARecintos" />
    </div>
  </header>
</template>

<style scoped>
.header-custom {
  background-color: hsla(160, 100%, 37%, 0.2);
  border-bottom: 1px solid hsla(160, 100%, 37%, 0.3);
  padding: 2rem;
}

/* Estilos modulares para cambiar el color de las letras a negro */
.titulo-principal {
  color: #111111 !important;
}

.subtitulo {
  color: #2b2b2b !important;
  font-weight: 500;
}

.logo {
  display: block;
  margin: 0 auto;
}
</style>
