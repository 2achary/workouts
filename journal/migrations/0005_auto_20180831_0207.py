# Generated by Django 2.0 on 2018-08-31 02:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0004_auto_20180831_0206'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exerciseset',
            name='date_completed',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
