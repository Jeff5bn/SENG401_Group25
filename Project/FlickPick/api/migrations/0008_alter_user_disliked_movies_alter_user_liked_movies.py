# Generated by Django 5.0.2 on 2024-02-22 22:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_genre'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='disliked_movies',
            field=models.JSONField(default=list),
        ),
        migrations.AlterField(
            model_name='user',
            name='liked_movies',
            field=models.JSONField(default=list),
        ),
    ]
