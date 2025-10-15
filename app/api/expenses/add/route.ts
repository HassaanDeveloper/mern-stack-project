import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "../../auth/[...nextauth]/options";
import dbconnect from '@/lib/dbconnect';
import Expense from '@/model/Expense';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, amount, category, date } = await req.json();

  if (!title || !amount || !category || !date) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  await dbconnect();

  try {
    const newExpense = await Expense.create({
      userId: session.user._id,
      title,
      amount,
      category,
      date,
    });

    return NextResponse.json({ message: "Expense added", expense: newExpense }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  }
}
