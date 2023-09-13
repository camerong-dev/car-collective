# Generated by Django 3.2.21 on 2023-09-12 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collective', '0002_post_seats'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='car_model',
            field=models.CharField(max_length=180),
        ),
        migrations.AlterField(
            model_name='post',
            name='colour',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='post',
            name='engine_capacity',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='post',
            name='engine_layout',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='post',
            name='manufacturer',
            field=models.CharField(max_length=120),
        ),
        migrations.AlterField(
            model_name='post',
            name='seats',
            field=models.CharField(max_length=2),
        ),
        migrations.AlterField(
            model_name='post',
            name='title',
            field=models.CharField(max_length=120),
        ),
        migrations.AlterField(
            model_name='post',
            name='year_of_manufacture',
            field=models.CharField(max_length=8),
        ),
    ]
