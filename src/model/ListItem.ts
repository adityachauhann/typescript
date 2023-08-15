//interface named item which has id, item, checked for list item.
export interface Item {
    id: string,
    item: string,
    checked: boolean,
}

//class which has default export which implements item interface.
export default class ListItem implements Item {

    //no assignments because i am putting it inside a constructor. 
    //id, item, checked are getters and setters, for state, it would be with an _
    // could assign but it would be double work while compiling.
    constructor(
        private _id: string = '',
        private _item: string = '',
        private _checked: boolean = false,
    ) { }

    get id(): string {
        return this._id
    }

    set id(id: string) {
        this._id = id
    }

    get item(): string {
        return this._item
    }

    set item(item: string) {
        this._item = item
    }

    get checked(): boolean {
        return this._checked
    }

    set checked(checked: boolean) {
        this._checked = checked
    }
}

//model for our list item