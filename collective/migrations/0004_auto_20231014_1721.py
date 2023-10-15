# Generated by Django 3.2.21 on 2023-10-14 16:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collective', '0003_auto_20231014_1719'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='drivetrain',
            field=models.CharField(choices=[('front-wheel drive', 'Front-Wheel Drive'), ('rear-wheel drive', 'Rear-Wheel Drive'), ('four-wheel drive', 'Four-Wheel Drive')], max_length=20),
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
            name='fuel_type',
            field=models.CharField(choices=[('petrol', 'Petrol'), ('diesel', 'Diesel'), ('hybrid', 'Hybrid'), ('electric', 'Electric')], max_length=10),
        ),
        migrations.AlterField(
            model_name='post',
            name='gearbox',
            field=models.CharField(choices=[('manual', 'Manual'), ('automatic', 'Automatic')], max_length=10),
        ),
        migrations.AlterField(
            model_name='post',
            name='image_1',
            field=models.ImageField(upload_to='car-collective/media/'),
        ),
    ]