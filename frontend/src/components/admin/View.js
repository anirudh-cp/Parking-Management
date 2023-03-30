import React, { useEffect, useRef, Fragment, useState } from 'react'
import Tile from './Tile'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import useSlot from "./../../utils/Slot";
import { Loading, NoRecord } from '../common/MainContent';


const View = () => {

  const { getAllData, loading } = useSlot();

  let DATALIST = useRef([]);
  let RecordExist = useRef(false);

  const [refresh, setRefresh] = useState("");

  useEffect(() => {

    async function fetchData() {
      let response = await getAllData();
      DATALIST.current = response["data"];
      if (DATALIST.current.length === 0)
        RecordExist.current = false;
      else
        RecordExist.current = true;
    }

    fetchData();
  }, [refresh])



  return (
    <Box sx={{ m: 3, pb: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ my: 2 }}>Slot Details:</Typography>
      {
        loading === true ? <Loading /> :
          <Fragment>
            {RecordExist.current === true ?
              DATALIST.current['slots'].map((row) => {
                return (
                  <Fragment key={row.code}>
                    <Tile obj={row} setRefresh={setRefresh}/>
                  </Fragment>)
              })
              : <NoRecord />}
          </Fragment>
      }
    </Box>
  )
}

export default View