export class User
{
    public userId: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public email: string;
    public lastLoginDate: Date;
    public loginDateDisplay: Date;
    public joinDate: Date;
    public profileImageUrl: string;
    public isActive: boolean;
    public isNotLocked: boolean;
    public role: string;
    public authorities: [];


  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.isActive = false;
    this.isNotLocked = false;
    this.role = '';
    this.authorities = [];
  }
}
