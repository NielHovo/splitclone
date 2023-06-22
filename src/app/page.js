import React from 'react';
import supabase from './supabaseConnection';

export default async function Posts() {
  let users = [
    { id: 1, username: 'Hyusoko', balance: -47.4 },
    { id: 2, username: 'Biene', balance: 0 },
    { id: 3, username: 'BepisLoca', balance: 35.4 }
  ];

  return (
    <div className="w-[600px] flex flex-col justify-center items-center">
      <h1 className="w-[600px]">Smash Turnier</h1>
      <h2 className="w-[600px]">Overview</h2>
      <ul className="w-[600px]">
        {users.map((user) => (
          <li className="w-full flex justify-between p-2" key={user.id}>
            <p>{user.username}</p>
            <p className={user.balance < 0 ? 'text-red-600' : (user.balance > 0 ? 'text-green-600' : 'text-black')}>
              {user.balance >= 0 ? "+" + user.balance.toFixed(2) : user.balance.toFixed(2)}€
            </p>
          </li>
        ))}
      </ul>
      <button className='custom-btn btn-15 mt-5'>Add user</button>
    </div>
  );
}

