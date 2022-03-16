import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassResultsPageComponent } from './pages/class-results-page/class-results-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { TotalClassResultsPageComponent } from './pages/total-class-results-page/total-class-results-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: StartPageComponent,
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
