import NutritionItem from "@/app/components/NutritionItem"

 export function generateStaticParams() {
    return [{ navigation: 'BreakfastIdeas' }, { navigation: 'LunchOrDinnerIdeas' }, { navigation: 'DrinksAndSnacks' }]
}
 
    // folder structure: app/nutrition/[navigation]/page.tsx
    // url: http://localhost:3002/nutrition/something?query=mine
    /* Expected output:
    Pathname: /nutrition/something
    Params: something
    SearchParams: mine
    */
    export default function Page() {
  
    return (
        <>
        <NutritionItem />
        </>
    )
}