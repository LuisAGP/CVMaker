# Generated by Django 4.1.2 on 2023-01-14 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_alter_resume_deleted_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='resumeeducation',
            name='duration',
            field=models.CharField(default=None, max_length=10),
            preserve_default=False,
        ),
    ]