#!/bin/bash

# 前端部署脚本

echo "开始部署前端项目..."

# 创建前端目录
sudo mkdir -p /opt/youtube_downloader/frontend

# 复制前端文件到服务器
echo "复制前端文件..."
sudo cp -r * /opt/youtube_downloader/frontend/

# 设置前端目录权限
sudo chown -R www-data:www-data /opt/youtube_downloader/frontend
sudo chmod -R 755 /opt/youtube_downloader/frontend

# 验证部署
echo "验证前端文件..."
ls -la /opt/youtube_downloader/frontend/

echo "前端部署完成！"

# 重新加载Nginx配置
echo "重新加载Nginx配置..."
sudo nginx -s reload

echo "前端部署成功！"