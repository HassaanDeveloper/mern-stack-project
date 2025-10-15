import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dbconnect from '@/lib/dbconnect';
import Expense from '@/model/Expense';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbconnect();

  try {
    const expenses = await Expense.find({ userId: session.user._id }).sort({ date: -1 });
    return NextResponse.json({ expenses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch expenses", error }, { status: 500 });
  }
}
