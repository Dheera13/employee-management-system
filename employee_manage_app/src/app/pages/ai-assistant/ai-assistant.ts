import { Component,ChangeDetectorRef  } from '@angular/core';
import { Master } from '../../services/master';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-assistant.html',
  styleUrls: ['./ai-assistant.css']
})
export class AiAssistantComponent {
  question: string = '';
  answer: string = '';
  loading: boolean = false;

  constructor(private masterService: Master,   private cdr: ChangeDetectorRef
) {}

  askQuestion() {
    if (!this.question.trim()) {
      return;
    }

    this.loading = true;
    this.answer = '';

    this.masterService.askAi(this.question).subscribe({
      next: (res) => {
        this.answer = res.answer;
        this.loading = false;
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error: (err) => {
        console.error(err);
        this.answer = 'AI Assistant failed. Please try again.';
        this.loading = false;
        this.cdr.detectChanges(); // Manually trigger change detection
      }
    });
  }
}