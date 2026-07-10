// import { Directive, inject } from '@angular/core';
// import { RequestLockDirective } from './request-lock.directive';
// import { Button } from 'primeng/button';

// @Directive({
//   selector: '[ngxPRequestLock]',
//   exportAs: 'pRequestLock',
// })
// export class PClickGuardDirective extends RequestLockDirective {
//   public pButton = inject(Button);

//   protected override setBlockStatus(): void {
//     if (!this.pButton) {
//       return;
//     }

//     this.pButton.loading = this.isBlocked;
//     this.pButton.cd.detectChanges();
//   }
// }
