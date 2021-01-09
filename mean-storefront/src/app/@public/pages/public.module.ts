import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from '@shop/pages/public.component';
import { HeaderComponent } from '@shop-core/components/header/header.component';
import { NavbarComponent } from '@shop-core/components/navbar/navbar.component';
import { FooterComponent } from '@shop-core/components/footer/footer.component';
import { NotFoundComponent } from '@shop/pages/not-found/not-found.component';


@NgModule({
  declarations: [PublicComponent, HeaderComponent, NavbarComponent, FooterComponent, NotFoundComponent],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
