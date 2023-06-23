'use client';
import React from 'react';
import supabase from './supabaseConnection';
import Link from 'next/link';

export default async function Posts() {
  let users = [
    { id: 1, username: 'Hyusoko', balance: -35.4 },
    { id: 2, username: 'Biene', balance: 0 },
    { id: 3, username: 'BepisLoca', balance: 35.4 }
  ];
  let transactions = [
    { id: 1, userId: 3, amount: 15, title: "Venue Fees" },
    { id: 2, userId: 3, amount: 57.4, title: "Food" },
    { id: 3, userId: 2, amount: 37, title: "2-Day-Ticket" },
    { id: 4, userId: 1, amount: 1.6, title: "Croissant" },
  ]

  function handleTransactionClick(trans) {
    history.push({
      pathname: "/bill",
      state: { transaction: trans }
    });
  }

  return (
    <div className="w-[600px] flex flex-col justify-center items-center">
      <h1 className="w-[600px]">Smash Turnier</h1>
      <h2 className="w-[600px]">Overview</h2>
      <ul className="w-[600px]">
        {users.map((user) => (
          <a href='./bill'>
            <li
              className="w-full flex justify-between p-2"
              key={user.id}
              onClick={() => handleTransactionClick(trans)}
            >
              <p>{user.username}</p>
              <p className={user.balance < 0 ? 'text-red-600' : (user.balance > 0 ? 'text-green-600' : 'text-black')}>
                {user.balance >= 0 ? "+" + user.balance.toFixed(2) : user.balance.toFixed(2)}€
              </p>
            </li>
          </a>
        ))}
      </ul>
      <button className='custom-btn btn-15 m-5'>Add user</button>
      <ul className="w-[600px]">
        {transactions.map((trans) => (
          <Link href={`/bill/${trans.id}`}>
            <li className="w-full flex justify-between expense items-center cursor-pointer p-2" key={trans.id}>
              <div>
                <p className='font-bold'>{trans.title}</p>
                <p>{users.find((user) => user.id === trans.userId)?.username}</p>
              </div>
              <p>
                {trans.amount.toFixed(2)}€
              </p>
            </li>
          </Link>
        ))}
      </ul>
      <a className='custom-btn btn-15 m-5' href='./bill/new'>Add Expense</a>
    </div>
  );
}

