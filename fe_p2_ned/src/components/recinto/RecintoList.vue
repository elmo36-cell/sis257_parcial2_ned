<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import type { IRecinto } from '@/models/recinto'

const ENDPOINT = 'recintos'
const recintos = ref<IRecinto[]>([])
const busqueda = ref<string>('')
const recintoDelete = ref<IRecinto | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const emit = defineEmits(['edit'])

async function obtenerLista() {
  const response = await http.get(ENDPOINT)
  recintos.value = response.data
}

const recintosFiltrados = computed(() => {
  return recintos.value.filter(
    (recinto) =>
      recinto.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      recinto.ciudad.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

function emitirEdicion(recinto: IRecinto) {
  emit('edit', recinto)
}

function mostrarEliminarConfirm(recinto: IRecinto) {
  recintoDelete.value = recinto
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  if (recintoDelete.value?.id) {
    await http.delete(`${ENDPOINT}/${recintoDelete.value.id}`)
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
    <!-- Read / Filtro de búsqueda -->
    <InputGroup class="mb-3">
      <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
      <InputText v-model="busqueda" type="text" placeholder="Buscar por nombre o ciudad..." />
    </InputGroup>

    <!-- Tabla con diseño optimizado -->
    <div class="table-responsive">
      <table class="table table-hover table-striped table-bordered align-middle mb-0">
        <thead class="table-dark text-center">
          <tr>
            <th>Nro.</th>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Aforo Máximo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(recinto, index) in recintosFiltrados" :key="recinto.id">
            <td class="text-center fw-bold">{{ index + 1 }}</td>
            <td>{{ recinto.nombre }}</td>
            <td>{{ recinto.ciudad }}</td>
            <td class="text-center">{{ recinto.aforo_maximo ?? 'No especificado' }}</td>
            <!-- Update & Delete Actions -->
            <td class="text-center">
              <div class="d-flex justify-content-center gap-1">
                <Button icon="pi pi-pencil" aria-label="Editar"
                  class="p-button-rounded p-button-text p-button-warning btn-sm" @click="emitirEdicion(recinto)" />
                <Button icon="pi pi-trash" aria-label="Eliminar"
                  class="p-button-rounded p-button-text p-button-danger btn-sm"
                  @click="mostrarEliminarConfirm(recinto)" />
              </div>
            </td>
          </tr>
          <tr v-if="recintosFiltrados.length === 0">
            <td colspan="5" class="text-center text-muted py-4">No se encontraron registros disponibles</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de confirmación para Delete -->
    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }" modal>
      <p class="m-0">¿Estás seguro de que deseas eliminar este recinto?</p>
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
