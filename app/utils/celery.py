from celery import Celery
from celery.schedules import crontab
import os

CELERY_BROKER_URL = f'amqp://{os.environ.get("RABBITMQ_DEFAULT_USER")}:{os.environ.get("RABBITMQ_DEFAULT_PASS")}@rabbit//'
CELERY_RESULT_BACKEND = f'db+postgresql://{os.environ.get("POSTGRES_USER")}:{os.environ.get("POSTGRES_PASSWORD")}@db/{os.environ.get("POSTGRES_DB")}'

app = Celery('celeryApp', broker=CELERY_BROKER_URL)

app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='Asia/Kolkata',
    result_backend=CELERY_RESULT_BACKEND,
)

app.autodiscover_tasks([
    'app.views.audit.helper.generate_flags',
])

"""@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    # Calls test('hello') every 10 seconds.
    sender.add_periodic_task(10.0, test.s('hello'), name='add every 10')

    # Calls test('world') every 30 seconds
    sender.add_periodic_task(30.0, test.s('world'), expires=10)

    # Executes every Monday morning at 7:30 a.m.
    sender.add_periodic_task(
        crontab(hour=7, minute=30, day_of_week=1),
        test.s('Happy Mondays!'),
    )

@app.task
def test(arg):
    print(arg)

@app.task
def add(x, y):
    z = x + y
    print(z)
"""
