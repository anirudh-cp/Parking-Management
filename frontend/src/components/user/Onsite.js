import { Button } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import Input from "./Input";
import Process from './Process';


const Onsite = () => {

    const [data, setData] = useState(null);
    const [action, setAction] = useState('');

    const [page, setPage] = useState(0);

    useEffect(() => {
        if (data !== null)
        {
            setPage(1)
        }
    }, [data])
    
    const resetData = () => {
        console.log("Full reset called")
        setData(null);
        setAction("");
        setPage(0);
    }

    return (
        <Fragment>
            {
                page===0 ? 
                <Input data={data} setData={setData} action={action} setAction={setAction} /> 
                :
                <Process data={data} action={action} resetData={resetData} />
            }
            <Button onClick={() => {setData(102)}}>click</Button>
        </Fragment>
    )
}

export default Onsite