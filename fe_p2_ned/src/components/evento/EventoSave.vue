<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog, InputText, Select } from 'primevue'
import type { IEventoCultural } from '@/models/evento'
import type { IRecinto } from '@/models/recinto'

const ENDPOINT = 'eventos-culturales'
const props = defineProps({
  mostrar: Boolean,
  evento: {
    type: Object as () => IEventoCultural,
    default: () => ({}) as IEventoCultural,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const evento = ref<any>({ ...props.evento })

watch(
  () => props.evento,
  (newVal) => {
    evento.value = { ...newVal }
  },
)

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const recintos = ref<IRecinto[]>([])
const estados = ref(['Programado', 'Agotado', 'Cancelado'])

async function obtenerRecintos() {
  recintos.value = await http.get('recintos').then((res) => res.data)
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerRecintos()

      if (props.evento?.id) {
        evento.value = { ...props.evento }
      } else {
        evento.value = { estado: 'Programado' } as IEventoCultural
      }
    }
  },
)

const duracionModel = computed({
  get: () => evento.value.duracion_minutos?.toString() || '',
  set: (val) => { evento.value.duracion_minutos = val ? Number(val) : null }
})

const precioModel = computed({
  get: () => evento.value.precio_entrada?.toString() || '',
  set: (val) => { evento.value.precio_entrada = val ? Number(val) : null }
})

async function handleSave() {
  try {
    const body = {
      id_recinto: Number(evento.value.id_recinto),
      titulo: evento.value.titulo,
      artista_principal: evento.value.artista_principal,
      duracion_minutos: Number(evento.value.duracion_minutos),
      precio_entrada: Number(evento.value.precio_entrada),
      fecha_evento: evento.value.fecha_evento,
      estado: evento.value.estado,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${evento.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    evento.value = {}
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Ocurrió un error al guardar')
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Evento Cultural' : 'Crear Evento Cultural'" style="width: 34rem" modal>
      <div class="flex flex-column gap-3">
        <div class="field mb-3">
          <label for="titulo" class="font-semibold block mb-2">Título</label>
          <InputText id="titulo" v-model="evento.titulo" class="w-full" autocomplete="off" autofocus required />
        </div>
        <div class="field mb-3">
          <label for="artista" class="font-semibold block mb-2">Artista Principal</label>
          <InputText id="artista" v-model="evento.artista_principal" class="w-full" autocomplete="off" required />
        </div>
        <div class="field mb-3">
          <label for="recinto" class="font-semibold block mb-2">Recinto</label>
          <Select id="recinto" v-model="evento.id_recinto" :options="recintos" optionLabel="nombre" optionValue="id"
            class="w-full" filter placeholder="Seleccione un recinto" />
        </div>
        <div class="field mb-3">
          <label for="duracion" class="font-semibold block mb-2">Duración (minutos)</label>
          <InputText id="duracion" v-model="duracionModel" type="number" class="w-full" autocomplete="off" required />
        </div>
        <div class="field mb-3">
          <label for="precio" class="font-semibold block mb-2">Precio de Entrada (Bs)</label>
          <InputText id="precio" v-model="precioModel" type="number" step="0.01" class="w-full" autocomplete="off"
            required />
        </div>
        <div class="field mb-3">
          <label for="fecha" class="font-semibold block mb-2">Fecha del Evento</label>
          <InputText id="fecha" v-model="evento.fecha_evento" type="date" class="w-full" autocomplete="off" required />
        </div>
        <div class="field mb-3">
          <label for="estado" class="font-semibold block mb-2">Estado</label>
          <Select id="estado" v-model="evento.estado" :options="estados" class="w-full" required />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2 pt-2">
          <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary"
            @click="dialogVisible = false" />
          <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped></style>
