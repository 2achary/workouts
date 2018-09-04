import datetime
import json

from django.contrib.auth.models import User, Group
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.response import Response

from journal.serializers import (
    UserSerializer,
    GroupSerializer,
    ExerciseSerializer,
    ExerciseSetSerializer,
    MuscleGroupSerializer,
    WorkoutSerializer
)

from .models import Exercise, Workout, ExerciseSet, MuscleGroup
from rest_framework import generics


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class ExerciseList(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer


class ExerciseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer


class ExerciseSetList(generics.ListCreateAPIView):
    queryset = ExerciseSet.objects.all()
    serializer_class = ExerciseSetSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = ExerciseSet.objects.all()
        workout_id = self.request.query_params.get('workout_id', None)
        if workout_id is not None:
            queryset = queryset.filter(workout_id=workout_id)
        return queryset


class ExerciseSetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExerciseSet.objects.all()
    serializer_class = ExerciseSetSerializer


class WorkoutList(generics.ListCreateAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer


class WorkoutDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer


class MuscleGroupList(generics.ListCreateAPIView):
    queryset = MuscleGroup.objects.all()
    serializer_class = MuscleGroupSerializer


class MuscleGroupDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MuscleGroup.objects.all()
    serializer_class = MuscleGroupSerializer


@csrf_exempt
def new_set_from_existing(request):
    body = json.loads(request.body)
    exercise_id = int(body.get('exercise_id'))
    workout_id = int(body.get('workout_id'))

    if exercise_id is None:
        return format_error_response('missing required field exercise_id')

    most_recent_exercise_set = ExerciseSet.objects.filter(
        workout_id=workout_id, is_warm_up=False, is_completed=True,
        exercise=exercise_id).order_by('-date_completed').all()

    if most_recent_exercise_set:
        most_recent_exercise_set = most_recent_exercise_set[0]

        most_recent_is_from_same_workout = most_recent_exercise_set.workout_id == workout_id

        if most_recent_is_from_same_workout:
            # find other sets in the workout to determine the set number for this one
            new_set_number = most_recent_exercise_set.set_number + 1
        else:
            new_set_number = 1

        new_set = ExerciseSet(
            date_created=datetime.datetime.utcnow(),
            exercise_id=exercise_id,
            set_number=new_set_number,
            goal_reps=most_recent_exercise_set.goal_reps,
            weight=most_recent_exercise_set.weight,
            is_warm_up=False,
            is_completed=False,
            workout_id=workout_id)
    else:
        new_set = ExerciseSet(
            date_created=datetime.datetime.utcnow(),
            exercise_id=exercise_id,
            set_number=1,
            workout_id=workout_id,
            is_warm_up=False,
            is_completed=False
        )
    new_set.save()
    return HttpResponse(json.dumps(ExerciseSetSerializer(new_set).data))


def format_error_response(message):
    return {
        'status': 'error',
        'message': message
    }
