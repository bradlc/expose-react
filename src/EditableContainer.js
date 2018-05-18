import { Container } from 'unstated'
import dset from 'dset'

export default class EditableContainer extends Container {
  state = {
    pages: {},
    editables: {},
    editables2: {},
    variants: {},
    props: {}
  }

  addEditables(newEditables) {
    this.setState(state => ({
      editables: { ...state.editables, ...newEditables }
    }))
  }

  addEditables2(page, editables) {
    let obj = {}
    editables.forEach(editable => {
      dset(
        obj,
        `${editable.key ? editable.key + '.' : ''}${editable.name}`,
        editable
      )
    })
    this.setState(state => ({
      editables2: { ...state.editables2, ...{ [page]: obj } }
    }))
  }

  setEditable(key, value) {
    this.setState(state => {
      dset(state, `editables2.${key}.value`, value)
      return state
    })
  }

  addVariants(newVariants) {
    this.setState(state => ({
      variants: { ...state.variants, ...newVariants }
    }))
  }

  createVariant(page, variant) {
    this.setState(state => ({
      variants: {
        ...state.variants,
        [page]: [...(state.variants[page] || {}), variant]
      }
    }))
  }

  deleteVariant(page, key, index) {
    this.setState(state => {
      let variantsNotKey = state.variants[page].filter(x => x.key !== key)
      let variantsKey = state.variants[page].filter(x => x.key === key)
      return {
        variants: {
          ...state.variants,
          [page]: [
            ...variantsNotKey,
            ...variantsKey.filter((x, i) => i !== index)
          ]
        }
      }
    })
  }

  addProps(page, props) {
    let obj = {}
    props.forEach(prop => {
      dset(obj, `${prop.key ? prop.key + '.' : ''}${prop.name}`, prop)
    })
    this.setState(state => ({
      props: { ...state.props, ...{ [page]: obj } }
    }))
  }

  addPage(newPage) {
    this.setState(state => ({ pages: { ...state.pages, ...newPage } }))
  }
}
