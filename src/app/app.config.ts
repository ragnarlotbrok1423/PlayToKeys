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
import { provideFirestore, initializeFirestore, connectFirestoreEmulator } from "@angular/fire/firestore";
import { provideFunctions, getFunctions, connectFunctionsEmulator } from "@angular/fire/functions";
import { provideMessaging, getMessaging } from "@angular/fire/messaging";
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

        if (useEmulators) {
          connectAuthEmulator(auth, 'https://localhost:9099', { disableWarnings: true });
        }

        return auth;
      }),
      provideFirestore(() => {
        const firestore = initializeFirestore(getApp(), {
          experimentalForceLongPolling: !!useEmulators
        });

        if (useEmulators) {
          connectFirestoreEmulator(firestore, 'localhost', 8080)
        }

        return firestore;
      }),
      provideFunctions(() => {
        const functions = getFunctions();

        if (useEmulators) {                }

        return functions;
      }),
      provideMessaging(() => getMessaging()), // not using emulators for messages
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
