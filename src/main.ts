import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  // Add listener to new entry form submit
  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement

  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault()

    // Get the new item value
    const input = document.getElementById("newItem") as HTMLInputElement
    const newEntryText: string = input.value.trim()
    if (!newEntryText.length) return

    // calculate item ID
    // The code then calculates the ID for the new item. If there are existing items in the fullList,
    // it calculates the ID based on the last item's ID. Otherwise, it sets the ID to 1.
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1

    // create new item
    const newItem = new ListItem(itemId.toString(), newEntryText)
    // Add new item to full list
    fullList.addItem(newItem)
    // Re-render list with new item included
    template.render(fullList)
  })

  // Add listener to "Clear" button
  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement

  clearItems.addEventListener('click', (): void => {
    fullList.clearList()
    template.clear()
  })

  // load initial data
  fullList.load()
  // initial render of template
  template.render(fullList)
}

document.addEventListener("DOMContentLoaded", initApp) 