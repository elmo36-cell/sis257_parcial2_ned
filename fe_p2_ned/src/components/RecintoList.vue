<script setup lang="ts">
import type { IRecinto } from '@/models/recinto'
import axios from '@/plugins/axios'
import { ref, onMounted, defineExpose } from 'vue'

const recintos = ref<IRecinto[]>([])
const emit = defineEmits(['edit'])

const obtenerLista = async () => {
  try {
    const response = await axios.get('/recintos')
    recintos.value = response.data
  } catch (error) {
    console.error('Error al obtener recintos:', error)
  }
}

const eliminar = async (id?: number) => {
  if (!id) return
  if (confirm('¿Está seguro de eliminar este recinto?')) {
    try {
      await axios.delete(`/recintos/${id}`)
      obtenerLista()
    } catch (error) {
      console.error('Error al eliminar recinto:', error)
    }
  }
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <h3 class="mb-3">Recintos Registrados</h3>
    <table class="table table-striped table-bordered align-middle bg-white">
      <thead class="table-dark text-center">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Ciudad</th>
          <th>Aforo Máximo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recinto in recintos" :key="recinto.id">
          <td class="text-center">{{ recinto.id }}</td>
          <td>{{ recinto.nombre }}</td>
          <td>{{ recinto.ciudad }}</td>
          <td class="text-center">{{ recinto.aforo_maximo ?? 'No especificado' }}</td>
          <td class="text-center">
            <button @click="emit('edit', recinto)" class="btn btn-warning btn-sm me-2">Editar</button>
            <button @click="eliminar(recinto.id)" class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
