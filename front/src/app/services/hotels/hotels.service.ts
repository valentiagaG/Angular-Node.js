import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Hotel, HotelsList } from '../../interfaces/req-res';
import { delay } from 'rxjs';


interface State {
  hotels: Hotel[];
  loading: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    hotels: [],
  })

  //creo una señal computada --> solo de lectura
  public hotels = computed(() => this.#state().hotels);
  public loading = computed(() => this.#state().loading);

  
  constructor() { 
    this.http.get<HotelsList>('http://localhost:4000/api/hotels')
      .pipe(delay(1000))
      .subscribe((res: { body: any; }) => {
        this.#state.set({
          loading: false,
          hotels: res.body,
        })
      });
  }
}
