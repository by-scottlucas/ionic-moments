import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updateProfile,
  User,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthDTO } from '../models/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth;
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.auth = getAuth(app);

    setPersistence(this.auth, browserLocalPersistence).catch(console.error);

    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  // --- AUTENTICAÇÃO ---

  async register({ email, password }: AuthDTO): Promise<void> {
    let newUser: User | null = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      newUser = userCredential.user;
    } catch (error: any) {
      console.error('[AuthService] Failed to register:', error);
      if (newUser) await this.runRollback(newUser);
      this.handleRegisterError(error);
    }
  }

  async login({ email, password }: AuthDTO): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      console.error('[AuthService] Failed to login:', error);
      this.handleLoginError(error);
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: any) {
      console.error('[AuthService] Failed to send reset link:', error);
      this.handlePasswordResetError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('[AuthService] Failed to logout:', error);
      throw error;
    }
  }

  getUserData(): User | null {
    return this.auth.currentUser;
  }

  async updateUserData(updates: {
    displayName?: string;
    email?: string;
  }): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('No authenticated user to update.');

    try {
      const { displayName, email } = updates;
      if (displayName && displayName !== user.displayName) {
        await updateProfile(user, { displayName });
      }
      if (email && email !== user.email) {
        await updateEmail(user, email);
      }
      this.userSubject.next(this.auth.currentUser);
    } catch (error) {
      console.error('[AuthService] Failed to update user data:', error);
      throw error;
    }
  }

  private async runRollback(user: User): Promise<void> {
    try {
      await deleteUser(user);
      console.warn('[AuthService] Rollback: user deleted after failure');
    } catch (rollbackError) {
      console.error('[AuthService] Rollback failed:', rollbackError);
    }
  }

  private handleRegisterError(error: any): never {
    switch (error.code) {
      case 'auth/email-already-in-use':
        throw new Error('EMAIL_ALREADY_EXISTS');
      case 'auth/weak-password':
        throw new Error('WEAK_PASSWORD');
      case 'auth/network-request-failed':
        throw new Error('NETWORK_ERROR');
      case 'auth/invalid-email':
        throw new Error('INVALID_EMAIL');
      default:
        throw new Error('REGISTER_ERROR');
    }
  }

  private handleLoginError(error: any): never {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        throw new Error('INVALID_CREDENTIALS');
      case 'auth/invalid-email':
        throw new Error('INVALID_EMAIL');
      case 'auth/network-request-failed':
        throw new Error('NETWORK_ERROR');
      case 'auth/user-disabled':
        throw new Error('USER_DISABLED');
      default:
        throw new Error('LOGIN_ERROR');
    }
  }

  private handlePasswordResetError(error: any): never {
    switch (error.code) {
      case 'auth/user-not-found':
        throw new Error('USER_NOT_FOUND');
      case 'auth/invalid-email':
        throw new Error('INVALID_EMAIL');
      case 'auth/network-request-failed':
        throw new Error('NETWORK_ERROR');
      case 'auth/expired-action-code':
        throw new Error('EXPIRED_CODE');
      case 'auth/invalid-action-code':
        throw new Error('INVALID_CODE');
      case 'auth/weak-password':
        throw new Error('WEAK_PASSWORD');
      default:
        throw new Error('RESET_PASSWORD_ERROR');
    }
  }

  getAuthenticatedUser(callback: (user: User | null) => void): void {
    onAuthStateChanged(this.auth, callback);
  }
}
