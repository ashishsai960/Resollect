# Generated by Django 5.0.6 on 2025-03-26 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Student",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("entry_number", models.CharField(max_length=50, unique=True)),
                ("batch", models.CharField(max_length=50)),
                ("marks", models.FloatField(default=0.0)),
                ("attendance_percentage", models.FloatField(default=0.0)),
                ("grade", models.CharField(blank=True, max_length=2, null=True)),
            ],
        ),
    ]
