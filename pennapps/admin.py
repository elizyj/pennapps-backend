from django.contrib import admin
from .models import Application, Applicant

# Register your models here.
from .models import Application, Applicant

admin.site.register(Application)
admin.site.register(Applicant)