# Generated by Django 2.0 on 2018-08-31 02:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0002_auto_20180831_0158'),
    ]

    operations = [
        migrations.AddField(
            model_name='workout',
            name='name',
            field=models.CharField(max_length=250, null=True),
        ),
    ]
