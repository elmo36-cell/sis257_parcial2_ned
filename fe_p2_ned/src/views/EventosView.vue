<script setup lang="ts">
import EventoList from '@/components/evento/EventoList.vue'
import EventoSave from '@/components/evento/EventoSave.vue'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref<boolean>(false)
const eventoListRef = ref<typeof EventoList | null>(null)
const eventoEdit = ref<any>(null)

function handleCreate() {
  eventoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(evento: any) {
  eventoEdit.value = evento
  mostrarDialog.value = true
}

function handleSave() {
  eventoListRef.value?.obtenerLista()
}

function handleCloseDialog() {
  mostrarDialog.value = false
}
</script>

<template>
  <section class="section" data-section="section6">
    <div class="container">
      <div class="row pt-6 mt-6">
        <div class="col-md-12">
          <h2>Gestión de Eventos Culturales</h2>
          <Button label="Crear Nuevo" icon="pi pi-plus" severity="success" class="mb-3" @click="handleCreate" />
          <EventoList ref="eventoListRef" @edit="handleEdit" />
          <EventoSave :mostrar="mostrarDialog" :evento="eventoEdit" :modoEdicion="!!eventoEdit" @guardar="handleSave"
            @close="handleCloseDialog" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
