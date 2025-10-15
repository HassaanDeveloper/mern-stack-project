"use client";

import React, { useState, useEffect, ChangeEvent } from "react";    
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "./ui/dialog";
import { FilePenIcon, PlusIcon, TrashIcon } from "lucide-react";
import { format, set } from "date-fns";
import { ThemeToggle } from '@/components/themeToggle';
import { AnimatePresence, motion } from 'framer-motion';

type Expense = {
    id: number;
    name: string;
    amount: number;
    date: Date;
};

const initialExpenses: Expense[] = [
    { id: 1, name: "Groceries", amount: 250, date: new Date("2025-02-01") },
    { id: 2, name: "Rent", amount: 250, date: new Date("2025-02-10") },
    { id: 3, name: "Utilities", amount: 250, date: new Date("2025-03-01") },
    { id: 4, name: "Dining Out", amount: 250, date: new Date("2025-03-15") },
];

export default function ExpenseTracker() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isEditing, setIsEditing] =   useState<boolean>(false);
    const [currentExpenseId, setCurrentExpenseId] = useState<number | null>(null);
    const [newExpense, setNewExpense] = useState<{
        name: string;
        amount: string;
        date: Date;
    }>({
        name: "",
        amount: "",
        date: new Date(),
    });

    useEffect(() => {
        const storedExpenses = localStorage.getItem("expenses");
        if (storedExpenses) {
            setExpenses(JSON.parse(storedExpenses).map((expense: Expense) => ({
                ...expense,
                date: new Date(expense.date),
            }))
        );
        } else {
            setExpenses(initialExpenses);
        }
    }, []);

    useEffect(() => {
        if (expenses.length > 0) {
            localStorage.setItem("expenses", JSON.stringify(expenses));
        }
    }, [expenses]);

    const handleAddExpense = (): void => {
        if (!newExpense.name || !newExpense.amount || !newExpense.date) {
            alert("Please fill out all fields before adding an expense.");
            return;
        }
    
        const parsedAmount = parseFloat(newExpense.amount);
        const parsedDate = new Date(newExpense.date);
    
        if (isNaN(parsedAmount) || isNaN(parsedDate.getTime())) {
            alert("Invalid amount or date. Please enter valid values.");
            return;
        }
    
        setExpenses([
            ...expenses,
            {
                id: expenses.length + 1,
                name: newExpense.name,
                amount: parsedAmount,
                date: parsedDate,
            },
        ]);
        resetForm();
        setShowModal(false);
    };

    const handleEditExpense = (id: number): void => {
        const expenseToEdit = expenses.find((expense) => expense.id === id);
        if (expenseToEdit) {
            setNewExpense({
                name: expenseToEdit.name,
                amount: expenseToEdit.amount.toString(),
                date: expenseToEdit.date,
            });
            setCurrentExpenseId(id);
            setIsEditing(true);
            setShowModal(true);
        }
    };

    const handleSaveEditExpense = (): void => {
        setExpenses(
            expenses.map((expense) => 
            expense.id === currentExpenseId ? { ...expense, ...newExpense, amount: parseFloat(newExpense.amount)} : expense)
        );
        resetForm();
        setShowModal(false);
    };

    const resetForm = (): void => {
        setNewExpense({
            name: "",
            amount: "",
            date: new Date(),
        });
        setIsEditing(false);
        setCurrentExpenseId(null);
    };

    const handleDeleteExpense = (id: number): void => {
        setExpenses(expenses.filter((expense) => expense.id !== id));
    };

    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const {id, value} = e.target;
        setNewExpense((prevExpense) => ({
            ...prevExpense,
            [id]: id === "amount" ? parseFloat(value) : id === "date" ? new Date(value) : value,
        }));
    };
    
    return (
      <div className="flex flex-col h-screen">
        {/* Header section */}
        <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Expense Tracker</h1>
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold">
                Total: ${totalExpenses.toFixed(2)}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>
    
        {/* Main section */}
        <main className="flex-1 overflow-y-auto p-6">
          <ul className="space-y-4">
            <AnimatePresence>
              {expenses.map((expense) => (
                <motion.li
                  key={expense.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-medium">{expense.name}</h3>
                    <p className="text-muted-foreground">
                      ${expense.amount.toFixed(2)} - {format(expense.date, "dd/MM/yyyy")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditExpense(expense.id)}
                      className="cursor-pointer"
                    >
                      <FilePenIcon className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="cursor-pointer"
                    >
                      <TrashIcon className="w-5 h-5 cursor-pointer" />
                    </Button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </main>
    
        {/* Floating add expense button */}
        <div className="fixed bottom-6 right-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              resetForm();
            }}
            className="rounded-full shadow-lg bg-primary text-white dark:text-black p-4 cursor-pointer"
          >
            <PlusIcon className="w-6 h-6" />
          </motion.button>
        </div>
    
        {/* Modal dialog for adding/editing expenses */}
        <AnimatePresence>
          {showModal && (
            <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="bg-card p-6 rounded-lg shadow w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <DialogHeader>
                  <DialogTitle>
                    {isEditing ? "Edit Expense" : "Add Expense"}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Expense Name</Label>
                    <Input
                      id="name"
                      value={newExpense.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newExpense.amount}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newExpense.date.toISOString().slice(0, 10)}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={isEditing ? handleSaveEditExpense : handleAddExpense}
                  >
                    {isEditing ? "Save Changes" : "Add Expense"}
                  </Button>
                </DialogFooter>
              </motion.div>
            </DialogContent>
          </Dialog>
          
          )}
        </AnimatePresence>
      </div>
    );
}