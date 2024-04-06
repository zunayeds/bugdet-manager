import { Observable } from 'rxjs';

export interface DataProvider {
  skip: number;
  take: number;
  getData<T>(): Observable<T[]>;
  editData?<T>(id: number, data: T): Observable<T>;
  deleteData?(id: number): Observable<void>;
}
