from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=255)
    entry_number = models.CharField(max_length=50, unique=True)
    batch = models.CharField(max_length=50)
    marks = models.FloatField(default=0.0)
    attendance_percentage = models.FloatField(default=0.0)
    grade = models.CharField(max_length=2, null=True, blank=True)  # Initially NULL

    def __str__(self):
        return f"{self.name} ({self.entry_number})"
