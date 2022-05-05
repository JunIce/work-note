import React, { useEffect, useRef, useState } from "react";
import { urlDecode } from "../util";

const Detail = () => {
    const [url, setUrl] = useState('');

    useEffect(() => {
        let data = sessionStorage.getItem("target")
        data = JSON.parse(data)
        data.turl = urlDecode(data.url)
        setUrl(data.turl)
        console.log(data)
    }, []);

    return (
        <div>
            <div>
                <iframe src={url} frameBorder="0"></iframe>
            </div>
        </div>
    );
};

export default Detail;
