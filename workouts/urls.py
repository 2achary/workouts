"""workouts URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.conf.urls import url, include
from django.views.generic import TemplateView
from rest_framework import routers
from django.conf.urls import include, url
from rest_framework.authtoken.views import obtain_auth_token

from journal import views
from accounts import views as account_views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
id_regex = r'(?P<pk>[0-9]+)'

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/users/create-account', account_views.UserCreate.as_view()),
    url(r'^api/', include(router.urls)),

    url(r'^', include(router.urls)),
    # url(r'^register/', register_view.register_user),
    url(r'^api-token-auth/', obtain_auth_token),



    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path('^$', TemplateView.as_view(template_name='index.html')),

    url(r'^api/exercises/(?P<pk>[0-9]+)/$', views.ExerciseDetail.as_view()),
    url(r'^api/exercise-sets/(?P<pk>[0-9]+)/$', views.ExerciseSetDetail.as_view()),
    url(r'^api/workouts/(?P<pk>[0-9]+)/$', views.WorkoutDetail.as_view()),
    url(r'^api/muscle-groups/(?P<pk>[0-9]+)/$', views.MuscleGroupDetail.as_view()),

    url(r'^api/exercises/$', views.ExerciseList.as_view()),
    url(r'^api/exercise-sets/$', views.ExerciseSetList.as_view()),
    url(r'^api/workouts/$', views.WorkoutList.as_view()),
    url(r'^api/muscle-groups/$', views.MuscleGroupList.as_view()),
    url(r'^api/new-set-from-existing/$', views.new_set_from_existing)
]
