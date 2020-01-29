# # 这个文件是在宿主机上测试部属爬虫
# # 安装Chrome
cd /opt/python
# apt-get install libnss3-dev libxss1 libappindicator1 libindicator7
# # 安装chrome
# if [ ! -f "$(pwd)/google-chrome-stable_current_amd64.deb" ]; then
#     echo "下载Chromedriver"
#     wget -N https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
# fi
# dpkg -i google-chrome-stable_current_amd64.deb
# apt-get install -f
# # 安装chromedriver
# if [ ! -f "$(pwd)/chromedriver_linux64.zip" ]; then
#     echo "下载Chromedriver"
#     wget -N https://chromedriver.storage.googleapis.com/79.0.3945.36/chromedriver_linux64.zip
# fi
# unzip chromedriver_linux64.zip
# chmod +x chromedriver
# mv -f chromedriver /usr/local/share/chromedriver
# ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver
# ln -s /usr/local/share/chromedriver /usr/bin/chromedrive
pip install -r "$(pwd)"/requirements.txt
python "$(pwd)"/spider_app.py
