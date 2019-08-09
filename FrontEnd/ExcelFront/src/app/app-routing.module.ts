import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreviewComponent } from './preview/preview.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {path:"",redirectTo:'/upload',pathMatch:'full'},
  {path:"preview/:id",component:PreviewComponent},
  {path:"upload",component:UploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
export const Allroutes=[PreviewComponent,UploadComponent];