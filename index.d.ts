declare module 'list.js' {
  class List<T> {
    listContainer: HTMLElement

    list: HTMLElement

    items: List.ListItem<T>[]

    visibleItems: List.ListItem<T>[]

    matchingItems: List.ListItem<T>[]

    searched: boolean

    filtered: boolean

    alphabet: string

    i: number

    valueNames: List.ValueNames

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
  }

  namespace List {
    interface ListItem<T> {
      elm: HTMLElement

      values(newValues: object): void
      values(): T
      show(): void
      hide(): void
      matching(): boolean
      visible(): boolean
    }

    interface ListOptions<T> {
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
  }

  export default List
}
