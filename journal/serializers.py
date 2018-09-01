from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Exercise, ExerciseSet, MuscleGroup, Workout


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('id', 'name')


class ExerciseSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseSet
        fields = (
            'id',
            'date_created',
            'date_completed',
            'exercise',
            'set_number',
            'actual_reps',
            'goal_reps',
            'weight',
            'is_warm_up',
            'is_completed',
            'workout',
            'notes',)


class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = ('id', 'name')


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ('id', 'date_created',
                  'date_completed',
                  'name',
                  'is_routine',
                  'notes',)