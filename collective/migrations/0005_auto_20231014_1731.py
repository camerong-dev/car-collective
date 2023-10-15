# Generated by Django 3.2.21 on 2023-10-14 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collective', '0004_auto_20231014_1721'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='shape',
            field=models.CharField(choices=[('hatchback', 'Hatchback'), ('saloon', 'Saloon'), ('estate', 'Estate'), ('suv', 'SUV'), ('convertible', 'Convertible')], max_length=20),
        ),
        migrations.DeleteModel(
            name='Shape',
        ),
    ]