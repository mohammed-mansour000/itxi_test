import { AuthService } from 'src/app/services/auth.service';
import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-preview-book',
  templateUrl: './preview-book.component.html',
  styleUrls: ['./preview-book.component.scss']
})
export class PreviewBookComponent implements OnInit {
  bookId: string = "";
  book: any;
  loadFirstTime: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    public bookService: BookService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) { 
  }

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.params['id'];
    this.authService.isFixedHeader = false;
    console.log(this.book);

    this.getSingleBook();
  
  }

  getSingleBook(){
    this.spinner.show();
    this.loadFirstTime = true;
    this.bookService.getSingleBook(this.bookId)
    .subscribe(
      res => {
        this.spinner.hide();
        this.book = res;

        var evt = new CustomEvent("ngFix", {detail: this.book?.id});
        window.dispatchEvent(evt);

        var refresh = localStorage.getItem('refresh');
        console.log(refresh);
        if (refresh===null){
            const myTimeout = setTimeout(() => { location.reload();  clearTimeout(myTimeout);}, 1500); 
            localStorage.setItem('refresh', "1");
        }
    },
    err => {
      this.spinner.hide();
    },
    () => {
      this.spinner.hide(); 
      
    }
    )
  }

  open(content: any) {
    this.modalService.open(content);
  }
  
  ngOnDestroy(): void {
    localStorage.removeItem("refresh")
  }
}
