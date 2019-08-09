import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient,HttpHeaders, } from '@angular/common/http';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {IWorkBook} from 'ts-xlsx';
import * as XLSX from 'ts-xlsx'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  file:File;
  ID;
  quickAddForm:FormGroup;
  modalRef: BsModalRef;
  Alldata=[];
  emp;
  mng;
  stat;
  allinfo={employees:[],manager:[]};
  curuser;
  ArrayBuffer:any;
  url = 'http://localhost:3000/excel/';
  constructor(private http:HttpClient,private fb:FormBuilder,private route:ActivatedRoute,private router:Router,private modalService:BsModalService,private toastr: ToastrService) { }

  openModal(template: TemplateRef<any>,user,stat) {
    this.stat=stat;
   this.modalRef = this.modalService.show(template);
    this.curuser=user;   if(stat==='emp'){ 
    this.quickAddForm.patchValue({fname:user.empName});
    this.quickAddForm.patchValue({lname:user.empLastName});
    this.quickAddForm.patchValue({empcode:user.emp_code});
    this.quickAddForm.patchValue({mngcode:user.mng_code});
    this.quickAddForm.patchValue({email:user.empEmail});
    this.quickAddForm.patchValue({status: user.empStatus});}
    if(stat==='mng'){
      this.quickAddForm.patchValue({fname:user.mngName});
      this.quickAddForm.patchValue({lname:user.mngLastName});
      this.quickAddForm.patchValue({empcode:user.emp_code});
      this.quickAddForm.patchValue({mngcode:'-'});
      this.quickAddForm.patchValue({email:user.mngEmail});
      this.quickAddForm.patchValue({status: user.mngStatus});
    }

  }
  NOOdelete(){
    this.toastr.error('you cannot Delete Manager', 'Restricted !');
  }
  ondelete(i,array){
  array.splice(i, 1);
  
  this.toastr.success('Employee Deleted Sucessfully', 'Success !');
  if(array.length<4){
    console.log("Baboov manager is deleted");
  }
  }

  ngOnInit() {
    this.ID= this.route.snapshot.paramMap.get('id');
    console.log(this.ID);
    this.http.get<any>(this.url+this.ID).subscribe((res)=>
    {
      console.log(res);
      this.allinfo=res.ress;
     this.emp=res.ress.employees;
      this.mng=res.ress.manager;

    },
    (err)=>{console.log(err)})


    this.quickAddForm=this.fb.group({
      fname:[''],
      lname:[''],
      empcode:[''],
      mngcode:[''],
      email:[''],
      status:['']
    })
  };
  onClick(){
  // console.log(this.emp); 
  if(this.stat==='emp'){
    for(let i=0;i<this.allinfo.employees.length;i++)
    {
      if(this.curuser==this.allinfo.employees[i]){
        this.allinfo.employees[i].emp_code=this.quickAddForm.get('empcode').value;
        this.allinfo.employees[i].empName=this.quickAddForm.get('fname').value;
        this.allinfo.employees[i].mng_code=this.quickAddForm.get('mngcode').value;
        this.allinfo.employees[i].empLastName=this.quickAddForm.get('lname').value;
        this.allinfo.employees[i].empStatus=this.quickAddForm.get('status').value;
        this.allinfo.employees[i].empEmail=this.quickAddForm.get('email').value;
          this.toastr.success('Employee edited Sucessfully', 'Success !');
  
      }
    }
  }
  if(this.stat==='mng'){
    let oldempid;
    let newempid;
    for(let i=0;i<this.allinfo.manager.length;i++)
    {
      if(this.curuser==this.allinfo.manager[i]){
        oldempid= this.allinfo.manager[i].emp_code;
        newempid=this.quickAddForm.get('empcode').value;
        this.allinfo.manager[i].emp_code=this.quickAddForm.get('empcode').value;
        this.allinfo.manager[i].mngName=this.quickAddForm.get('fname').value;
        //this.allinfo.manager[i].mng_code=this.quickAddForm.get('mngcode').value;
        this.allinfo.manager[i].mngLastName=this.quickAddForm.get('lname').value;
        this.allinfo.manager[i].mngStatus=this.quickAddForm.get('status').value;
        this.allinfo.manager[i].mngEmail=this.quickAddForm.get('email').value;
          this.toastr.success('Employee edited Sucessfully', 'Success !');
  
      }
    }
  console.log("EmpId  "+oldempid+"New one is "+newempid);
  for(let i=0;i<this.allinfo.employees.length;i++)
  {
    if(this.allinfo.employees[i].mng_code===oldempid){
      this.allinfo.employees[i].mng_code=newempid;
     


    }
  }
  }
 
  // console.log(this.quickAddForm.get('fname').value),
  // console.log(this.quickAddForm.get('lname').value ),
  // console.log(this.quickAddForm.get('empcode').value ),
  // console.log(this.quickAddForm.get('mngcode').value),
  // console.log(this.quickAddForm.get('email').value),
  // console.log(this.quickAddForm.get('status').value)

  }
  onDelete(){
    console.log(this.ID);
    this.router.navigate(['/upload']);
   this.http.delete(this.url+this.ID).subscribe((res)=>{
     console.log(res) 
   }),(err)=>{
     console.log(err)
   }
  }

  onSave(){
 let formdata=new FormData();
 
 formdata.append('managers',JSON.stringify(this.mng));
 formdata.append('employes',JSON.stringify(this.emp));

this.http.post(this.url,formdata).subscribe((result)=>{
  console.log('response',result);
},(err)=>{console.log(err)})

  

}
}