import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user-model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  users: User[];
  subscribtion: any;
  id:number;
  firstname:string;
  lastname:string;
  email:string;
  avatar:string;
  EditFormGroup:FormGroup;
  Oid:number;
  
  constructor(private route:ActivatedRoute,private usersService:UsersService){
    this.intializeFormGroup();

  }
  ngOnInit(): void {
    
    if(this.route.snapshot.paramMap.has('id')){
      this.getuserbyId(this.route.snapshot.paramMap.get('id'));
      console.log(this.route.snapshot.paramMap.get('id'));
      
    }
    
  }
  intializeFormGroup():void {
    this.EditFormGroup=new FormGroup({
      Id:new FormControl('',[Validators.required]),
      Name:this.intializeNameFormGroup(),
      Email:new FormControl('',[Validators.required,Validators.email]),
      avatar:new FormControl('',[Validators.required]),
    });
  }

  intializeNameFormGroup(): FormGroup {
    return new FormGroup({
      firstname:new FormControl('',[Validators.required]),
      lastname:new FormControl('',Validators.required)
    })
}
  getuserbyId(id:string):void{
    this.subscribtion=this.usersService.getById(id).subscribe(
        (res) =>{
          console.log(res);
          this.Oid=res.id;
          this.EditFormGroup.get('Id').setValue(res.id);
          this.EditFormGroup.get('Name').setValue({
            firstname:res.first_name,
            lastname:res.last_name
          });
          this.EditFormGroup.get('Email').setValue(res.email);
          this.EditFormGroup.get('avatar').setValue(res.avatar);


        },
        error =>{
          console.log(error);
 
        }
     )
     
   }
   onEdit():void{
    let user:User={
      id:this.EditFormGroup.value.Id,
      first_name:this.EditFormGroup.value.Name.firstname,
      last_name:this.EditFormGroup.value.Name.lastname ,
      email:this.EditFormGroup.value.Email,
      avatar:this.EditFormGroup.value.avatar
    }
    this.usersService.update(this.Oid,user).subscribe(
      res =>{
        console.log(res);
      },
      error =>{
        console.log(error);
      }
    )
   }

  
  
  ngOnDestroy(): void {
    if(this.subscribtion){
      this.subscribtion.unsubscribe();
    }
  }
  
}
