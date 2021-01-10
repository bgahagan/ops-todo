import * as store from '@/store'

describe('store.ts', () => {
  store.resetState()

  function assertState (usedPriorities: number[], unusedPriorities: number[], nextPriority: number) {
    expect(store.state.value.items.map(i => i.priority)).toEqual(usedPriorities)
    expect(store.state.value.unusedPriorities).toEqual(unusedPriorities)
    expect(store.state.value.nextPriority).toBe(nextPriority)
  }

  function assertItemValues (values: string[]) {
    expect(store.state.value.items.map(i => i.value)).toEqual(values)
  }

  test('addNewItem', () => {
    assertState([], [], 1)

    store.addNewItem(1, 'one')
    assertState([1], [], 2)

    store.addNewItem(2, 'two')
    assertState([1, 2], [], 3)

    store.addNewItem(5, 'five')
    assertState([1, 2, 5], [3, 4], 6)

    store.addNewItem(7, 'seven')
    assertState([1, 2, 5, 7], [3, 4, 6], 8)
  })

  test('updateItemPriority', () => {
    assertState([1, 2, 5, 7], [3, 4, 6], 8)
    assertItemValues(['one', 'two', 'five', 'seven'])

    // can't incrase the priority of 1
    store.updateItemPriority(1, true)
    assertState([1, 2, 5, 7], [3, 4, 6], 8)
    assertItemValues(['one', 'two', 'five', 'seven'])

    store.updateItemPriority(1, false)
    assertState([1, 2, 5, 7], [3, 4, 6], 8)
    assertItemValues(['two', 'one', 'five', 'seven'])

    store.updateItemPriority(5, false)
    assertState([1, 2, 6, 7], [3, 4, 5], 8)
    assertItemValues(['two', 'one', 'five', 'seven'])

    store.updateItemPriority(6, true)
    assertState([1, 2, 5, 7], [3, 4, 6], 8)
    assertItemValues(['two', 'one', 'five', 'seven'])
  })

  test('deleteItem', () => {
    assertState([1, 2, 5, 7], [3, 4, 6], 8)

    store.deleteItem(1)
    assertState([2, 5, 7], [1, 3, 4, 6], 8)

    store.deleteItem(2)
    assertState([5, 7], [1, 2, 3, 4, 6], 8)

    store.deleteItem(7)
    assertState([5], [1, 2, 3, 4], 6)

    // Item doesn't exist
    store.deleteItem(9)
    assertState([5], [1, 2, 3, 4], 6)
  })
})
