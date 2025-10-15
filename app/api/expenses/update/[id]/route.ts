import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dbconnect from '@/lib/dbconnect';
import Expense from '@/model/Expense';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, amount, category, date } = await req.json();

  await dbconnect();

  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: params.id, userId: session.user._id },
      { title, amount, category, date },
      { new: true }
    );

    if (!updatedExpense) {
      return NextResponse.json({ message: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Expense updated", expense: updatedExpense }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Update failed", error }, { status: 500 });
  }
}