# Generated by Django 5.0.2 on 2024-02-15 22:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Movies',
            new_name='Movie',
        ),
    ]
