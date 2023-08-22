import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../components/todo/models/todo.model';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {

  transform(value: Todo[], filterString: string) {
    if(value.length === 0) {
      return value
    }

    const filteredTodos = []
    for(let todo of value) {
      if(todo['nome'].toLowerCase().includes(filterString)) {

        filteredTodos.push(todo)

      }
    }
    return filteredTodos
  }
}
