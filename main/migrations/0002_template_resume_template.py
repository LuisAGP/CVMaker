# Generated by Django 4.1.2 on 2022-12-23 22:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Template',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(null=True, upload_to='resume_templates/mini/')),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted_at', models.DateTimeField(null=True)),
            ],
        ),
        migrations.AddField(
            model_name='resume',
            name='template',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.template'),
        ),
    ]
