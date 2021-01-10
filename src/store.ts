import { Ref, ref } from 'vue'

export interface Item {
  priority: number;
  value: string;
}

export interface State {
  unusedPriorities: number[];
  nextPriority: number;
  items: Item[];
  itemsByPriority: Map<number, Item>;
}

function emptyState (): State {
  return {
    unusedPriorities: [],
    nextPriority: 1,
    items: [],
    itemsByPriority: new Map()
  }
}

export const state: Ref<State> = ref(emptyState())

export function resetState () {
  state.value = emptyState()
}

function updateItemsAndPriorities (state: State) {
  const items = [...state.itemsByPriority.values()]
  items.sort((a, b) => a.priority - b.priority)

  const unusedPriorities: number[] = []
  let lastPriority = 1
  items.forEach((item) => {
    while (lastPriority < item.priority) {
      unusedPriorities.push(lastPriority)
      lastPriority++
    }
    lastPriority = item.priority + 1
  })

  state.items = items
  state.unusedPriorities = unusedPriorities
  state.nextPriority = items.length > 0 ? items[items.length - 1].priority + 1 : 1
}

export function addNewItem (priority: number, value: string) {
  const item = {
    priority,
    value
  }
  state.value.itemsByPriority.set(priority, item)
  updateItemsAndPriorities(state.value)
}

export function addDummyData () {
  const initial: Item[] = [
    {
      priority: 1,
      value: 'foo'
    }, {
      priority: 2,
      value: 'bar'
    }, {
      priority: 5,
      value: 'baz'
    }
  ]

  for (const item of initial) {
    addNewItem(item.priority, item.value)
  }
}

export function updateItemValue (priority: number, newValue: string) {
  const existing = state.value.itemsByPriority.get(priority)
  if (existing) { existing.value = newValue }
}

export function updateItemPriority (oldPriority: number, increase: boolean) {
  const items = state.value.itemsByPriority
  const prev = items.get(oldPriority)
  if (prev) {
    const newPriority = oldPriority + (increase ? -1 : 1)
    if (newPriority > 0) {
      items.delete(oldPriority)
      const collision = items.get(newPriority)
      if (collision) {
        items.delete(newPriority)
        collision.priority = oldPriority
        items.set(oldPriority, collision)
      }
      prev.priority = newPriority
      items.set(newPriority, prev)
    }
  }
  updateItemsAndPriorities(state.value)
}

export function deleteItem (priority: number) {
  state.value.itemsByPriority.delete(priority)
  updateItemsAndPriorities(state.value)
}
