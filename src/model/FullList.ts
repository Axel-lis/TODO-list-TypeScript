import ListItem from './ListItem';

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
   static instance: FullList = new FullList();

  //pondré private porque solo habrá una instancia de la clase implementada
  private constructor(private __list: ListItem[] = []) {}

  //getter de list
  get list(): ListItem[] {
    return this.__list;
  }
  //metodo load
  load(): void {
      const storedList: string | null = localStorage.getItem("mi lista")
      if(typeof storedList !== "string") return

      const parsedList: {_id: string, _item: string, _checked: boolean}[] = JSON.parse(storedList)

      parsedList.forEach(itemObj => {
        const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);
        FullList.instance.addItem(newListItem)
      })
    }
  //metodo guardar
  save() : void {
    localStorage.setItem("mi lista", JSON.stringify(this.__list));
  }
  //metodo limpiar (clear)
  clearList(): void {
    this.__list = [];
    this.save(); //guardar
  }
  //metodo agregar item
  addItem(itemObj: ListItem): void {
    this.__list.push(itemObj);
    this.save(); //guardar
  }
  //metodo borrar item
  removeItem(id: string): void {
    this.__list = this.__list.filter((item) => item.id !== id);
    this.save(); //guardar
  }

}
