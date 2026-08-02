import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestLockDirective } from './request-lock';
import { RequestLockService } from '../core/services/request-lock-service';

@Component({
  imports: [RequestLockDirective],
  template: `
    <button
      ngxRequestLock
      #lock="requestLock"
      [requestId]="idBinding"
      type="button"
    >
      Click me
    </button>
  `,
})
class HostComponent {
  public idBinding: string | null = null;
  public readonly lock = viewChild.required(RequestLockDirective);
}

@Component({
  imports: [RequestLockDirective],
  template: `
    <div ngxRequestLock #lock="requestLock" [requestId]="'nested-flow'">
      <span>Wrapper</span>
      <button type="button">Inner</button>
    </div>
  `,
})
class WrapperHostComponent {
  public readonly lock = viewChild.required(RequestLockDirective);
}

@Component({
  imports: [RequestLockDirective],
  template: `
    <div ngxRequestLock #lock="requestLock" [requestId]="'no-button'">
      No button here
    </div>
  `,
})
class NoButtonHostComponent {
  public readonly lock = viewChild.required(RequestLockDirective);
}

@Component({
  imports: [RequestLockDirective],
  template: `
    <button ngxRequestLock #lock="requestLock" type="button">Click me</button>
  `,
})
class UnboundHostComponent {
  public readonly lock = viewChild.required(RequestLockDirective);
}

function detect(fixture: ComponentFixture<unknown>): void {
  fixture.detectChanges();
}

describe('RequestLockDirective', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('generates a stable UUID when requestId is bound to null', () => {
    const fixture = TestBed.createComponent(HostComponent);
    detect(fixture);

    const id = fixture.componentInstance.lock().requestId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);

    // Re-render with same binding: id must remain stable
    detect(fixture);
    expect(fixture.componentInstance.lock().requestId()).toBe(id);
  });

  it('uses an explicit requestId binding when provided', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.idBinding = 'my-explicit-id';
    detect(fixture);

    expect(fixture.componentInstance.lock().requestId()).toBe('my-explicit-id');
  });

  it('regenerates a UUID when the binding is an empty string', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.idBinding = '';
    detect(fixture);

    const id = fixture.componentInstance.lock().requestId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('disables the host button on click and unlocks via the 500ms safety timeout when no request is tracked', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.idBinding = 'timeout-flow';
    detect(fixture);

    const button = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;
    expect(button.hasAttribute('disabled')).toBe(false);

    button.click();
    expect(button.hasAttribute('disabled')).toBe(true);

    vi.advanceTimersByTime(500);
    detect(fixture);
    expect(button.hasAttribute('disabled')).toBe(false);
  });

  it('stays disabled while the service reports pending, then unlocks when the service ends', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.idBinding = 'service-flow';
    detect(fixture);

    const service = TestBed.inject(RequestLockService);
    const button = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;

    button.click();
    service.start('service-flow');
    detect(fixture);
    expect(button.hasAttribute('disabled')).toBe(true);

    // 500 ms elapses: pending has been observed, so no unlock yet
    vi.advanceTimersByTime(500);
    detect(fixture);
    expect(button.hasAttribute('disabled')).toBe(true);

    service.end('service-flow');
    detect(fixture);
    expect(button.hasAttribute('disabled')).toBe(false);
  });

  it('unlocks unconditionally at the 10s ceiling even if the service never ends', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.idBinding = 'stuck-flow';
    detect(fixture);

    const service = TestBed.inject(RequestLockService);
    const button = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;

    button.click();
    service.start('stuck-flow');
    detect(fixture);
    expect(button.hasAttribute('disabled')).toBe(true);

    vi.advanceTimersByTime(10_000);
    detect(fixture);
    expect(button.hasAttribute('disabled')).toBe(false);
  });

  it('resolves the nearest descendant button when the host is a wrapper', () => {
    const fixture = TestBed.createComponent(WrapperHostComponent);
    detect(fixture);

    const service = TestBed.inject(RequestLockService);
    const inner = fixture.nativeElement.querySelector(
      'button',
    ) as HTMLButtonElement;
    expect(inner.hasAttribute('disabled')).toBe(false);

    service.start('nested-flow');
    detect(fixture);
    expect(inner.hasAttribute('disabled')).toBe(true);

    service.end('nested-flow');
    detect(fixture);
    expect(inner.hasAttribute('disabled')).toBe(false);
  });

  it('does not throw when no button can be resolved on the host', () => {
    const fixture = TestBed.createComponent(NoButtonHostComponent);
    detect(fixture);

    const service = TestBed.inject(RequestLockService);
    expect(() => {
      service.start('no-button');
      detect(fixture);
      service.end('no-button');
      detect(fixture);
    }).not.toThrow();
  });

  it('generates a UUID when requestId is not bound in the template at all', () => {
    const fixture = TestBed.createComponent(UnboundHostComponent);
    detect(fixture);

    const id = fixture.componentInstance.lock().requestId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });
});
