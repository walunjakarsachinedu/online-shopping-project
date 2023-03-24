import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AppError } from '../exceptions/app-error';
import { NotFoundError } from '../exceptions/not-found-error';
import { BadRequestError } from '../exceptions/bad-request-error';

export class DataService {
  constructor(public url: string, public http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.url)
      .pipe(catchError(this.handleError))
  }

  get(id: string | null): Observable<any> {
    return this.http.get(this.url + "/" + id)
      .pipe(catchError(this.handleError))
  }
  
  post(payload: any) {
    return this.http.post(this.url, payload)
      .pipe(map(res => JSON.parse(JSON.stringify(res))))
      .pipe(catchError(this.handleError))
  }

  handleError(error: Response) {
    if(error.status == 400) return throwError(() => new BadRequestError(error));
    if(error.status == 404) return throwError(() => new NotFoundError(error));
    return throwError(() => new AppError(error))
  }
}
