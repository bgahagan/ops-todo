<template>
  <h1>Ops Todo</h1>
  <new-item :initialPriority="newPriority" />
  <div class="unused">
    <div class="unused-desc">unused priorities</div>
    <div class="unused-values">
      <button v-for="priority in state.unusedPriorities" :key="priority" @click="newPriority = priority">{{priority}}</button>
    </div>
  </div>

  <item v-for="i in state.items" :key="i.priority" :item="i"></item>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Item from './components/Item.vue'
import NewItem from './components/NewItem.vue'
import { state, addDummyData } from './store'

export default defineComponent({
  components: { Item, NewItem },
  setup () {
    addDummyData()

    const newPriority = ref(state.value.nextPriority)

    return {
      state,
      newPriority
    }
  }
})
</script>

<style>

.item {
  display: flex;
  margin-bottom: 2px;
}
.item-priority {
  display: flex;
  width: 5rem;
  margin-right: 2px;
}
.item-priority span {
  padding-right: 2px;
  flex-grow: 1;
}
.item-priority button {
  width: 1.5rem;
}

.item-value {
  flex-grow: 1;
  margin-right: 2px;
}
.item-action {
  width: 8rem;
}

.unused {
  display: flex;
  margin-bottom: 10px;
}
.unused-desc {
  width: 5rem;
}
.unused-values {
  flex-grow: 1;
}

button:disabled {
  color: gray !important;
}

input {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
