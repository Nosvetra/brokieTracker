class createExpenseDTO {
  constructor(data) {
    this.groupId = data.groupId ?? null;
    this.description = data.description;
    this.amount = data.amount;
    this.currency = data.currency ?? "INR";
    this.paidBy = data.paidBy;
    this.splitType = data.splitType;
    this.category = data.category ?? "other";

    this.splits =
      data.splits?.map((split) => ({
        userId: split.userId,
        amount: split.amount,
        percentage: split.percentage ?? null,
      })) || [];
  }
}

export default CreateExpenseDTO;
