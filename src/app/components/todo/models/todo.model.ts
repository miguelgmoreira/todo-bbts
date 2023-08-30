export class Todo {
  id: number = 0;
  nome: string = '';
  tipo: string = '';
  hora: string = '';
  estaCompleta: boolean = false;
  deletada: boolean = false;
  status: string = 'incompleta';
  horaDeAdicaoAoHistorico: string = '';
  diaDeAdicaoAoHistorico: string = '';
  metodoDeAdicaoAoHistorico: string = '';
}
