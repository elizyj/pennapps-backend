from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.db import models


class Applicant(AbstractUser):
    is_penn_student = models.BooleanField(default=False)

class Application(models.Model):
    STATUS_CHOICES = [
        ("ACPT", "Accepted"),
        ("RJCT", "Rejected"),
        ("WLST", "Waitlisted"),
        ("PROC", "Processing"),
    ]

    applicant = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    status = models.CharField(max_length=4, choices=STATUS_CHOICES, default="STRT")
    
