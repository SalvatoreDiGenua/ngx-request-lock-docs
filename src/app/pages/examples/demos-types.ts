/**
 * Shared types for the interactive demos on the Examples page.
 */
export interface DemoStatus {
  readonly kind: 'idle' | 'ok' | 'error';
  readonly text: string;
}
