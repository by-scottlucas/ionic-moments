import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  Database,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { MomentDTO } from '../models/moment.dto';

@Injectable({
  providedIn: 'root',
})
export class MomentsService {
  private db: Database;
  private auth: Auth;
  private userId: string | null = null;
  private readonly FB_NODE = 'moments';
  private authInitialized = new BehaviorSubject(false);

  private momentSubject = new BehaviorSubject<MomentDTO[]>([]);
  public moment$: Observable<MomentDTO[]> = this.momentSubject.asObservable();

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.db = getDatabase(app);
    this.auth = getAuth(app);
    this.initializeAuthAndListener();
  }

  private initializeAuthAndListener(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userId = user.uid;
        console.log('User authenticated, UID:', this.userId);
        this.list();
      } else {
        this.userId = null;
        this.momentSubject.next([]);
        console.warn('Unauthenticated user or signed out.');
      }
      this.authInitialized.next(true);
    });
  }

  private getAuthenticatedUserId(): string {
    if (!this.authInitialized.getValue()) {
      console.error('Authentication check not complete. Blocking operation.');
    }

    if (this.userId) {
      return this.userId;
    } else {
      throw new Error('Operation failed: User is not authenticated.');
    }
  }

  private list(): void {
    if (!this.userId) return;

    const momentRef = ref(this.db, `${this.FB_NODE}/${this.userId}`);
    onValue(
      momentRef,
      (snapshot) => {
        const data = snapshot.val();
        const moments: MomentDTO[] = [];
        if (data) {
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              moments.push({ id: key, ...data[key] });
            }
          }
          moments.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        }
        this.momentSubject.next(moments);
      },
      (error) => {
        console.error(
          'FIREBASE ERROR (list): Could not retrieve moments.',
          error
        );
      }
    );
  }

  async create(data: MomentDTO): Promise<boolean> {
    try {
      const userId = this.getAuthenticatedUserId();
      const newMomentRef = push(ref(this.db, `${this.FB_NODE}/${userId}`));

      await set(newMomentRef, {
        title: data.title,
        description: data.description,
        date: data.date,
      });

      console.log('Moment created successfully.');
      return true;
    } catch (error) {
      console.error('FIREBASE ERROR (create): Failed to save moment.', error);
      return false;
    }
  }

  async updateMoment(id: string, data: Partial<MomentDTO>): Promise<boolean> {
    if (!id || Object.keys(data).length === 0) {
      console.error('Update failed: Invalid ID or empty data object.');
      return false;
    }

    try {
      const userId = this.getAuthenticatedUserId();
      const momentRef = ref(this.db, `${this.FB_NODE}/${userId}/${id}`);

      const updates: { [key: string]: any } = {};
      if (data.title !== undefined) updates['title'] = data.title;
      if (data.description !== undefined)
        updates['description'] = data.description;
      if (data.date !== undefined) updates['date'] = data.date;

      await update(momentRef, updates);

      console.log(`Moment ID ${id} updated successfully.`);
      return true;
    } catch (error) {
      console.error(
        `FIREBASE ERROR (update): Failed to update moment ID ${id}.`,
        error
      );
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    if (!id) {
      console.error('Delete failed: Invalid ID provided.');
      return false;
    }

    try {
      const userId = this.getAuthenticatedUserId();
      const momentRef = ref(this.db, `${this.FB_NODE}/${userId}/${id}`);
      await remove(momentRef);

      console.log(`Moment ID ${id} deleted successfully.`);
      return true;
    } catch (error) {
      console.error(
        `FIREBASE ERROR (delete): Failed to remove moment ID ${id}.`,
        error
      );
      return false;
    }
  }

  getMoments(): Observable<MomentDTO[]> {
    return this.moment$;
  }
}
