import { BookService } from './../../services/book.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

declare const myTest: any;
declare const loadViewer: any;

@Component({
  selector: 'app-author-search',
  templateUrl: './author-search.component.html',
  styleUrls: ['./author-search.component.scss']
})
export class AuthorSearchComponent implements OnInit {
  @ViewChild('input', {static: false}) input!: ElementRef;
  books: any[] = [];
  searchValue: string = "";
  loading: boolean = false;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) { 
    
  }

  ngOnInit(): void {
    this.authService.isFixedHeader = false;
    if(JSON.parse(localStorage.getItem("books") || "[]").length){
      this.books = JSON.parse(localStorage.getItem("books") || "[]");
      this.searchValue = localStorage.getItem("searchedItem") || "";
      console.log(this.books);
    }
  }

  search(){    
    this.loading = true;
    this.bookService.search(this.input.nativeElement.value)
    .subscribe(
      res => {
      this.loading = false; 
      const sortedArrayPublishDate = res.sort((a,b)=>new Date(b.volumeInfo?.publishedDate).valueOf() - new Date(a.volumeInfo?.publishedDate).valueOf() );
      this.books = sortedArrayPublishDate;
      this.books.forEach(element => {
        console.log(element.volumeInfo?.publishedDate);
        
      });
      localStorage.setItem("books", JSON.stringify(this.books));
      localStorage.setItem("searchedItem", this.input.nativeElement.value);
      
    },
    err => {
      this.loading = false;
    },
    () => {
      this.loading = false;
    }
    )
  }
  
  goToBookPreview(book: any){
    console.log(book);
    this.router.navigateByUrl('/book', { state: book });
  }

  open(content: any, book: any) {
    this.modalService.open(content);
    }
}
