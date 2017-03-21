import Mock from 'mockjs';

// 模拟列表数据
Mock.mock(/\/common\/my-list/,[
        {
            param:{
                page:1
            },
            data:{
                list:[
                    {
                        id:0,
                        content:"我是第1条数据",
                        title:"我是标题1",
                        name:"苹果店"
                    },
                    {
                        id:1,
                        content:"我是第2条数据",
                        title:"我是标题2",
                        name:"三星店"
                    },
                    {
                        id:2,
                        content:"我是第3条数据",
                        title:"我是标题3",
                        name:"华为店"
                    }
                ],
                totalnum:9
            }
        },
        {
            param:{
                page:2
            },
            data:{
                list:[
                    {
                        id:3,
                        content:"我是第4条数据",
                        title:"我是标题4",
                        name:"小米店"
                    },
                    {
                        id:4,
                        content:"我是第5条数据",
                        title:"我是标题5",
                        name:"魅族店"
                    },
                    {
                        id:5,
                        content:"我是第6条数据",
                        title:"我是标题6",
                        name:"中兴店"
                    }
                ],
                totalnum:9
            }
        },
        {
            param:{
                page:3
            },
            data:{
                list:[
                    {
                        id:6,
                        content:"我是第7条数据",
                        title:"我是标题7",
                        name:"锤子店"
                    },
                    {
                        id:7,
                        content:"我是第8条数据",
                        title:"我是标题8",
                        name:"OPPO店"
                    },
                    {
                        id:8,
                        content:"我是第9条数据",
                        title:"我是标题9",
                        name:"步步高店"
                    }
                ],
                totalnum:9
            }
        }
    ]
);