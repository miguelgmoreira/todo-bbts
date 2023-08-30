import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  constructor() {}

  getHoraAtualFormatada(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const timeFormatter = new Intl.DateTimeFormat('pt-BR', options);
    return timeFormatter.format(now);
  }

  getDataAtualFormatada(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
    };
    const timeFormatter = new Intl.DateTimeFormat('pt-BR', options);
    return timeFormatter.format(now);
  }
}
