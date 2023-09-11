import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, NgFor, NgClass, NgIf } from '@angular/common';
import {  VehicleService } from '../../services/vehicle.service';


@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, NgClass, NgFor, NgIf],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent {
  pageTitle = 'Vehicles';
  errorMessage = '';
  vehicleService = inject(VehicleService);

  vehicles = computed(() => {
    try {
      return this.vehicleService.vehicles();
    } catch (e) {
      this.errorMessage = typeof e === 'string'? e : 'Error';
      return [];
    }
  });
  selectedVehicle = this.vehicleService.selectedVehicle;

  onSelected(vehicleName: string): void {
    this.vehicleService.vehicleSelected(vehicleName);
  }

  constructor() {
    console.log("Vehicles:", this.vehicles());
  }

}
