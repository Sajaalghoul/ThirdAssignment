import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultBe } from 'src/app/models/result-be.model';
import { User } from 'src/app/models/user-model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  users: User[];
  subscribtion: any;
  id:number;
  firstname:string;
  lastname:string;
  email:string;
  avatar:string;

  constructor(private route:ActivatedRoute,private usersService:UsersService) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.has('id')){
      this.getuserbyId(this.route.snapshot.paramMap.get('id'));
      console.log(this.route.snapshot.paramMap.get('id'));
      
    }
    
  }
  getuserbyId(id:string):void{
    this.subscribtion=this.usersService.getById(id).subscribe(
        (res) =>{
          console.log(res);
          this.id=res.id;
          this.firstname=res.first_name;
          this.lastname=res.last_name;
          this.email=res.email;
          this.avatar=res.avatar;

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
}
