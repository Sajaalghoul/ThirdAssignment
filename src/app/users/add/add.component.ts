import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user-model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
}
)

export class AddComponent implements OnInit {
  users:User[]=[];
  isLoading:boolean;
  totalpages:number=0;
  totalpagesAr:number[];
  page:number=1;
  perpage:number=3;
  subscribtion:Subscription;
  AddFormGroup:FormGroup;

  constructor(private usersService:UsersService) { 
    this.intializeFormGroup();
  }
  
  intializeFormGroup():void {
    this.AddFormGroup=new FormGroup({
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

  ngOnInit(): void {

  }
  onAdd():void{
    let user:User={
      id:this.AddFormGroup.value.Id,
      first_name:this.AddFormGroup.value.Name.firstname,
      last_name:this.AddFormGroup.value.Name.lastname ,
      email:this.AddFormGroup.value.Email,
      avatar:this.AddFormGroup.value.avatar
    }
    console.log(user);
    this.usersService.add(user)
    .subscribe(
      res=>{
        console.log("added",res);

      },
      error=>{
        console.log(error);

      }
    )
    
  }
       
}
