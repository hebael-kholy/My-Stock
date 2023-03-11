import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-order',
  templateUrl: './side-order.component.html',
  styleUrls: ['./side-order.component.css']
})
export class SideOrderComponent implements OnInit {
  imagePath: any;
  idUser:any;
  user:any;
  acceptorders:any;
  pendingOrders:any;
  rejectOrders:any;
  status = 'accepted';
  title :any;
  isloading = true;
  deleteLoading = false;
  p:any;
  p2:any;
  p3:any;
  constructor(myActivated: ActivatedRoute, public myService: UserService) {}
  ngOnInit(): void {
    this.idUser = localStorage.getItem('id');
    this.imagePath = localStorage.getItem('image');

    this.myService.getOneUser(this.idUser).subscribe({
      next: (res) => {
        this.user = res;
        console.log(this.user);

      },
      error(err) {
        console.log(err);
      },
    });
    //call functions get orders
    this.getAccept();
    this.isloading = true;
    this.getPending();
    this.isloading = true;
    this.getReject();
    //end ngOnIt
  }
  //function get accepting orders
  getAccept(){
    this.myService.getAccept(this.idUser).subscribe({
      next:(res)=>{
        this.acceptorders = res;
         console.log(res);
        this.isloading = false;
        // console.log(this.data);
      },
      error:(err)=>{},
    });
  }
  // function get pending orders 
  getPending(){
    this.myService.getPending(this.idUser).subscribe({
      next:(res)=>{
        this.pendingOrders = res;

        console.log(res);

       this.isloading = false;
       console.log("this data pending",this.pendingOrders);
      },
      error:(err)=>{},
    });
  }
  //function get rejected orders
  getReject(){
    this.myService.getReject(this.idUser).subscribe({
      next:(res)=>{
        this.rejectOrders = res;

        console.log(res);
       this.isloading = false;
      //  console.log(this.dataReject);
      },
      error:(err)=>{},
    });
  }
  // functions to change the status when click on drop down box
  accepted(){
    this.status = 'accepted';
  }
  pending(){
    this.status = 'pending';

  }
  rejected(){
    this.status ='rejected';
  }

  // delete pending orders
  deleteOrder(event:any,id:any){
    this.deleteLoading = true;
    this.myService.deleteOrder(id,'').subscribe(
      { next:(req)=>{
        console.log(req);
        this.deleteLoading = false;
        this.getPending();

        Swal.fire('Deleted successfully ', 'Updated picture', 'success');
        this.getReject();
      
      },
      error:(err)=>{console.log(err)}}
      );
  }
}

