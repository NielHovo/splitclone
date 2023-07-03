"use client";
import React from "react";
import supabase from "./supabaseConnection";
import Link from "next/link";

export default async function Posts() {
  let { data: usersSupa, error } = await supabase.from("users").select("*");

  let { data: transactionsSupa, transactionserror } = await supabase
    .from("transactions")
    .select("*");

  {
    console.log(transactionsSupa);
    console.log(transactionserror);
  }

  return (
    <div className="w-[600px] flex flex-col justify-center items-center">
      <h1 className="w-[600px]">Smash Turnier</h1>
      <h2 className="w-[600px]">Overview</h2>
      <ul className="w-[600px]">
        {usersSupa.map((user) => (
          <a href="./bill">
            <li
              className="w-full flex justify-between p-2"
              key={user.userId}
              onClick={() => handleTransactionClick(trans)}
            >
              <p>{user.username}</p>
              <p
                className={
                  user.balance < 0
                    ? "text-red-600"
                    : user.balance > 0
                    ? "text-green-600"
                    : "text-black"
                }
              >
                {user.balance >= 0
                  ? "+" + user.balance.toFixed(2)
                  : user.balance.toFixed(2)}
                €
              </p>
            </li>
          </a>
        ))}
      </ul>
      <button className="custom-btn btn-15 m-5">Add user</button>
      <ul className="w-[600px]">
        {transactionsSupa.map((trans) => (
          <Link href={`/bill/${trans.id}`}>
            <li
              className="w-full flex justify-between expense items-center cursor-pointer p-2"
              key={trans.id}
            >
              <div>
                <p className="font-bold">{trans.title}</p>
                <p>
                  {usersSupa.find((user) => user.userId === trans.userId)?.username}
                </p>
              </div>
              <p>{trans.amount.toFixed(2)}€</p>
            </li>
          </Link>
        ))}
      </ul>
      <a className="custom-btn btn-15 m-5" href="./bill/new">
        Add Expense
      </a>
    </div>
  );
}
