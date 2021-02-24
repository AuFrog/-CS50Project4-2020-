import datetime
from itertools import chain
from operator import attrgetter
from django.core import serializers
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError, models
from django.http import HttpResponse, HttpResponseRedirect,JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import User, Post, Like


def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


@csrf_exempt
@login_required
def compose(request):

    # Composing a new post must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data=request.POST.get('c',1)
    new_post=Post(
        post_Author=request.user,
        post_Content=data,
        # post_Stamp=datetime.datetime.strptime(date, '%Y-%m-%dT%H:%M:%S')
        post_Stamp=datetime.datetime.now().replace(microsecond=0)
    )
    new_post.save()

    return JsonResponse({"message": "New post sent successfully."}, status=201)


def allpost(request):
    postList=Post.objects.all().values_list('post_id','post_Author__username','post_Stamp','post_Content','post_Author__user_URL')
  
    # paginator=Paginator(postList,3)
    # page_obj=paginator.get_page(1)
    # queryset=list(page_obj)
    # content={'total-page' : paginator.num_pages,'data':queryset}
    # return JsonResponse(content)

    
    content={'total-page' : 0,'data':list(postList)}
    return JsonResponse(content)

@csrf_exempt
@login_required
def like(request):
    id=request.POST.get('pid')
    ini=request.POST.get('ini')
    uid=request.user.id
    likeList=Like.objects.filter(like_Post_id=id,like_User_id=uid)

    if(ini=='true'):     
            return JsonResponse({'result':likeList.exists()})
    else:
        if(likeList.exists()):
            likeList.delete()
        else:
            new_like=Like(
                like_Post_id=Post.objects.get(post_id=id),
                like_User_id=request.user
            )
            new_like.save()
        return JsonResponse({"message": "like successfully."}, status=201)

@csrf_exempt
def profile(request, uid):
    tempUser=User.objects.get(pk=uid)
    tempPost=Post.objects.filter(post_Author=tempUser).values_list('post_id','post_Author__username','post_Stamp','post_Content','post_Author__user_URL')
 
    # tp=serializers.serialize('json',tempPost)
    tu=serializers.serialize("json", [tempUser])

    # tu=list(tempUser)
    tp=list(tempPost)

    content={'user' : tu,'data':tp} 
    return JsonResponse(content)
    