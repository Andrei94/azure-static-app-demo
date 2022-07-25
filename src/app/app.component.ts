import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {debounceTime, delay, distinctUntilChanged, interval, last, mergeMap, of, switchMap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  functionOutput: Object = '';
  secretKey: string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onKey($event: string, $secretKey:string) {
    console.log($secretKey)
    this.http.get('https://angular-app-gateway.azure-api.net/print-hello/HttpExample', {
      responseType: 'text',
      params: new HttpParams().append('name', $event),
      headers: new HttpHeaders()
        .append('Ocp-Apim-Subscription-Key', $secretKey)
        .append('Ocp-Apim-Trace', 'true')
    }).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => of(value))
    ).subscribe((value) => {
      console.log(value)
      this.functionOutput = value
    });
  }
}
