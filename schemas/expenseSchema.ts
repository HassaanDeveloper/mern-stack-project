import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.enum([
    "Food",
    "Travel",
    "Entertainment",
    "Shopping",
    "Bills",
    "Other",
  ]),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  userId: z.string().min(1, "User ID is required"),
});
