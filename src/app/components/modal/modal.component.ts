import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() book: any;
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content);
  }
}
