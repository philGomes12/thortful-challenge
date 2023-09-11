import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Vehicle, VehicleResponse } from '../interfaces/vehicule';


@Injectable({
  providedIn: 'root'
})

export class VehicleService {
  private url = 'https://swapi.py4e.com/api/vehicles';
  http = inject(HttpClient)

  private vehicles$ = this.http.get<VehicleResponse>(this.url).pipe(
    map(data => data.results),
    catchError(this.handleError)
  )

  vehicles = toSignal<Vehicle[], Vehicle[]>(this.vehicles$, { initialValue: [] });

  private vehicleSelectedSubject = new BehaviorSubject<string>('');

  private selectedVehicle$ = this.vehicleSelectedSubject.pipe(
    filter(Boolean),
    switchMap((vehicleName) =>
      vehicleName.length
        ? this.http
          .get<VehicleResponse>(`${this.url}?search=${vehicleName}`)
          .pipe(
            map((data) => data.results[0]),
            map(
              (v) =>
              ({
                ...v,
                cost_in_credits: isNaN(Number(v.cost_in_credits))
                  ? String(Math.random() * 100000)
                  : v.cost_in_credits,
              } as Vehicle)
            ),
            catchError(this.handleError)
          )
        : of(null)
    )
  );
  selectedVehicle = toSignal(this.selectedVehicle$);

  vehicleSelected(vehicleName: string) {
    this.vehicleSelectedSubject.next(vehicleName);
  }


  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}
