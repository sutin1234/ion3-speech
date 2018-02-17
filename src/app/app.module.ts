import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AudioRecordPage } from '../pages/audio-record/audio-record';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';
export function myCustomAudioProviderFactory() {
  return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
}

export const firebase_config = {
    apiKey: "AIzaSyBXh1LjxE22AwPj2zgMp1jip_Q1U0MkKgk",
    authDomain: "ion3-7bb36.firebaseapp.com",
    databaseURL: "https://ion3-7bb36.firebaseio.com",
    projectId: "ion3-7bb36",
    storageBucket: "ion3-7bb36.appspot.com",
    messagingSenderId: "1033574228295"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AudioRecordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebase_config),
     AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    IonicAudioModule.forRoot(defaultAudioProviderFactory),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AudioRecordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
