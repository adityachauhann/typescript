import ListItem from './ListItem'

//in this interface we will have methods for the list
interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
    //returning void
}

export default class FullList implements List {

    static instance: FullList = new FullList()

    // list is array of list item default value of empty array
    // singleton, because there is onply one instance of this class created, gonna keep referring to that instance.
    // private ^ ref above 
    private constructor(private _list: ListItem[] = []) { }

    //getter for list
    get list(): ListItem[] {
        return this._list
    }

    //esponsible for loading data from the browser's localStorage, parsing it, and 
    //then populating a list (FullList) with the parsed data.
    // In summary, this code is designed to retrieve data stored in the browser's local storage under the key "myList". 
    // If the data exists and is valid JSON, it's parsed into an array of objects. For each object in the array, a new ListItem 
    // object is created using the object's properties, and this ListItem is added to a list managed by the FullList class. The load() 
    // method essentially restores the list's state from the stored data in local storage.
    load(): void {
        const storedList: string | null = localStorage.getItem("myList")
        if (typeof storedList !== "string") return

        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList)

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
        })
    }

    //localstorage so that it doesn't get affected after reload.
    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    //clearing and saving local storage
    clearList(): void {
        this._list = []
        this.save()
    }

    //pushing in the item object we received
    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    // removes an item from a list of items based on its id
    removeItem(id: string): void {
        // This line filters the _list array to remove the item with a matching id. It uses the Array.prototype.filter() method 
        // to create a new array that includes only the items for which the given callback function returns true. 
        // In this case, the callback function compares the id of each item with the provided id and returns true if they are not equal. 
        // This effectively removes the item(s) with the specified id from the array.

// this._list: This refers to an array called _list that presumably contains a collection of items, each represented as an object.
// .filter(item => item.id !== id): Here, we're using the .filter() method, which is available for arrays. It creates a new array by going 
// through each item in the _list array and deciding whether to include it in the new array based on the condition provided in the callback function.
// item => item.id !== id: This is the callback function used with .filter(). It takes each item in the _list array and compares the id of that item 
// with the provided id. If the id of the current item is not equal to the provided id, the callback function returns true. This means that the current 
// item will be included in the new array. If the id of the current item is equal to the provided id, the callback function returns false, and the current
// item will be excluded from the new array.
// this._list = ...: Finally, the result of the .filter() operation is assigned back to the _list array. The result is a new array that contains only the
// items from the original _list array whose id is not equal to the provided id. As a result, items with a matching id are effectively removed from the _list array, 
// and _list now contains only the items that were not removed.
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
}