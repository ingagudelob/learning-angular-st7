import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  constructor(private gifsService: GifsService) { }

  // Selector de html, busca en html el elemento que tenga esa referencia
  // search!: puede ser null
  @ViewChild('txtSearch') txtSeach!: ElementRef<HTMLInputElement>;

  // Cuado utilizamos el tipado ElementRef<HTMLInputElement> puedo acceder a las propiedades: value, focus, select etc

  search() {
    const value = this.txtSeach.nativeElement.value
    this.gifsService.searchGifs(value)
    this.txtSeach.nativeElement.value = "";
  }
}
