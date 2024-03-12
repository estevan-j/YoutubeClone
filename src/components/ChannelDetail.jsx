import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {Videos, ChannelCard } from './'
import { fetchFromAPI } from "../utils/fetchFromAPI"

const ChannelDetail = () => {
    const { id } = useParams();
    const [channelDetails, setChannelDetails] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchFromAPI(`channels?part=snippet&id=${id}`)
            .then((data) => setChannelDetails(data?.items[0]));

        fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
            .then((data) => setVideos(data?.items));
    }, [id])
  
    return (
    <Box minHeight='95vh'>
      <Box>
        <div 
          style={{background: `linear-gradient(90deg, rgba(101,136,93,0.9528186274509804) 35%, rgba(64,63,74,1) 100%)`
          , zIndex: 10,
          height: '300px'
          }}
        />
          <ChannelCard channelDetail={channelDetails} marginTop='-110px' />
      </Box>
      <Box display='flex' p='2'>
          <Box sx={{mr: {sm: '100px'}}} />
          <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail
