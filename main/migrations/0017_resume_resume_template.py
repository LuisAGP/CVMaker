# Generated by Django 4.2.2 on 2023-06-26 18:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0016_resumetemplate_remove_resume_template_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='resume',
            name='resume_template',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main.resumetemplate'),
            preserve_default=False,
        ),
    ]
