import FullList from "../model/FullList"

//an interface called DOMList which outlines the structure and behavior expected for objects that represent a list in the DOM. It includes properties and methods like ul (for the unordered list element), clear() (to clear the list), and render(fullList: FullList) (to render the list based on a FullList object).
interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList {

    ul: HTMLUListElement

    static instance: ListTemplate = new ListTemplate()

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = ''
    }

    render(fullList: FullList): void {
        this.clear()

        fullList.list.forEach(item => {
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item"

            const check = document.createElement("input") as HTMLInputElement
            check.type = "checkbox"
            check.id = item.id
            check.checked = item.checked
            li.append(check)

            check.addEventListener('change', () => {
                item.checked = !item.checked
                fullList.save()
            })

            //description
            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            const button = document.createElement("button") as HTMLButtonElement
            button.className = 'button'
            button.textContent = 'X'
            li.append(button)

            // rerender
            button.addEventListener('click', () => {
                fullList.removeItem(item.id)
                this.render(fullList)
            })

            this.ul.append(li)
        })
    }
}