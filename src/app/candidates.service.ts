import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'http://localhost:3000/candidates/upload';

  constructor(private http: HttpClient) { }

  uploadCandidates(file: File, data: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('name', data.name);
    formData.append('surname', data.surname);
    formData.append('seniority', data.seniority);
    formData.append('yearsOfExperience', data.yearsOfExperience);
    formData.append('availability', data.availability.toString());

    return this.http.post(this.apiUrl, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
      })
    });
  }
}
