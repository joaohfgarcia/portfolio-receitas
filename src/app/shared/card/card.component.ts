import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
image: any;
title: string | undefined;
rating: number | undefined;
description: string | undefined;
link: string|any[]|null|undefined;

constructor() {}
  @Input() receita: any;
}
