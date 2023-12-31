# Generated by Django 3.2.21 on 2023-10-14 16:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('collective', '0002_alter_post_shape'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CarModelOptions',
        ),
        migrations.DeleteModel(
            name='ColourOptions',
        ),
        migrations.DeleteModel(
            name='EngineCapacityOptions',
        ),
        migrations.DeleteModel(
            name='EngineLayoutOptions',
        ),
        migrations.DeleteModel(
            name='ManufacturerOptions',
        ),
        migrations.DeleteModel(
            name='YearOfManufactureOptions',
        ),
        migrations.RemoveField(
            model_name='post',
            name='seats',
        ),
        migrations.AddField(
            model_name='post',
            name='drivetrain',
            field=models.CharField(blank=True, choices=[('front-wheel drive', 'Front-Wheel Drive'), ('rear-wheel drive', 'Rear-Wheel Drive'), ('four-wheel drive', 'Four-Wheel Drive')], max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='fuel_type',
            field=models.CharField(blank=True, choices=[('petrol', 'Petrol'), ('diesel', 'Diesel'), ('hybrid', 'Hybrid'), ('electric', 'Electric')], max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='gearbox',
            field=models.CharField(blank=True, choices=[('manual', 'Manual'), ('automatic', 'Automatic')], max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='image_1',
            field=models.ImageField(blank=True, null=True, upload_to='car-collective/media/'),
        ),
        migrations.AddField(
            model_name='post',
            name='image_2',
            field=models.ImageField(blank=True, null=True, upload_to='car-collective/media/'),
        ),
        migrations.AddField(
            model_name='post',
            name='image_3',
            field=models.ImageField(blank=True, null=True, upload_to='car-collective/media/'),
        ),
        migrations.AddField(
            model_name='post',
            name='image_4',
            field=models.ImageField(blank=True, null=True, upload_to='car-collective/media/'),
        ),
        migrations.AddField(
            model_name='post',
            name='image_5',
            field=models.ImageField(blank=True, null=True, upload_to='car-collective/media/'),
        ),
        migrations.AddField(
            model_name='post',
            name='mod_description_1',
            field=models.CharField(blank=True, max_length=160, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='mod_description_2',
            field=models.CharField(blank=True, max_length=160, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='mod_description_3',
            field=models.CharField(blank=True, max_length=160, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='mod_description_4',
            field=models.CharField(blank=True, max_length=160, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='mod_description_5',
            field=models.CharField(blank=True, max_length=160, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='mod_title_1',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='mod_title_2',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='mod_title_3',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='mod_title_4',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='mod_title_5',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='shape',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='collective.shape'),
        ),
        migrations.AlterField(
            model_name='shape',
            name='shape',
            field=models.CharField(choices=[('hatchback', 'Hatchback'), ('saloon', 'Saloon'), ('estate', 'Estate'), ('suv', 'SUV'), ('convertible', 'Convertible')], max_length=20),
        ),
    ]
