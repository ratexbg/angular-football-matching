import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];    // messages ot tip string[]

  add(message: string) {                 // metod priemasht message: string (message se suzdava basically)
    this.messages.push(message);        // dobavq msg kum arreq message
  }

  clear() {
    this.messages = [];           // izchistva message
  }
}