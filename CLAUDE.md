- 帮我仿照https://snapany.com/ 这个 网站，写一个视频下载网站的前端项目。 功能很简单就是 用户输入一个 视频的URL连接，调用接口，返回视频的名称 并显示下载视频的按钮，点击下载视频根据接口返回的 视频链接 触发下载功能。网站主色为白色和蓝色。 接口参考：{
    "code": 200,
    "message": "视频下载成功",
    "data": {
        "text": "当 韩 红 遇 到 旺 仔 小 乔",
        "medias": {
            "media_type": "video",
            "resource_url": "/cache/video_ea285ab5-b1f1-47a5-8621-d9258c00e2a6_5bceaaf4c31586f8ed7789cc0407fc3a.mp4",
            "preview_url": null
        }
    },
    "timestamp": "2025-08-08T07:05:21.362779Z"
}


技术栈： 纯静态站点，用Bootstrap，适配 pc端和移动端。

网站要对seo友好。