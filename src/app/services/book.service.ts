import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private BASE_URL = environment.BASE_URL;
  private API_KEY = environment.API_KEY;
  private SEARCH_URL = '';
  private GET_SINGLE_BOOK_URL = "";
  startIndex: number = 0;
  endIndex: number = 40;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  search(query: string): Observable<any[]> {
    if(this.hasWhiteSpace(query)){
      this.SEARCH_URL = `${this.BASE_URL}?q=inauthor:"${query}"&filter=free-ebooks&key=${this.API_KEY}&startIndex=${this.startIndex}&maxResults=${this.endIndex}`
    }
    else{
      this.SEARCH_URL = `${this.BASE_URL}?q=inauthor:${query}&filter=free-ebooks&key=${this.API_KEY}&startIndex=${this.startIndex}&maxResults=${this.endIndex}`
    }
    return this.http
      .get<{ items: any[] }>(this.SEARCH_URL)
      .pipe(map(books => books.items || []))
      .pipe(catchError(this.handleError.bind(this)));
  }

  getSingleBook(bookId: string): Observable<Object>{
    this.GET_SINGLE_BOOK_URL = `${environment.BASE_URL}/${bookId}?key=${this.API_KEY}`
    return this.http
      .get<Object>(this.GET_SINGLE_BOOK_URL)
      .pipe(catchError(this.handleError.bind(this)))
     
  }
  hasWhiteSpace(s:string) {
    return (/\s/).test(s);
  }

  private handleError({ error, status }: HttpErrorResponse): Observable<never> {
		if (!status) this.toastr.error("Connection Error");
		else this.toastr.error(error?.message || "Something Went Wrong");
		return throwError(error);
	}
}
