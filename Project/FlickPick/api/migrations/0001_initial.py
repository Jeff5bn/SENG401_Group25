# Generated by Django 4.2.11 on 2024-03-20 04:31

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('backdrop_path', models.TextField(null=True)),
                ('genre_ids', models.JSONField()),
                ('id', models.BigIntegerField(default=api.models.generate_unique_id, primary_key=True, serialize=False, unique=True)),
                ('overview', models.TextField()),
                ('poster_path', models.TextField()),
                ('release_date', models.DateField()),
                ('title', models.TextField()),
                ('vote_average', models.FloatField(default=0.0)),
                ('vote_count', models.BigIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=150, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('salt', models.CharField(max_length=128)),
                ('first_name', models.CharField(blank=True, max_length=150, null=True)),
                ('last_name', models.CharField(blank=True, max_length=150, null=True)),
                ('account_created', models.DateTimeField(auto_now_add=True)),
                ('liked_movies', models.JSONField(default=list)),
                ('disliked_movies', models.JSONField(default=list)),
            ],
        ),
    ]
