import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from '../vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from '../vehicle-detail/vehicle-detail.component';

@Component({
  selector: 'app-vehicle-shell',
  standalone: true,
  imports: [CommonModule, VehicleListComponent, VehicleDetailComponent],
  templateUrl: './vehicle-shell.component.html',
  styleUrls: ['./vehicle-shell.component.scss']
})
export class VehicleShellComponent {

}
