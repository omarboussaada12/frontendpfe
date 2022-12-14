import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Commande } from '../_model/Commande';
import { Offer } from '../_model/Offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  endpoint = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) {}
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getOffers(): Observable<Offer> {
    return this.httpClient
      .get<Offer>(this.endpoint + '/get-all-offer')
      .pipe(retry(1), catchError(this.processError));
  }
  getOffersname(): Observable<Offer["name"]> {
    return this.httpClient
      .get<string>(this.endpoint + '/get-all-offer-names')
      .pipe(retry(1), catchError(this.processError));
  }
  getSingleOffer(id: any): Observable<Offer> {
    return this.httpClient
      .get<Offer>(this.endpoint + '/get-Offer/' + id)
      .pipe(retry(1), catchError(this.processError));
  }
  addOffer(data: any): Observable<Offer> {
    return this.httpClient
      .post<Offer>(
        this.endpoint + '/add-Offer',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }
  /*change function in the backend*/
  updateOffer(id: any, data: any): Observable<Offer> {
    return this.httpClient
      .put<Offer>(
        this.endpoint + '/update-offer' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }
  deleteOffer(id: any) {
    return this.httpClient
      .delete<Offer>(this.endpoint + '/delete-Offer/' + id, this.httpHeader)
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
