import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf, DecimalPipe } from '@angular/common';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, DecimalPipe],
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleDetailComponent {
  vehicleService = inject(VehicleService);

  vehicle = this.vehicleService.selectedVehicle;

  pageTitle = computed(() =>
    this.vehicle() ? `Detail for: ${this.vehicle()?.name}` : null
  );

}
