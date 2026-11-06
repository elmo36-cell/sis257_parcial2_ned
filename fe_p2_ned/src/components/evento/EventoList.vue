<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import type { IEventoCultural } from '@/models/evento'

const ENDPOINT = 'eventos-culturales'
const eventos = ref<IEventoCultural[]>([])
const busqueda = ref<string>('')
const eventoDelete = ref<IEventoCultural | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const emit = defineEmits(['edit'])

async function obtenerLista() {
  const response = await http.get(ENDPOINT)
  eventos.value = response.data
}

const eventosFiltrados = computed(() => {
  return eventos.value.filter(
    (evento) =>
      evento.titulo.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      evento.artista_principal.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      evento.estado.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      (evento.tipo_entrada && evento.tipo_entrada.toLowerCase().includes(busqueda.value.toLowerCase())),
  )
})

function emitirEdicion(evento: IEventoCultural) {
  emit('edit', evento)
}

function mostrarEliminarConfirm(evento: IEventoCultural) {
  eventoDelete.value = evento
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  if (eventoDelete.value?.id) {
    await http.delete(`${ENDPOINT}/${eventoDelete.value.id}`)
    await obtenerLista()
    mostrarConfirmDialog.value = false
  }
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div class="card shadow-sm p-3 mb-5 bg-body rounded">
    <!-- Filtro de búsqueda -->
    <InputGroup class="mb-3">
      <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
      <InputText v-model="busqueda" type="text" placeholder="Buscar por título, artista o estado..." />
    </InputGroup>

    <!-- Tabla con diseño -->
    <div class="table-responsive">
      <table class="table table-hover table-striped table-bordered align-middle mb-0">
        <thead class="table-dark text-center">
          <tr>
            <th>Nro.</th>
            <th>Título</th>
            <th>Artista</th>
            <th>Recinto ID</th>
            <th>Duración</th>
            <th>Precio</th>
            <th>Fecha</th>
            <th>Tipo de Entrada</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(evento, index) in eventosFiltrados" :key="evento.id">
            <td class="text-center fw-bold">{{ index + 1 }}</td>
            <td>{{ evento.titulo }}</td>
            <td>{{ evento.artista_principal }}</td>
            <td class="text-center">{{ evento.id_recinto }}</td>
            <td class="text-center">{{ evento.duracion_minutos }} min</td>
            <td class="text-end">{{ evento.precio_entrada }} Bs</td>
            <td class="text-center">{{ evento.fecha_evento }}</td>
            <td class="text-center">
              <span class="badge bg-secondary px-2 py-1">
                {{ evento.tipo_entrada }}
              </span>
            </td>
            <td class="text-center">
              <span class="badge px-2 py-1" :class="{
                'bg-success': evento.estado === 'Programado',
                'bg-warning text-dark': evento.estado === 'Agotado',
                'bg-danger': evento.estado === 'Cancelado'
              }">
                {{ evento.estado }}
              </span>
            </td>

            <td class="text-center">
              <div class="d-flex justify-content-center gap-1">
                <Button icon="pi pi-pencil" aria-label="Editar"
                  class="p-button-rounded p-button-text p-button-warning btn-sm" @click="emitirEdicion(evento)" />
                <Button icon="pi pi-trash" aria-label="Eliminar"
                  class="p-button-rounded p-button-text p-button-danger btn-sm"
                  @click="mostrarEliminarConfirm(evento)" />
              </div>
            </td>
          </tr>
          <tr v-if="eventosFiltrados.length === 0">
            <td colspan="9" class="text-center text-muted py-4">No se encontraron registros disponibles</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- confirmacion para Delete -->
    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }" modal>
      <p class="m-0">¿Estás seguro de que deseas eliminar este evento cultural?</p>
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text p-button-secondary"
          @click="mostrarConfirmDialog = false" />
        <Button label="Eliminar" icon="pi pi-trash" class="p-button-danger" @click="eliminar" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
