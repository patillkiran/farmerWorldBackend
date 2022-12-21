import { Component } from '@angular/core';
import {FarmerService} from './../../services/farmer.service'
import {Router } from '@angular/router'
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-farmer-list',
  templateUrl: './farmer-list.component.html',
  styleUrls: ['./farmer-list.component.css']
})
export class FarmerListComponent {
  farmers: any = [];
  constructor(
    private readonly farmerService: FarmerService,
    private router: Router,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(){
    this.getFarmerData();
  }
  async getFarmerData(){
    await this.farmerService.getAllFarmers().subscribe(
      (result:any) => {
        if(result.status == 'success'){
          this.farmers = result.data;
        }
      }
    )
  }
  editFarmer(id:any){    
    const url = `updateFarmer/${id}`;
    this.router.navigate([url])
  }
  addNewFarmer(){
    const url = 'addFarmer';
    this.router.navigate([url])
  }
  viewFarmer(id:any){    
    const url = `viewFarmer/${id}`;
    this.router.navigate([url])
  }
  async deleteFarmer(id){
    const response = confirm("Are you sure you want to delete this farmer?");
    if(response){
      await this.farmerService.deleteFarmer(id).subscribe(
        (result:any) => {
          if(result.status == 'success'){
            this.toastr.success('Farmer deleted successfully!')
            this.getFarmerData();
          }
        }
      )
    }
  }
}
