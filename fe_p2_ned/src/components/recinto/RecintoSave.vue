<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog, InputText } from 'primevue'
import type { IRecinto } from '@/models/recinto'

const ENDPOINT = 'recintos'
const props = defineProps({
  mostrar: Boolean,
  recinto: {
    type: Object as () => IRecinto,
    default: () => ({}) as IRecinto,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const recinto = ref<any>({ ...props.recinto })

watch(
  () => props.recinto,
  (newVal) => {
    recinto.value = { ...newVal }
  },
)

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      if (props.recinto?.id) {
        recinto.value = { ...props.recinto }
      } else {
        recinto.value = {}
      }
    }
  },
)

const aforoModel = computed({
  get: () => recinto.value.aforo_maximo?.toString() || '',
  set: (val) => { recinto.value.aforo_maximo = val ? Number(val) : null }
})

async function handleSave() {
  try {
    const body = {
      nombre: recinto.value.nombre,
      ciudad: recinto.value.ciudad,
      aforo_maximo: Number(recinto.value.aforo_maximo),
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${recinto.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    recinto.value = {}
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Ocurrió un error al guardar')
  }
}
</script>

<template>
  <div class="flex justify-center">
    <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar Recinto' : 'Crear Recinto'"
      style="width: 30rem" modal>
      <div class="flex flex-column gap-3">
        <div class="field mb-3">
          <label for="nombre" class="font-semibold block mb-2">Nombre</label>
          <InputText id="nombre" v-model="recinto.nombre" class="w-full" autocomplete="off" autofocus required />
        </div>
        <div class="field mb-3">
          <label for="ciudad" class="font-semibold block mb-2">Ciudad</label>
          <InputText id="ciudad" v-model="recinto.ciudad" class="w-full" autocomplete="off" required />
        </div>
        <div class="field mb-3">
          <label for="aforo" class="font-semibold block mb-2">Aforo Máximo</label>
          <InputText id="aforo" v-model="aforoModel" type="number" class="w-full" autocomplete="off" />
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
