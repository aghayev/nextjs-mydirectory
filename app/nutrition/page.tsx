import Link from "next/link";
import React from "react";

const NutritionPage = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/nutrition/BreakfastIdeas">Breakfast Ideas</Link>
        </li>
        <li>
          <Link href="/nutrition/LunchAndDinnerIdeas">
            Lunch And Dinner Ideas
          </Link>
        </li>
        <li>
          <Link href="/DrinksAndSnacks">Drinks And Snacks</Link>
        </li>
      </ul>
    </div>
  );
};

export default NutritionPage;
