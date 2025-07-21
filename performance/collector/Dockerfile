FROM python:3-alpine

WORKDIR /srv

ADD ./app.py /srv/app.py

RUN apk add py3-gunicorn py3-flask py3-flask-cors py3-psutil linux-headers gcc

EXPOSE 5000

CMD ["gunicorn", "-w", "8", "-b", "0.0.0.0:5000", "app:app"]