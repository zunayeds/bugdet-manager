import { Observable } from 'rxjs';

export interface DataProvider {
  skip: number;
  take: number;
  execute<T>(): Observable<T[]>;
}
