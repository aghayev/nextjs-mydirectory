import Link from "next/link";
import React from "react";

const NutritionPage = () => {
  return (
    <div>
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
          <Link href="/DrinksAndSnacks">Drinks and snacks</Link>
        </li>
      </ul>
    </div>
  );
};

export default NutritionPage;
