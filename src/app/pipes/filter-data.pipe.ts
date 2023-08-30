import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../components/todo/models/todo.model';

@Pipe({
  name: 'filterData',
})
export class FilterDataPipe implements PipeTransform {
  transform(value: Todo[]) {
    if (value.length === 0 || !value) {
      return value;
    }

    let filteredTodos: Todo[] = [];

    filteredTodos = value.sort((a, b) =>
      b.horaDeAdicaoAoHistorico.localeCompare(
        a.horaDeAdicaoAoHistorico,
        undefined,
        { numeric: true }
      )
    );

    filteredTodos = value.sort((a, b) =>
      b.diaDeAdicaoAoHistorico
        .replace('/', '')
        .localeCompare(a.diaDeAdicaoAoHistorico.replace('/', ''), undefined, {
          numeric: true,
        })
    );

    filteredTodos.map(
      (item) =>
        (item.horaDeAdicaoAoHistorico = item.horaDeAdicaoAoHistorico.substring(
          0,
          item.horaDeAdicaoAoHistorico.length - 3
        ))
    );

    return filteredTodos;
  }
}
