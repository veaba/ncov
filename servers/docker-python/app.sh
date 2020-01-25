# 安装Chrome
apt-get install libxss1 libappindicator1 libindicator7
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt-get install -f
dpkg -i google-chrome-stable_current_amd64.deb
# 安装chromedriver
wget -N https://npm.taobao.org/mirrors/chromedriver/80.0.3987.16/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
chmod +x chromedriver
mv -f chromedriver /usr/local/share/chromedriver
ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver
ln -s /usr/local/share/chromedriver /usr/bin/chromedrive
pip install -r /opt/python/requirements.txt
python /opt/python/spider_app.py
