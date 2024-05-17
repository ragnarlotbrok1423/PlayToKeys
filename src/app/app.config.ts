import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  provideAnalytics, getAnalytics, ScreenTrackingService,
  UserTrackingService
} from "@angular/fire/analytics";
import { provideFirebaseApp, initializeApp, getApp } from "@angular/fire/app";
import {
  provideAuth, initializeAuth, browserSessionPersistence,
  indexedDBLocalPersistence, browserPopupRedirectResolver,
  connectAuthEmulator
} from "@angular/fire/auth";
import { provideFirestore, initializeFirestore, connectFirestoreEmulator, getFirestore } from "@angular/fire/firestore";
import { provideFunctions, getFunctions, connectFunctionsEmulator } from "@angular/fire/functions";

import { providePerformance, getPerformance } from "@angular/fire/performance";
import { provideStorage, getStorage, connectStorageEmulator } from "@angular/fire/storage";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar'; //
import {environment} from '../environments/environment';


const useEmulators = environment.firebase;

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAnalytics(() => getAnalytics()),
      provideAuth(() => {
        const auth = initializeAuth(getApp(), {
          persistence: useEmulators
            ? browserSessionPersistence
            : indexedDBLocalPersistence,
          popupRedirectResolver: browserPopupRedirectResolver
        });

        if (location.hostname === "localhost:8080") {
          connectAuthEmulator(auth, "http://127.0.0.1:9099");
        }

        return auth;
      }),
      provideFirestore(() => {
        const firestore = initializeFirestore(getApp(), {
          experimentalForceLongPolling: useEmulators ? true : false

        });

        if (useEmulators) {
          connectFirestoreEmulator(firestore, 'localhost', 8080)
        }

        return firestore;
      }),
      provideFirestore(() => getFirestore()),
      provideFunctions(() => {
        const functions = getFunctions();

        if (useEmulators) {
          connectFunctionsEmulator(functions, 'localhost', 5001);
        }

        return functions;
      }),
       // not using emulators for messages
      providePerformance(() => getPerformance()), // not using emulators for checking app performance
      provideStorage(() => {
        const storage = getStorage();

        if (useEmulators) {
          connectStorageEmulator(storage, 'localhost', 9199);
        }

        return storage;
      })
    ),
    ScreenTrackingService,
    UserTrackingService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 4000
      }
    }
  ]
}
