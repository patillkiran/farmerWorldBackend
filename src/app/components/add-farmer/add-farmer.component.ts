import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {FarmerService} from './../../services/farmer.service'
import {Router } from '@angular/router';
import{ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-farmer',
  templateUrl: './add-farmer.component.html',
  styleUrls: ['./add-farmer.component.css']
})
export class AddFarmerComponent {
  title = 'Angular Form Validation Tutorial';
  angForm: FormGroup;
  base64uri ;
  constructor(
    private fb: FormBuilder,    
    private readonly farmerService: FarmerService,
    private readonly toastr: ToastrService,
    private router: Router) {
   this.createForm();
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
        //alert('file size is too large!');
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
 async saveFarmer(){
   if(this.base64uri){
    this.angForm.value.photo = this.base64uri;
   }
   const data = this.angForm.value;
   await this.farmerService.createFarmer(data).subscribe(
    (result:any) => {
      const url = 'farmers';
      this.router.navigate([url]);
      
      this.toastr.success('farmer created successfully!');
    }
  )
 }
}
