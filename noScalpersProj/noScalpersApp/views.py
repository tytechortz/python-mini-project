from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from .models import Post
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
import json


class Posts(View):
    def get(self, request):

        if(request.user.is_authenticated):

            user = User.objects.get(id=request.user.id)

            post_list = list(user.post.all().values())

            return JsonResponse({
                'Content-Type': 'application/json',
                'status': 200,
                'data': post_list
            }, safe=False)
        else:
            return JsonResponse({
                'Content-Type': 'application/json',
                'status': 200,
                'message': 'Must be logged in to see the data'
                }, safe=False)



    # @method_decorator(login_required)
    def post(self, request):
        data = request.body.decode('utf-8')
        data = json.loads(data)

        try:
            new_post = Post(title=data["title"], author=data["author"], commentBody=data["commentBody"])

            new_post.created_by = request.user
            new_post.save()
            data["id"] = new_post.id
            print(data, ' this is sdatataatatataatta', request.user)
            return JsonResponse({"data": data}, safe=False)
        except:
            return JsonResponse({"error": "Data is Not Valid"},safe=False)

class Post_Detail(View):
    # @method_decorator(csrf_exempt)
    # def dispatch(self, request, *args, **kwargs):
    #     return super(Book_Detail, self).dispatch(request, *args, **kwargs)

    def get(self, request, pk):
        post_list = list(Post.objects.filter(pk=pk).values())
        return JsonResponse({"data": post_list}, safe=False)
    def put(self, request, pk):
        data = request.body.decode('utf-8')
        data = json.loads(data)

        try:
            edit_post = Post.objects.get(pk=pk)
            data_key = list(data.keys())

            for key in data_key:
                if key == "title":
                    edit_post.title = data[key]
                if key == "author":
                    edit_post.author = data[key]
                if key == "commentBody":
                    edit_post.year = data[key]
            edit_post.save()
            data["id"] = edit_post.id
            return JsonResponse({"data": data}, safe=False)
        except:
            return JsonResponse({"error": "Something Went Wrong"}, safe=False)

    def delete(self, request, pk):
        try:
            post_to_delete = Post.objects.get(pk=pk)
            post_to_delete.delete()
            return JsonResponse({"data": "deleted"}, safe=False)
        except:
            return JsonResponse({"error": "Something Went Wrong"}, safe=False)
