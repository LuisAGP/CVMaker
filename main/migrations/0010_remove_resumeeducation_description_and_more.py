# Generated by Django 4.1.2 on 2023-01-15 23:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_alter_resumeeducation_duration_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='resumeeducation',
            name='description',
        ),
        migrations.RemoveField(
            model_name='resumeeducation',
            name='duration',
        ),
        migrations.AlterField(
            model_name='resumeeducation',
            name='from_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='resumeeducation',
            name='to_date',
            field=models.DateField(),
        ),
        migrations.CreateModel(
            name='ResumeCoursesCertifications',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('academy_name', models.CharField(max_length=255)),
                ('field_of_study', models.CharField(max_length=255)),
                ('duration', models.CharField(max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('resume', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.resume')),
            ],
        ),
    ]
