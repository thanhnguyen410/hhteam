import { types } from 'mobx-state-tree'

const UiStore = types.model('UiStore', {
  collapsed: types.boolean
})
  .actions((self) => ({
    toggleCollapsed(value) {
      self.collapsed = value ?? !self.collapsed
    }
  }))

export default UiStore.create({
  collapsed: false
})
