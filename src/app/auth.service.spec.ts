import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

// Mock LocalStorage for testing
class MockLocalStorage {
  private storage: { [key: string]: string } = {};

  getItem(key: string): string | null {
    return this.storage[key] || null;
  }

  setItem(key: string, value: string): void {
    this.storage[key] = value;
  }

  removeItem(key: string): void {
    delete this.storage[key];
  }
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    // Mock localStorage
    const localStorageSpy = new MockLocalStorage();

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Storage, useValue: localStorageSpy }  // Use the mock class
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add additional tests to check functionality
  it('should set and get the role', () => {
    service.setRole('admin');
    expect(service.getRole()).toBe('admin');
  });

  it('should authenticate the user', () => {
    service.authenticate();
    expect(service.isAuthenticatedUser()).toBeTrue();
  });

  it('should logout the user', () => {
    service.logout();
    expect(service.isAuthenticatedUser()).toBeFalse();
  });
});
