import { Injectable } from '@angular/core';
import { DataAccessBaseService } from './data-access-base.service';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { RetrievedData } from '../models/retrieved-data';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly tableName = 'Accounts';

  constructor(private dataAccessService: DataAccessBaseService) {}

  getAccounts(skip: number, take: number): Observable<RetrievedData<Account>> {
    return this.dataAccessService.getData<Account>(
      this.tableName,
      undefined,
      skip,
      take
    );
  }

  addAccount(account: Account): Observable<Account> {
    return this.dataAccessService.insertData<Account>(this.tableName, account);
  }

  updateAccount(account: Account): Observable<Account> {
    return this.dataAccessService.updateData<Account>(
      this.tableName,
      account.id,
      account
    );
  }
}
