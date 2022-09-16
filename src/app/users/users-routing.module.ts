import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path:'add',
    component:AddComponent
  },
  {
    path:'edit/:id',
    component:EditComponent
  },
  {
    path:'list',
    component:ListComponent
  },
  {
    path:'details/:id',
    component:DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
