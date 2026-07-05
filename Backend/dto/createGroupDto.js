class createGroupDto {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
    this.currency = data.currency;
    this.members =
      data.members?.map((member) => ({
        userId: member.userId,
      })) || [];
  }
}

export default createGroupDto;
