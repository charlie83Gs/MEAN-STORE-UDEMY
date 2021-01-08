import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: ``, redirectTo: ``, pathMatch: `full` },
  { path: `**`, redirectTo: `not_found`, pathMatch: `full` }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    }  
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
