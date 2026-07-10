import { HttpContextToken } from '@angular/common/http';

export const REQUEST_LOCK_ID = new HttpContextToken<string | null>(() => null);
