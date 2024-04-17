import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RetrievedData } from '../models/retrieved-data';

@Injectable({ providedIn: 'root' })
export abstract class DataAccessBaseService {
  abstract getData<T>(
    tableName: string,
    columns?: string[],
    skip?: number,
    limit?: number
  ): Observable<RetrievedData<T>>;

  abstract insertData<T>(tableName: string, data: T): Observable<T>;

  abstract updateData<T>(tableName: string, id: number, data: T): Observable<T>;
}
