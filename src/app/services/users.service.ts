import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { ResultBe } from '../models/result-be.model';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiLink:string='https://reqres.in/api/users'

  constructor(private http:HttpClient) { }
  add(user:User):Observable<User>{
    return this.http.post<User>(this.apiLink,user,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
      )

  }
  update(id:number,user:User):Observable<User>{
    return this.http.put<User>(`${this.apiLink}/${id}`,user,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
      )

  }
  getAll(page:number,perPage:number):Observable<ResultBe<User>>{
    let params =new HttpParams();
    params= params.append('page', page);
    params=params.append('per_page',perPage)
    return this.http.get<ResultBe<User>>(this.apiLink, {
      headers:new HttpHeaders({'Content-Type':'application/json'}),
      observe:'body',
      params:params

    }).pipe(
      map((res:any)=>{
        let users:User[]=[];
        res.data.forEach((item: User ) => {
          let usr={
            id:item.id,
            first_name:item.first_name,
            last_name:item.last_name,
            avatar:item.avatar,
            email:item.email,
          }   
          users.push(usr);  
        });
        return {
          page:res.page,
          per_page:res.per_page,
          total:res.total,
          total_pages:res.total_pages,
          data:users 
        }
      })
     
    )
  }
  getById(id:string):Observable<User>{
    return this.http.get<User>(`${this.apiLink}/${id}`, {
      headers:new HttpHeaders({'Content-Type':'application/json'}),
      observe:'body'
    }).pipe(
      map((res:any)=>{
        let user:User={
          id:res.data.id,
          first_name:res.data.first_name,
          last_name:res.data.last_name,
          avatar:res.data.avatar,
          email:res.data.email,
        }
        return user;

      })
    )
  }

  delete(id:number):Observable<any>{
    return this.http.delete<User>(`${this.apiLink}/${id}`,{
      headers:new HttpHeaders({'Content-Type':'application/json'}),
      observe:'body',
    })
  }

}
