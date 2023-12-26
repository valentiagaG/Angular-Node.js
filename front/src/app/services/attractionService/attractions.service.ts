import { Injectable, inject, signal, computed } from '@angular/core';
import { Attraction, AttractionsList } from '../../interfaces/req-res';
import { delay, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface State {
  attractions: Attraction[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {
  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    attractions: [],
  })

  //creo una señal computada --> solo de lectura
  public attractions = computed(() => this.#state().attractions);
  public loading = computed(() => this.#state().loading);


  constructor() {
    this.http.get<AttractionsList>('http://localhost:4000/api/attractions')
      .pipe(delay(1000))
      .subscribe((res: { body: any; }) => {
        this.#state.set({
          loading: false,
          attractions: res.body,
        })
      });
  }

  name = '';
  add = '';
  acc = 0;
  aimedTo = '';
  danger = 0;

  data = {
    name: this.name,
    address: this.add,
    accesibility: this.acc,
    aimedTo: this.aimedTo,
    danger: this.danger,
  };

  // Método para realizar una solicitud POST
  postAttraction(name: string, add: string, acc: number, danger: number, aimedTo: string) {
    this.data = {
      name: name,
      address: add,
      accesibility: acc,
      aimedTo: aimedTo,
      danger: danger,
    }
    this.http.post<AttractionsList>('http://localhost:4000/api/attractions', this.data)
      .pipe(delay(1000))
      .subscribe(
        (response: any) => {
          console.log('Atraccion agregada');
        }
      );
  }
}
