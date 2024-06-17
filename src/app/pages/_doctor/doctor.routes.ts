import { Routes } from "@angular/router";
import { DoctorSettingsComponent } from "./doctor-settings/doctor-settings.component";
export const doctorRoutes: Routes = [
    {
      path: 'doctor-settings',
      component: DoctorSettingsComponent,
      title: 'Settings',
    },
    
];