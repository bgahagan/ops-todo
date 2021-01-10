<template>
  <div class="item">
    <!-- div>id={{item.id}}; pri={{item.priority}}</div -->
    <div class="item-priority">
      <span>{{item.priority}}</span>
      <button class="item-pri-btn" @click="updatePriority(true)">↑</button>
      <button class="item-pri-btn" @click="updatePriority(false)">↓</button>
    </div>
    <input class="item-value" type="text" v-model="value">
    <button class="item-action" @click="deleteClick">Delete</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { Item, updateItemValue, updateItemPriority, deleteItem } from '../store'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true
    }
  },
  setup (props) {
    const value = ref(props.item.value)
    watch(value, (v) => {
      updateItemValue(props.item.priority, v)
    })
    watch(() => props.item.value, (v) => { value.value = v })
    function updatePriority (increase: boolean) {
      updateItemPriority(props.item.priority, increase)
    }
    function deleteClick () {
      deleteItem(props.item.priority)
    }
    return {
      value,
      updatePriority,
      deleteClick
    }
  }
})
</script>

<style scoped>
button.item-action {
  color: red;
}
</style>
