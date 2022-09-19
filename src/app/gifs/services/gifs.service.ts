import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { DataGifs, SearchGisfResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = "8XdFTbXTnXVWnzmG365YTZU7Aa6sFGYr"

  private _ulrApi: string = "https://api.giphy.com/v1/gifs"

  private _history: string[] = [];

  public dataGifs: DataGifs[] = [];

  get history() {
    return [...this._history];
  }

  get apiKey() {
    return this._apiKey
  }

  get urlApi() {
    return this._ulrApi;
  }

  searchGifs(query: string) {

    query = query.trim().toLowerCase();

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10)

      localStorage.setItem('history', JSON.stringify(this._history))
    }

    // Objeto para parametros Http

    const paramsApi = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGisfResponse>(`${this.urlApi}/search`, { params: paramsApi })
      .subscribe((response) => {
        this.dataGifs = response.data
        localStorage.setItem('lastResult', JSON.stringify(this.dataGifs))
      })

  }

  constructor(private http: HttpClient) {
    if (localStorage.getItem('history')) {
      this._history = JSON.parse(localStorage.getItem('history')!)
      this.dataGifs = JSON.parse(localStorage.getItem('lastResult')!)
    }
  }




}
