FROM python:3

WORKDIR /opt/python

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "./web_socket.py" ]