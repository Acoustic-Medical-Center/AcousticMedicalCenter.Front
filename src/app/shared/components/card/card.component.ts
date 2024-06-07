import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() buttonText!: string;
  @Input() id!: number;

  @Output() cardClick = new EventEmitter<number>();

  onCardClick() {
    this.cardClick.emit(this.id);
  }
}
