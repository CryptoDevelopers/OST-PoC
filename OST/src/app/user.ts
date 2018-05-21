export class User {
  constructor(
    public user_id: number,
    public username: string,
    public password: string,
    public first_name?: string,
    public last_name?: string,
    public email: string,
    public linkedin_url?: string
  ) {  }
}
