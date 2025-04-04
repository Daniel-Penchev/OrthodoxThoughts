import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ShortThoughts, ThoughtsModule } from './shared/ThoughtsModule.modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'OrthodoxThoughts';

  constructor(private http: HttpClient){}
  
  model: ThoughtsModule[] = [];
  currentThought: ThoughtsModule = null;
  showCopyMessage: boolean = false;
  ngOnInit() {
    this.fetchThoughts();
  }

  private fetchThoughts(){
    this.http.get<ShortThoughts>('assets/data/short_thoughts.json').subscribe(data => {
      console.log(data);
        this.model = data.short_thoughts;  
        this.onRandomThought();
    },
    error => {
      console.error('Error fetching data:', error);
    });
  }

  onRandomThought(){
    if (this.model.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.model.length);
      this.currentThought = this.model[randomIndex];
    }
  }

  copyText(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.showCopyMessage = true;
      setTimeout(() => {
        this.showCopyMessage = false;
      }, 3000);
    }).catch((err) => {
      console.error('Неуспешно копиране: ', err);
    });
  }

  redirectToCalendarPage() {
    window.location.href = 'https://pravoslaven-kalendar.com/';
  }
  redirectToBiographiesPage(){
    window.location.href = 'https://bg-patriarshia.bg/biographies';
  }
  redirectToAudioBookPage(){
    window.location.href = 'https://petkohinov.com/audioknigi/';
  }
}
