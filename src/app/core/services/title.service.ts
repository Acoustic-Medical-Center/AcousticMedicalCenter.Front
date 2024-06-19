// import { Injectable } from '@angular/core';
// import { Title } from '@angular/platform-browser';
// import { TranslateService } from '@ngx-translate/core';
// import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
// import { filter, map, mergeMap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class TitleService {
//   constructor(
//     private title: Title,
//     private translate: TranslateService,
//     private router: Router,
//     private activatedRoute: ActivatedRoute,
//   ) {
//     this.router.events
//       .pipe(
//         filter((event) => event instanceof NavigationEnd),
//         map(() => {
//           let route = this.activatedRoute.firstChild;
//           while (route!.firstChild) {
//             route = route!.firstChild;
//           }
//           console.log('Current route:', route); // Debug için eklendi
//           return route;
//         }),
//         mergeMap((route) => route!.data),
//         map((data) => {
//           console.log('Route data:', data); // Debug için eklendi
//           return data['title'];
//         }),
//       )
//       .subscribe((title) => {
//         if (title) {
//           console.log('Title to translate:', title); // Debug için eklendi
//           this.translate.get(title).subscribe((translatedTitle) => {
//             console.log('Translated title:', translatedTitle); // Debug için eklendi
//             this.title.setTitle(translatedTitle);
//             console.log('Document title set to:', document.title); // Başlığın doğru ayarlanıp ayarlanmadığını kontrol edin
//           });
//         }
//       });
//   }
// }
