import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { CandidateService } from '../candidates.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent {
  file: File | null = null;
  name: string = '';
  surname: string = '';
  seniority: string = '';
  yearsOfExperience: number | null = null;
  availability: boolean = false;
  message: string = '';

  constructor(private candidateService: CandidateService) {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    if (this.file) {
      const candidateData = {
        name: this.name,
        surname: this.surname,
        seniority: this.seniority,
        yearsOfExperience: this.yearsOfExperience,
        availability: this.availability,
      };

      this.candidateService.uploadCandidates(this.file, candidateData).subscribe(
        response => {
          this.message = response.message; // Mensaje de éxito
        },
        error => {
          console.error('Error uploading candidates:', error);
          this.message = 'Error uploading candidates.';
        }
      );
    } else {
      this.message = 'Please select a file.';
    }
  }
}
