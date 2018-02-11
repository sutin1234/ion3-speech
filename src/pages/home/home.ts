import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SpeechRecognition, Media, File]
})
export class HomePage {
  data: Array<string[]> = [];
  constructor(public navCtrl: NavController, private speech: SpeechRecognition,
              private media: Media, private file: File) {

  }
  ionViewDidLoad(){
  }
  startSpeech(){
     this.speech.isRecognitionAvailable().then((Available: boolean) => {
     this.speech.hasPermission().then(hasPermission => {
          this.speech.requestPermission().then(data => {
            console.log('requestPermission Grant')
            this.speech.startListening().subscribe(
              (matches: Array<string>) => {
                this.data.push(matches)
                this.startRecordAudio();
              },
              (onerror) => console.log('error:', onerror)
            );
          });
      });
   }).catch(err => {
     alert('Speech Plugin not Available')
   })
  }
startRecordAudio(){
    console.log('Audio Start Record!')
   this.file.createFile(this.file.dataDirectory,'my_file.mp3', true).then((data) => {
      let file = this.media.create(this.file.dataDirectory +'my_file.mp3');
      file.startRecord();
      window.setTimeout(() => {
        file.stopRecord()
        let URL: any = file;
        console.log(JSON.stringify(URL))
        this.playAudio(this.file.dataDirectory +'my_file.mp3');
      }, 3000);
    });
  }

  playAudio(url){
      let file = this.media.create(this.file.dataDirectory +'my_file.mp3');
      window.setTimeout(() => {
        file.play()
        console.log('audio play')
      }, 3000);
  }

}
