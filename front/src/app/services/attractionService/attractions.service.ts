import { Injectable, inject, signal, computed, EventEmitter } from '@angular/core';
import { Attraction, AttractionsList } from '../../interfaces/req-res';
import { delay } from 'rxjs';
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
  public attractionsChanged = new EventEmitter<void>();
  
  #state = signal<State>({
    loading: true,
    attractions: [],
  })

  //creo una señal computada --> solo de lectura
  public attractions = computed(() => this.#state().attractions);
  public loading = computed(() => this.#state().loading);
  

  // private attractionsSubject = new BehaviorSubject<Attraction[]>([]);
  // attractions$: Observable<Attraction[]> = this.attractionsSubject.asObservable();
  constructor() {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<AttractionsList>('http://localhost:4000/api/attractions')
      .pipe(delay(1000))
      .subscribe((res: { body: Attraction[] }) => {
        this.#state.set({
          loading: false,
          attractions: res.body,
        });
        // this.attractionsSubject.next(res.body);
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
  public async postAttraction(name: string, add: string, acc: string, danger: string, aimedTo: string) {
    const newAttraction: Attraction = {
      name: name,
      address: add,
      accesibility: parseInt(acc, 10),
      aimedTo: aimedTo,
      danger: danger,
      idAttraction: 0
    };

    this.data = {
      name: name,
      address: add,
      accesibility:  parseInt(acc, 10),
      aimedTo: aimedTo,
      danger: parseInt(danger, 10),
    }

    this.#state.update((currentState) => ({
      ...currentState,
      attractions: [...currentState.attractions, newAttraction],
    }));
    
    this.http.post<AttractionsList>('http://localhost:4000/api/attractions', this.data)
      .pipe(delay(1000))
      .subscribe(
        (response: any) => {
          console.log('Atraccion agregada');
        }
      );
    
      this.attractionsChanged.emit();
  }
}
