import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../components/todo/models/todo.model';

@Pipe({
  name: 'filterOrdem'
})
export class FilterOrdemPipe implements PipeTransform {

  transform(value: Todo[], filterOrdem: string) {

    if (value.length === 0 || !value) {
      return value
    }

    let filteredTodos: Todo[] = [];

    if (filterOrdem === 'crescente') {

      filteredTodos = value.sort((a, b) =>
        a.hora.localeCompare(b.hora, undefined, { numeric: true }));

    } else {

      filteredTodos = value.sort((a, b) =>
        b.hora.localeCompare(a.hora, undefined, { numeric: true }));
        
    }

    return filteredTodos

  }
}
