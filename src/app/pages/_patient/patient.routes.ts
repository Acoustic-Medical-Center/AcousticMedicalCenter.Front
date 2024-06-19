import { Routes } from '@angular/router';
import { MyDiseasesComponent } from './my-diseases/my-diseases.component';
import { MyPrescriptionsComponent } from './my-prescriptions/my-prescriptions.component';
import { MyRadiologyImagesComponent } from './my-radiology-images/my-radiology-images.component';
import { MyReportsComponent } from './my-reports/my-reports.component';
import { MyTestsComponent } from './my-tests/my-tests.component';
import { MyVisitsComponent } from './my-visits/my-visits.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { isPatient } from '../../core/guards/auth.guard';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

export const resolvedMyDiseasesTitle: ResolveFn<string> = async () => {
  const translateService = inject(TranslateService);
  const translatedTitle = await firstValueFrom(
    translateService.get('patientMenu.myDiseases'),
  );
  console.log(translateService);
  return translatedTitle;
};

export const titleResolver = (path: string): ResolveFn<string> => {
  return async () => {
    const translateService = inject(TranslateService);
    const translatedTitle = await firstValueFrom(
      translateService.get(`patientMenu.${path}`),
    );

    // Dil değişikliklerini dinleyin ve başlığı güncelleyin
    translateService.onLangChange.subscribe(() => {
      translateService
        .get(`patientMenu.${path}`)
        .subscribe((newTranslatedTitle: string) => {
          console.log(`Yeni başlık: ${newTranslatedTitle}`);
          document.title = newTranslatedTitle;
        });
    });

    return translatedTitle;
  };
};

export const patientRoutes: Routes = [
  {
    path: '',
    canMatch: [isPatient],
    children: [
      {
        path: 'my-diseases',
        component: MyDiseasesComponent,
        title: titleResolver('myDiseases'),
      },
      {
        path: 'my-appointments',
        component: MyAppointmentsComponent,
        title: titleResolver('myAppointments'),
      },
      {
        path: 'create-appointment',
        component: CreateAppointmentComponent,
        title: titleResolver('createAppointment'),
      },
      {
        path: 'my-prescriptions',
        component: MyPrescriptionsComponent,
        title: titleResolver('myPrescriptions'),
      },
      {
        path: 'radiology-images',
        component: MyRadiologyImagesComponent,
        title: titleResolver('radiologyImages'),
      },
      {
        path: 'my-reports',
        component: MyReportsComponent,
        title: titleResolver('myReports'),
      },
      {
        path: 'my-tests',
        component: MyTestsComponent,
        title: titleResolver('myTests'),
      },
      {
        path: 'my-visits',
        component: MyVisitsComponent,
        title: titleResolver('myVisits'),
      },
    ],
  },
];
