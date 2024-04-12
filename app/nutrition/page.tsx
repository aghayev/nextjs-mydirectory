'use client'
import Link from "next/link";
import React from "react";

const NutritionPage = () => {
  return (
    <div>
      <button onClick={() => history.back()}><strong>back</strong></button>
      <ul>
        <li>
          <Link href="/nutrition/BreakfastIdeas">Breakfast ideas</Link>
        </li>
        <li>
          <Link href="/nutrition/LunchOrDinnerIdeas">
            Lunch and dinner ideas
          </Link>
        </li>
        <li>
          <Link href="/nutrition/DrinksAndSnacks">Drinks and snacks</Link>
        </li>
      </ul>
    </div>
  );
};

export default NutritionPage;
