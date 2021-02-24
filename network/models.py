from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    user_URL = models.URLField(blank=True, null=True) 

class Post(models.Model):
    post_id=models.AutoField(primary_key=True)
    post_Author=models.ForeignKey(User,on_delete=models.CASCADE,related_name='user')
    post_Stamp=models.DateTimeField()
    post_Content=models.TextField()

class Like(models.Model):
    like_Post_id=models.ForeignKey(Post,on_delete=models.CASCADE,related_name='likePostid')
    like_User_id=models.ForeignKey(User,on_delete=models.CASCADE,related_name='like_User_id')