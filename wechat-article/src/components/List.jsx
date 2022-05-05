import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Input, List } from "@douyinfe/semi-ui";
import dataList from "../data/data.json";
import { getMonthDay, urlDecode } from "../util";
import { IconSearch } from "@douyinfe/semi-icons";
import { getArticleList } from "./services";

let result = [];
dataList.forEach((item) => {
    if (item.app_msg_ext_info) {
        let { title, content_url } = item.app_msg_ext_info;
        result.push({
            key: nanoid(),
            title: title,
            timestamp: item.comm_msg_info.datetime,
            url: content_url,
        });
    }
});

const ListContainer = () => {
    const [list, setList] = useState([]);
    // const navigate = useNavigate();

    useEffect(() => {
        // setList(result);
        fetchArticleList()
    }, []);

    const fetchArticleList = () => {
        getArticleList().then(res => {
            let list = res.data.sort((a, b) => a.newstime > b.newstime)
            setList(list)
        })
    }

    const onSearch = (value) => {
        if (value) {
            setList(result.filter((item) => item.title.indexOf(value) > -1));
        } else {
            setList(result);
        }
    };

    // const saveToServer = () => {
    //     dataList.forEach(item => {
    //         saveOriginArticle({
    //             fromName: "南京教育发布",
    //             fromid: item.comm_msg_info.fakeid,
    //             content: JSON.stringify(item),
    //             url: item.app_msg_ext_info.content_url,
    //             newstime: item.comm_msg_info.datetime,
    //             title: item.app_msg_ext_info.title
    //         }).then(res => {
    //             console.log(res)
    //         })
    //     })
    // }

    return (
        <div>

            <div className="list-section">
            {/* <Button onClick={saveToServer}>Save</Button> */}
                <List
                    dataSource={list}
                    size="small"
                    style={{
                        flexBasis: "100%",
                        flexShrink: 0,
                        borderBottom: "1px solid var(--semi-color-border)",
                    }}
                    header={
                        <Input
                            onCompositionEnd={(v) => onSearch(v.target.value)}
                            onChange={(v) => (!v ? onSearch() : null)}
                            placeholder="搜索"
                            prefix={<IconSearch />}
                        />
                    }
                    renderItem={(item) => {
                        let title = `[${item.fromName}][${getMonthDay(item.newstime)}] ${
                            item.title
                        }`;
                        return (
                            <div
                                className="row-item"
                                onClick={() => {
                                    window.open(urlDecode(item.url), "_blank");
                                }}
                            >
                                <div>{title}</div>
                            </div>
                        );
                    }}
                />
            </div>
        </div>
    );
};

export default ListContainer;
