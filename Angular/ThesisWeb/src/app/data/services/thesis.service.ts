import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ThesisTableItemResource } from '../interfaces/thesisTableItemResource.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThesisResource } from '../interfaces/thesisResource.interface';
import { FormGroup } from '@angular/forms';
import { ThesisForm } from '../interfaces/thesisForm.interface';
import { Pageable } from '../interfaces/pageable.interface';

@Injectable({
  providedIn: 'root',
})
export class ThesisService {
  http = inject(HttpClient);

  baseApiUrl = 'https://conf.antibiotic.ru/demo/api/';

  getAllTheses() {
    return this.http.get<ThesisTableItemResource[]>(
      `${this.baseApiUrl}theses/all`
    );
  }

  getThesisById(id: number): Observable<ThesisResource> {
    return this.http.get<ThesisResource>(`${this.baseApiUrl}theses/${id}`);
  }

  deleteThesis(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}theses/${id}`);
  }

  getThesisPage(
    page: number,
    pageSize: number,
    sortings?: any,
    filters?: any
  ): Observable<Pageable> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (sortings) {
      for (const key in sortings) {
        if (sortings.hasOwnProperty(key)) {
          params = params.set(`Sortings.${key}`, sortings[key]);
        }
      }
    }

    if (filters) {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          params = params.set(`Filters.${key}`, filters[key]);
        }
      }
    }
    return this.http.get<Pageable>(`${this.baseApiUrl}theses`, { params });
  }

  updateThesis(id: number, thesis: ThesisForm): Observable<ThesisForm> {
    return this.http.put<ThesisForm>(
      `${this.baseApiUrl}theses/${id}`,
      thesis
    );
  }
  addThesis(thesis: Partial<ThesisForm>): Observable<ThesisForm> {
    return this.http.post<ThesisForm>(`${this.baseApiUrl}theses`, thesis);
  }
}
