# Generated by Django 4.1.2 on 2022-12-23 20:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='lastname_1',
            new_name='lastname',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='lastname_2',
        ),
    ]