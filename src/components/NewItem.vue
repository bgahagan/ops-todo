<template>
  <form name="new-item" class="item">
    <input class="item-priority" type="number" v-model.number="newItem.priority">
    <input ref="valueInput" class="item-value" type="text" placeholder="todo description" v-model="newItem.value" autofocus>
    <button class="item-action" @click="addItem" :disabled="!isNewItemValid">Add</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch, computed } from 'vue'
import { Item, addNewItem, state } from '../store'

export default defineComponent({
  props: {
    initialPriority: Number
  },
  setup (props) {
    const newItem = ref({
      priority: props.initialPriority,
      value: ''
    } as Item)

    const isNewItemValid = computed(() => {
      const priorityUnused = !state.value.itemsByPriority.has(newItem.value.priority)
      const priorityIsPos = newItem.value.priority > 0
      const valueNonEmpty = newItem.value.value.length > 0
      return priorityUnused && priorityIsPos && valueNonEmpty
    })

    const valueInput: Ref<HTMLElement | null> = ref(null)

    watch(() => state.value.nextPriority, (p) => { newItem.value.priority = p })
    watch(() => props.initialPriority, (p) => {
      if (p) {
        newItem.value.priority = p
        const input = valueInput.value
        if (input) {
          input.focus()
        }
      }
    })

    function addItem () {
      addNewItem(
        newItem.value.priority,
        newItem.value.value
      )
      newItem.value.value = ''
      newItem.value.priority = state.value.nextPriority
      const input = valueInput.value
      if (input) {
        input.focus()
      }
    }

    return {
      newItem,
      addItem,
      isNewItemValid,
      valueInput
    }
  }
})
</script>

<style scoped>
button.item-action {
  color: green
}
</style>
