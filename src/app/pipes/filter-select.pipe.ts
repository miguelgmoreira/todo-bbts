import { Pipe, PipeTransform } from '@angular/core';

import { Todo } from '../components/todo/models/todo.model';

@Pipe({
  name: 'filterSelect'
})
export class FilterPipe implements PipeTransform {

  transform(value: Todo[], filterOption: string): Todo[] {

    if (value.length === 0 || !filterOption) {

      return value;

    } else if(filterOption === 'todas') {

      return value

    }

    let filteredTodos: Todo[] = [];

    for (let todo of value) {

      if (todo['status'] === filterOption.replace('s', '')) {

        filteredTodos.push(todo);

      }

    }

    return filteredTodos;

  }

}
