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
    public active: boolean;
    public notLocked: boolean;
    public role: string;
    public authorities: [];


  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.active = false;
    this.notLocked = false;
    this.role = '';
    this.authorities = [];
  }
}
