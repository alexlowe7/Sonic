# Generated by Django 4.1 on 2023-05-13 19:09

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='IntervalGameStats',
            new_name='IntervalGameStat',
        ),
    ]
