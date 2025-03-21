import { Component, Input, HostListener } from '@angular/core';
import { GetSaleResult } from 'src/app/models/sale.model';

@Component({
  selector: 'app-sale-details-drawer',
  templateUrl: './sale-details-drawer.component.html',
  styleUrls: ['./sale-details-drawer.component.scss']
})
export class SaleDetailsDrawerComponent {
  @Input() sale!: GetSaleResult;
  @Input() visible = false;
  @Input() onClose!: () => void;

  // 🔥 Fecha com tecla ESC
  @HostListener('document:keydown.escape', ['$event'])
  onEscKey(event: KeyboardEvent) {
    if (this.visible) {
      this.onClose();
    }
  }
}


/*
import { Component, Input } from '@angular/core';
import { GetSaleResult } from 'src/app/models/sale-result.model';

@Component({
  selector: 'app-sale-details-drawer',
  templateUrl: './sale-details-drawer.component.html',
  styleUrls: ['./sale-details-drawer.component.scss']
})
export class SaleDetailsDrawerComponent {
  @Input() sale!: GetSaleResult;
  @Input() visible = false;
  @Input() onClose!: () => void;
}
*/



/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-sale-details-drawer',
  templateUrl: './sale-details-drawer.component.html',
  styleUrls: ['./sale-details-drawer.component.scss']
})
export class SaleDetailsDrawerComponent {

}
*/