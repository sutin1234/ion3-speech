import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';


@IonicPage()
@Component({
  selector: 'page-audio-record',
  templateUrl: 'audio-record.html',
  providers: [Media, File]
})
export class AudioRecordPage {
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  interval: any;
  duration: number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, private media: Media,
              private file: File, public platform: Platform) {
  }

  ionViewDidLoad() {
    this.getAudioList();
    console.log('ionViewDidLoad AudioRecordPage');
  }
  startRecord(){
    if (this.platform.is('ios')) {
    this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.wav';
    this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
    this.audio = this.media.create(this.filePath);
  } else if (this.platform.is('android')) {
    this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.wav';
    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
    this.audio = this.media.create(this.filePath);
  }
  this.audio.startRecord();
  this.recording = true;
  this.getDuration();
  }
  getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(JSON.stringify(this.audioList));
    }
  }
  stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName, duration: this.duration };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    clearInterval(this.interval);
    this.duration = 0;
    this.getAudioList();
  }
  getDuration(){
    this.interval = setInterval(() => {
      if(this.duration == -1){
        this.duration = 1;
      }
      this.duration += 1;
      console.log(this.duration)
   }, 1000);
  }
playAudio(file,idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }
  removeFile(filename, index){
    localStorage.removeItem('audiolist');
    this.getAudioList();
  }
  clearRecord(){
    localStorage.clear();
    this.getAudioList();
  }
}
