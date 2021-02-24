from django.contrib import admin
from . import models

# Register your models here.

register_list=[
    models.User,
    models.Post,
    models.Like,
]

admin.site.register(register_list)