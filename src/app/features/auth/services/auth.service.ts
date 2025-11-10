import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
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

  async register({ email, password }: AuthDTO): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('[AuthService] Failed to register:', error);
      throw error;
    }
  }

  async login({ email, password }: AuthDTO): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('[AuthService] Failed to login:', error);
      throw error;
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

    if (!user) {
      throw new Error('No authenticated user to update the data.');
    }

    const { displayName, email } = updates;

    try {
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

  getAuthenticatedUser(callback: (user: User | null) => void): void {
    onAuthStateChanged(this.auth, callback);
  }
}
