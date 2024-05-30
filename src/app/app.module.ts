import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './shared/card/card.component';
import { ReceitasComponent } from './views/receitas/receitas.component';
import { PlaceholderComponent } from './shared/placeholder/placeholder.component';
import { StarRatingModule } from 'angular-star-rating';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ReceitasComponent,
    PlaceholderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StarRatingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
