import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dbconnect from '@/lib/dbconnect';
import Expense from '@/model/Expense';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbconnect();

  try {
    const deletedExpense = await Expense.findOneAndDelete({
      _id: params.id,
      userId: session.user._id,
    });

    if (!deletedExpense) {
      return NextResponse.json({ message: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Expense deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed", error }, { status: 500 });
  }
}
