import {
  PostgrestSingleResponse,
  SupabaseClient,
  createClient,
} from '@supabase/supabase-js';
import { Database } from '../data-access/db.types';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, from } from 'rxjs';
import { DataAccessBaseService } from './data-access-base.service';
import { RetrievedData } from '../models/retrieved-data';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class DataAccessService implements DataAccessBaseService {
  private supabaseUrl = '';
  private key = '';
  private supabase: SupabaseClient | undefined;

  constructor(private messageService: MessageService) {
    this.supabase = createClient<Database>(this.supabaseUrl, this.key);
  }

  getData<T>(
    tableName: string,
    columns?: string[],
    skip?: number,
    limit?: number
  ): Observable<RetrievedData<T>> {
    if (this.supabase) {
      return from(
        this.supabase
          .from(tableName)
          .select(columns ? columns.join(',') : '*', {
            count: 'estimated',
          })
          .range(skip ?? 0, limit ?? Number.MAX_SAFE_INTEGER)
          .then((res) => {
            return { data: res.data, count: res.count };
          })
      ) as Observable<RetrievedData<T>>;
    } else {
      return EMPTY;
    }
  }

  insertData<T>(tableName: string, data: T): Observable<T> {
    if (this.supabase) {
      return from(
        this.supabase
          .from(tableName)
          .insert(data)
          .select()
          .then((res) => this.handleResult(res))
      ) as Observable<T>;
    } else {
      return EMPTY;
    }
  }

  updateData<T>(tableName: string, id: number, data: T): Observable<T> {
    if (this.supabase) {
      return from(
        this.supabase
          .from(tableName)
          .update(data)
          .eq('id', id)
          .select()
          .then((res) => this.handleResult(res))
      ) as Observable<T>;
    } else {
      return EMPTY;
    }
  }

  private handleResult(res: PostgrestSingleResponse<any[]>) {
    if (!res.data && res.error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: res.error.details || res.error.message || 'An error occurred',
      });
    }

    return res.data?.[0];
  }
}
