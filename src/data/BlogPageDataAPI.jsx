import axios from "axios";
import React, { useEffect, useState } from "react";

function blog_page_data_api(){
    const [post, setPost] = useState("");
    useEffect(() => {
    axios.get('https://drawproject-production.up.railway.app/api/v1/post')
    .then((res) => {
      setPost(res.data);
    })
  }, []);
  return(
    <div>
        <p>{post}</p>
    </div>
  )
}


export default blog_page_data_api;