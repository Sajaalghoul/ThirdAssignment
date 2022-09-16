import { concatMap, from, Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResultBe } from 'src/app/models/result-be.model';
import { User } from 'src/app/models/user-model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,OnDestroy {
    users:User[]=[];
    isLoading:boolean ;
    totalpages:number=0;
    totalpagesAr:number[];
    page:number=1;
    perpage:number=3;
    CheckedItems:boolean[];
    subscribtion: any;
    constructor(private usersService:UsersService) { }
  
    ngOnInit(): void {
      this.getUsers(this.page);
    }
    getUsers(page:number) {
      this.isLoading=true;
      this.subscribtion=this.usersService.getAll(page,this.perpage).subscribe(
         (res:ResultBe<User>) =>{
          let resultbe:ResultBe<User>=res;
          this.users=resultbe.data;
          this.page=resultbe.page;
          this.totalpages=resultbe.total_pages;
          this.totalpagesAr=Array.from(new Array(resultbe.total_pages).keys(), (item)=> item+1);
          this.CheckedItems=Array.from(new Array(resultbe.data.length).keys(), (item)=> false);
          this.isLoading=false;
         },
         error =>{//error
          console.log(error);
  
         }
      )
    }
    ngOnDestroy(): void {
      if(this.subscribtion){
        this.subscribtion.unsubscribe();
      }
    }
    goToPreviousPage():void{
      this.getUsers(this.page -1)
  
    }
    goToNextPage():void{
      this.getUsers(this.page +1)
  
    }
    goToPage(page:number):void{
        this.getUsers(page);
    }
    toggelCheckAll(value:any):void{
      this.CheckedItems=Array.from(new Array(this.users.length).keys(), (item)=> value.target.checked);
      
    }
    toggelCheckBox(value:any,index:number):void{
      this.CheckedItems[index]=value.target.checked;
    }
    ActionOnSelectedItems():void{
      var checkedIds:number[]=[];
      this.CheckedItems.forEach((value,index)=>{
        if(value){
          checkedIds.push(this.users[index].id);
        }
      }
      )
      var obs=from(checkedIds);
      obs.pipe(
        concatMap((value:any)=>{
          return  this.usersService.delete(value);
        })
      ).subscribe(
        res=>{
          console.log(res);
  
        },
        error=>{
          console.log(error);
  
        }
      )
    }
    delete(i:number):void{
      
      this.usersService.delete(i).subscribe(
        res=>{
          console.log(res);
  
        },
        error=>{
          console.log(error);
  
        }
      )
    }


   
}
  
