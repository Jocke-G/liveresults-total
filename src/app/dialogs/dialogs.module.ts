import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalClassResultsConfigDialogComponent } from './total-class-results-config-dialog/total-class-results-config-dialog.component';



@NgModule({
  declarations: [
    TotalClassResultsConfigDialogComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedMaterialModule,
  ],
  exports: [
  ],
})
export class DialogsModule { }
