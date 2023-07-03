"use client";
import { useEffect, useState } from 'react';
import supabase from "../../supabaseConnection";

async function Home() {
  let { data: users, error } = await supabase.from("users").select("*");
  const [title, setTitle] = useState('');

  const handleSubmit = async () => {
    console.log("This was submitted: " + titleRef.current.value)
    await supabase
      .from('transactions')
      .insert([
        { title: 'Hier könnte Ihre Werbung stehen', amount: 80, userId: 1 }, //Nicht dynamisch geschafft, aber es pusht :'D
      ])
      .select()
    }
  
  return (
    <>
      <div className="w-[600px] flex flex-col justify-center items-center border rounded-xl p-5">
        <h1 className=" ml-10 w-[600px]">Smash Turnier</h1>
        <form className="flex flex-col" onSubmit={handleSubmit} method="post">
          <label for="title">Titel:</label>
          <input className="pad-b" value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="title" name="title" placeholder="Insert Title" required />
          <label for="payer">Who paid?:</label>
          <select name="payer" className="pad-b">
            <option selected="selected" hidden="">
                    - Select User -</option>
              {users.map((user) => (
              <option value={user.id}>{user.username}</option>
            ))}
          </select>
          <label for="name">Total:</label>
          <div className="flex">
            <input className="pad-b centered-input" type="number" id="name" name="name" min={0} placeholder="0.00" required />
            <p>€</p>
          </div>
          <h2 className="hField">Who has to pay how much?:</h2>
          {users.map((user) => (
            <div className="flex justify-between">
              <label className="normal" for={`check_${user.id}`}>
                <input className="mr-2" type="checkbox" name={`check_${user.id}`}
                  id={`check_${user.id}`}
                />
                {user.username}:
              </label>
              <p>
                <input 
                  type="number"
                  className="w-[100px] border mr-1 number-field"
                  name={`portion_${user.id}`} id={`portion_${user.id}`}
                  placeholder="0"
                  min={0}
                />€
              </p>
            </div>
            ))}
            <div className="w-full flex justify-end">
              <label className="mt-2 text-sm" for="split">
                or split equally
                <input className="ml-2" type="checkbox" name="split"
                  id="split"
                />
              </label>
            </div>
          <label for="comment">Comment:</label>
          <textarea className="border border-b-2 border-b-[#808080]" rows={3} type="" id="comment" name="comment" required />
          <div className="w-full flex justify-center pt-8">
            <button className="custom-btn btn-15 mb-2" type="submit">Add Expense</button>
          </div>
        </form>
      </div>
      <a className="custom-btn2 btn-16 mt-5" href="/">Cancel</a>
    </>
  )
}
export default Home