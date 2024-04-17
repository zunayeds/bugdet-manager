import { Observable } from 'rxjs';
import { RetrievedData } from './retrieved-data';

export interface DataProvider {
  pageSize?: number;
  getData<T>(skip?: number, take?: number): Observable<RetrievedData<T>>;
  addData?<T>(data: T): Observable<T>;
  editData?<T>(data: T): Observable<T>;
  deleteData?(id: number): Observable<void>;
}
