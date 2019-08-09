import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  uploadForm:FormGroup;
  Choosefile='Choose File';
  constructor(private fb:FormBuilder,private http:HttpClient,private route:Router) { }
  file:File;
  url = 'http://localhost:3000/excel';
  ngOnInit() {
    this.uploadForm=this.fb.group({

    });
  }

  onFleLoad(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.Choosefile=this.file.name;
    }
  }
  
  onUplaod() {
    console.log("upload")
    const formdata= new FormData();
    formdata.append('datasheet',this.file,this.file.name);
    this.http.post<any>(this.url,formdata).subscribe((res)=>
    {
      console.log(res.result._id);
     this.route.navigate(['/preview',res.result._id]);
    },(err)=>{console.log(err)})

  }

}
