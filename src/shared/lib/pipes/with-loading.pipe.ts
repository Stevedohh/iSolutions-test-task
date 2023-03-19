import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

export type WithLoadingPipeResult<T> = {
  value?: T;
  loading: boolean;
  error?: any;
}

@Pipe({
  name: 'withLoading',
})
export class WithLoadingPipe implements PipeTransform {
  transform<T>(val: Observable<T> | undefined | null): Observable<WithLoadingPipeResult<T>> | undefined | null {
    return isObservable(val)
      ? val.pipe(
        map((value: any) => ({
          loading: value.type === 'start',
          value: value.type ? value.value : value
        })),
        startWith({ loading: true }),
        catchError(error => of({ loading: false, error }))
      )
      : val;
  }
}
