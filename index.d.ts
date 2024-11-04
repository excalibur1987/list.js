declare module 'list.js' {
  class List<T> {
    listContainer: HTMLElement

    list: HTMLElement

    items: List.ListItem<T>[]

    visibleItems: List.ListItem<T>[]

    matchingItems: List.ListItem<T>[]

    searched: boolean

    filtered: boolean

    i: number

    page: number

    valueNames: List.ValueNames

    listClass: string
    searchClass: string
    sortClass: string

    searchColumns: string[] | undefined
    searchDelay: number

    handlers: { [key: List.Events]: () => void }

    templater: List.Templater<T> | undefined

    constructor(element: string | HTMLElement, options?: List.ListOptions<T>, values?: T[])

    add(values: T[], callback?: (item: List.ListItem<T>) => void): void

    remove(valueName: string, value: any): number

    get(valueName: string, value: any): List.ListItem<T>[]

    sort(valueName: string, options: List.SortOptions): void

    search(searchString: string, columns?: string[]): void

    clear(): void

    filter(filterFunction?: (item: List.ListItem<T>) => boolean): void

    size(): number

    show(i: number, page: number): void

    update(): void

    reIndex(): void

    fuzzySearch(searchString: string, columns?: string[]): void

    on(event: List.Events, callback: () => void): void

    off(event: List.Events, callback: () => void): void

    toJSON(): T[]

    size(): number

    pagination(): void

    trigger(event: List.Events): List<T>
    reset(): List<T>
    parse(): void
  }

  namespace List {
    interface ListItem<T = {}> {
      elm: HTMLElement

      values(newValues: object): void
      values(): T
      show(): void
      hide(): void
      matching(): boolean
      visible(): boolean
    }

    interface ListOptions<T = {}> {
      valueNames?: ValueNames
      item?: string | ((itemValues: T) => string)
      listClass?: string
      searchClass?: string
      sortClass?: string
      indexAsync?: boolean
      page?: number
      i?: number
      pagination?:
        | {
            innerWindow?: number
            left?: number
            right?: number
            paginationClass?: string
            item?: string
          }
        | boolean
    }

    interface SortOptions {
      order?: string
      alphabet?: string
      insensitive?: boolean
      sortFunction?: (a: object, b: object) => number | undefined
    }

    type ValueNames = Array<string | { name: string; attr: string } | { data: string[] }>
    type Events =
      | 'filterStart'
      | 'filterComplete'
      | 'updated'
      | 'parseComplete'
      | 'searchStart'
      | 'searchComplete'
      | 'sortStart'
      | 'sortComplete'
      | 'paginationStart'
      | 'paginationEnd'

    class Templater<T> {
      list: List<T>
      constructor(list: List)

      get<TK extends keyof T>(item: List.ListItem<T>, valueNames: TK[]): Pick<T, K>
      set(item: List.ListItem<T>, values: T): void
      create(item: List.ListItem<T>): boolean
      remove(item: List.ListItem<T>): void
      show(item: List.ListItem<T>): void
      hide(item: List.ListItem<T>): void
      clear(): void
    }
  }

  export default List
}
