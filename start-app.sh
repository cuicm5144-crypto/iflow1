#!/bin/bash

# 骂我毒鸡汤应用启动脚本

echo "🎯 启动骂我毒鸡汤应用..."
echo "📱 功能介绍："
echo "   • 输入话题：老板、周一、房贷等"
echo "   • AI生成温柔又扎心的毒鸡汤"
echo "   • 一键生成精美文字图片"
echo "   • 分享到微博/小红书"
echo ""

# 检查是否有Python
if command -v python3 &> /dev/null; then
    echo "🚀 使用Python启动本地服务器..."
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🚀 使用Python启动本地服务器..."
    python -m SimpleHTTPServer 8000
else
    echo "⚠️  未找到Python，请在浏览器中直接打开 toxic-soup-app.html 文件"
fi

echo ""
echo "📋 使用说明："
echo "   1. 打开浏览器访问: http://localhost:8000/toxic-soup-app.html"
echo "   2. 或者直接双击 toxic-soup-app.html 文件在浏览器中打开"
echo "   3. 输入话题，点击生成按钮"
echo "   4. 生成文字图片并分享"
echo ""
echo "🎉 开始使用骂我App，让生活更有趣！"