import { useEffect, useState } from 'react'

const Ssrexample = ({ message, isserver }) => {

    const [detect, setDetect] = useState();

    useEffect(() => {
        setDetect(typeof(process.env.IS_SERVER_FLAG) != "undefined" ? 'RUN ON SERVER' : 'RUN_ON_CLIENT')
    }, [])

return ( 
        <div> 
            <h1>{message}</h1> 
            <h1>{isserver}</h1> 
            <h1>{detect}</h1>
        </div> 
    )
}

export function getServerSideProps() { 
    
    var detect = typeof(process.env.IS_SERVER_FLAG) != "undefined" ? 'RUN ON SERVER' : 'RUN_ON_CLIENT'

    return { 
       props: { message: "Welcome to the example of Server Side Rendering Page", isserver:  detect }, 
       //notFound: true
        //redirect: {
        //destination: 'https://www.yahoo.com',
        //permanent: false,
      //},
    }
}

export default Ssrexample
