# Generated by Django 4.1.2 on 2023-01-12 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_resume_resume_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resume',
            name='deleted_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='resumecontact',
            name='deleted_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='resumeeducation',
            name='deleted_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='resumelanguage',
            name='deleted_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='resumeskill',
            name='deleted_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='resumeworkexperience',
            name='deleted_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
