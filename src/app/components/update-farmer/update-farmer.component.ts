import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {FarmerService} from './../../services/farmer.service';
import {Router, ActivatedRoute  } from '@angular/router';
import{ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-farmer',
  templateUrl: './update-farmer.component.html',
  styleUrls: ['./update-farmer.component.css']
})
export class UpdateFarmerComponent {
  
  title = 'Angular Form Validation Tutorial';
  angForm: FormGroup;
  base64uri ;
  id;
  constructor(
    private fb: FormBuilder,    
    private readonly farmerService: FarmerService,
    private router: Router,
    private readonly toastr: ToastrService,
    private route: ActivatedRoute) {
 }
 ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.createForm()
  }
  createForm() {
   this.angForm = this.fb.group({
      name: ['', Validators.required ],
      age: ['', Validators.required ],
      totalFieldArea: ['', Validators.required ],
      crop: ['', Validators.required ],
      photo: [''],
      gender: [''],
      educationLevel: [''],
      married: ['' ],
      familyCount: ['' ],
      numberOfChildren: ['']
   });
   this.getValues();
 }
 getValues(){   
  this.farmerService.getFarmer(this.id).subscribe(
    (result:any) => {
      let obj = {};
      if(result.data.name){
        obj["name"] = result.data.name;
      }
      if(result.data.age){
        obj["age"] = result.data.age;
      }
      if(result.data.totalFieldArea){
        obj["totalFieldArea"] = result.data.totalFieldArea;
      } else {
        obj["totalFieldArea"] = '';
      }
      if(result.data.crop){
        obj["crop"] = result.data.crop;
      } else {
        obj["crop"] = '';
      }
      if(result.data.educationLevel){
        obj["educationLevel"] = result.data.educationLevel;
      } else {
        obj["educationLevel"] = '';
      }
      if(result.data.photo){
        obj["photo"] = '';
      } else {
        obj["photo"] = '';
      }
      if(result.data.gender){
        obj["gender"] = result.data.gender;
      } else {
        obj["gender"] = '';
      }
      if(result.data.married){
        obj["married"] = result.data.married;
      } else {
        obj["married"] = '';
      }
      if(result.data.familyCount){
        obj["familyCount"] = result.data.familyCount;
      } else {
        obj["familyCount"] = '';
      }      
      if(result.data.numberOfChildren){
        obj["numberOfChildren"] = result.data.numberOfChildren;
      }else {
        obj["numberOfChildren"] = '';
      }
      this.angForm.setValue(obj);
    }
  )
 }
 checkFile($event){
  if ($event.target.files && $event.target.files[0]) {
    let file = $event.target.files[0];
    if(file.type == "image/jpeg" || file.type == "image/png") {
      if(file.size < 21000){
        let me = this;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          //me.modelvalue = reader.result;
          me.base64uri = reader.result;
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }; 
      } else {
        this.toastr.warning('file size is too large!');
        //call validation
        this.angForm.controls['photo'].reset();

      }
    }
    else {
      this.toastr.warning('incorrect file type!');
      //call validation
      this.angForm.controls['photo'].reset();
      //this.angForm.get('photo').setValue('');
    }
  }
 }
 async updateFarmer(){
   if(this.base64uri){
    this.angForm.value.photo = this.base64uri;
   } else {
     delete this.angForm.value.photo;
   }
   const data = this.angForm.value;
   await this.farmerService.updateFarmer(this.id, data).subscribe(
    (result:any) => {
      const url = 'farmers';
      this.router.navigate([url]);
      
      this.toastr.success('farmer updated successfully!');
    }
  )
 }
}
