from swipl

RUN apt-get update && \
    apt-get install -y python3 python3-pip --no-install-recommends

COPY requirements.txt /tmp/
RUN pip3 install -r /tmp/requirements.txt

COPY . /app
WORKDIR /app

ENV PORT 8000

CMD python3 server.py
