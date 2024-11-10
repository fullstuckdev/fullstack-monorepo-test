import { User as SharedUser } from '@fullstack/shared-types';

export class User {
  private readonly _id: string;
  private _email: string | null;
  private _displayName: string | null;
  private _photoURL: string | null;
  private _role: string;
  private _isActive: boolean;
  private _createdAt: string;
  private _updatedAt: string;

  constructor(props: SharedUser) {
    this._id = props.id;
    this._email = props.email;
    this._displayName = props.displayName;
    this._photoURL = props.photoURL;
    this._role = props.role;
    this._isActive = props.isActive;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  get id(): string { return this._id; }
  get email(): string | null { return this._email; }
  get displayName(): string | null { return this._displayName; }
  get photoURL(): string | null { return this._photoURL; }
  get role(): string { return this._role; }
  get isActive(): boolean { return this._isActive; }
  get createdAt(): string { return this._createdAt; }
  get updatedAt(): string { return this._updatedAt; }

  updateName(name: string): void {
    this._displayName = name;
    this._updatedAt = new Date().toISOString();
  }

  updatePhoto(photoURL: string): void {
    this._photoURL = photoURL;
    this._updatedAt = new Date().toISOString();
  }

  updateRole(role: string): void {
    this._role = role;
    this._updatedAt = new Date().toISOString();
  }

  updateStatus(isActive: boolean): void {
    this._isActive = isActive;
    this._updatedAt = new Date().toISOString();
  }

  static create(props: Omit<SharedUser, 'createdAt' | 'updatedAt'>): User {
    const now = new Date().toISOString();
    return new User({
      ...props,
      createdAt: now,
      updatedAt: now
    });
  }

  toJSON(): SharedUser {
    return {
      id: this._id,
      email: this._email,
      displayName: this._displayName,
      photoURL: this._photoURL,
      role: this._role,
      isActive: this._isActive,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }
} 