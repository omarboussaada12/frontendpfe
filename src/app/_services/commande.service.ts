import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Commande {
  id?: string;
  offername?: string;
  username?: string;
  region?: string;
  nbrunit?: number;


}
@Injectable({
  providedIn: 'root'
})

export class CommandeService {

  endpoint = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) {}
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getCommandesadmin(): Observable<Commande> {
    return this.httpClient
      .get<Commande>(this.endpoint + '/get-all-commandes/')
      .pipe(retry(1), catchError(this.processError));
  }
  getCommandesuser(username:any): Observable<Commande> {
    return this.httpClient
      .get<Commande>(this.endpoint + '/get-all-commandesbyuser/'+username)
      .pipe(retry(1), catchError(this.processError));
  }
  getSingleCommande(id: any): Observable<Commande> {
    return this.httpClient
      .get<Commande>(this.endpoint + '/users/' + id)
      .pipe(retry(1), catchError(this.processError));
  }
  addCommande(data: any): Observable<Commande> {
    return this.httpClient
      .post<Commande>(
        this.endpoint + '/users',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }
  updateCommande(id: any, data: any): Observable<Commande> {
    return this.httpClient
      .put<Commande>(
        this.endpoint + '/users/' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }
  deleteCommande(id: any) {
    return this.httpClient
      .delete<Commande>(this.endpoint + '/users/' + id, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }
  processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(() => {
      message;
    });
  }
}

