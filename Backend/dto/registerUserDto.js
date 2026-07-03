class registerDto {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.passwordHash = data.passwordHash;
    this.avatar = data.avatar || null;
    this.friends = data.friends || null;
  }
}

export default registerDto;
