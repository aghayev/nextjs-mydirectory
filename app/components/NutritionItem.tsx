'use client'
import React, { useEffect, useState } from 'react'
import {usePathname, useParams, useSearchParams} from "next/navigation";

const NutritionItem = () => {
    /*
    let queryResult: string | null | undefined = null
    const pathName = usePathname()    
    const searchParams = useSearchParams() 
    queryResult = searchParams?.get('query')
    */
  
    // params dataset placeholder
    let params: Record<string, string | string[]> | null
      
    params = useParams()

    const [dataResponse, setdataResponse] = useState([]);

    useEffect(() => {
        async function getPageData() {
          const apiUrlEndpoint = `http://localhost:3002/api/db/sqlite`;
          const postData = {
            method: "Post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              category: params?.navigation,
            }),
          };
    
          const response = await fetch(apiUrlEndpoint, postData);
          
          const res = await response.json();
          setdataResponse(res.items);
        }
        getPageData();
      }, [params]);
      
      useEffect(() => {
        console.log(dataResponse);
      }, [dataResponse]);      

    return (
        <>
        <div><span>Params: </span>{params?.navigation}</div>
        <div>
        {dataResponse.map((item) => (
                <span>{item['title']}</span>
            ))}
        </div>
        </>
    )
}

export default NutritionItem
