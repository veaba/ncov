# 这个文件是在宿主机上测试部属爬虫
# 安装Chrome
apt-get install libxss1 libappindicator1 libindicator7
# 安装chrome
if [ -d "$(pwd)${google-chrome-stable_current_amd64.deb}" ]; then
    echo "下载Chromedriver"
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
fi
apt-get install -f
dpkg -i google-chrome-stable_current_amd64.deb
# 安装chromedriver
if [ -d "$(pwd)${chromedriver_linux64.zip}" ]; then
    echo "下载Chromedriver"
    wget -N https://npm.taobao.org/mirrors/chromedriver/80.0.3987.16/chromedriver_linux64.zip
fi
unzip chromedriver_linux64.zip
chmod +x chromedriver
rm /usr/local/bin/chromedriver
rm /usr/bin/chromedrive
mv -f chromedriver /usr/local/share/chromedriver
ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver
ln -s /usr/local/share/chromedriver /usr/bin/chromedrive
pip install -r "$(pwd)"/requirements.txt
python "$(pwd)"/spider_app.py
