import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassResultsPageComponent } from './pages/class-results-page/class-results-page.component';
import { TotalClassResultsPageComponent } from './pages/total-class-results-page/total-class-results-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/total?competitionIds=19908,19915&className=H21',
      },
      {
        path: 'classResults',
        component: ClassResultsPageComponent,
      },
      {
        path: 'total',
        component: TotalClassResultsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
