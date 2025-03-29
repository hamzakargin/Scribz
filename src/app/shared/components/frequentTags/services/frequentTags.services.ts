import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment.prod';
import {GetFrequentTagsResponseInterface} from '../types/getFrequentTags.interface';
import {PopularTagType} from '../../../types/popularTag.type';

@Injectable({
  providedIn: 'root',
})
export class FrequentTagsService {
  constructor(private http: HttpClient) {
  }

  getFrequentTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/tags';
    return this.http
      .get<GetFrequentTagsResponseInterface>(url)
      .pipe(map((response: GetFrequentTagsResponseInterface) => response.tags));
  }
}
