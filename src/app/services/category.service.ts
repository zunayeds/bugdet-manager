import { Injectable } from '@angular/core';
import { DataAccessBaseService } from './data-access-base.service';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { RetrievedData } from '../models/retrieved-data';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private dataAccessService: DataAccessBaseService) {}

  getCategories(
    type: string,
    skip: number,
    take: number
  ): Observable<RetrievedData<Account>> {
    return this.dataAccessService.getData<Account>(
      type === 'expense' ? 'ExpenseCategories' : 'IncomeCategories',
      undefined,
      skip,
      take
    );
  }
}
