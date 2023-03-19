import { NgModule } from '@angular/core';
import { WithLoadingPipe } from "./pipes/with-loading.pipe";

@NgModule({
  declarations: [WithLoadingPipe],
  exports: [WithLoadingPipe],
})
export class SharedModule {}
