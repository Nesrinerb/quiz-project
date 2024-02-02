import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  url = 'http://localhost:3000/quiz';
  constructor(private http: HttpClient) {}

  getQuestion(): Observable<any> {
    return this.http.get<any>('../assets/questions.json');
  }

  getCreatedQuiz(): Observable<any> {
    return this.http.get(this.url);
  }
  sendQuiz(data: any) {
    return this.http.post(this.url, data);
  }
  removeQuiz(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getQuiz(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  sendUpdatedQuiz(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }
}
