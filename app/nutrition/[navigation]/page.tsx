'use client'
import {usePathname, useParams, useSearchParams} from "next/navigation";
 
    // folder structure: app/nutrition/[navigation]/page.tsx
    // url: http://localhost:3002/nutrition/something?query=mine
    /* Expected output:
    Pathname: /nutrition/something
    Params: something
    SearchParams: mine
    */
    export default function Page() {
 
    let queryResult: string | null | undefined = null
 
    // params dataset placeholder
    let params: Record<string, string | string[]> | null
 
    const pathName = usePathname()
    params = useParams()
    const searchParams = useSearchParams() 
    queryResult = searchParams?.get('query')    
 
    console.log(params)

    return (
        <>
        <div><span>Pathname: </span>{pathName}</div>
        <div><span>Params: </span>{params?.navigation}</div>
        <div><span>SearchParams: </span>{queryResult}</div>
        </>
    )
}