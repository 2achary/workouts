from django.db import models


class MuscleGroup(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name


class Exercise(models.Model):
    name = models.CharField(max_length=250)
    muscle_groups = models.ManyToManyField(MuscleGroup)

    def __str__(self):
        return self.name


class Workout(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_completed = models.DateTimeField(null=True, blank=True)
    name = models.CharField(max_length=250, null=True)
    is_routine = models.BooleanField()
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        date = self.date_created.date().isoformat()
        return date + ' - ' + self.name


class ExerciseSet(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_completed = models.DateTimeField(null=True, blank=True)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    set_number = models.IntegerField(null=True, blank=True)
    actual_reps = models.IntegerField(null=True, blank=True)
    goal_reps = models.IntegerField(null=True)
    weight = models.FloatField(null=True)
    is_warm_up = models.BooleanField()
    is_completed = models.BooleanField()
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE, null=True)
    notes = models.TextField(null=True, blank=True)

    @property
    def most_recent(self):
        most_recent = ExerciseSet.objects.filter(
            workout_id=self.workout_id, is_warm_up=False, is_completed=True,
            exercise=self.exercise_id).order_by('-date_completed').all()

        if most_recent:
            most_recent = most_recent[0]
            return f'{round(most_recent.weight)} lbs x {most_recent.actual_reps}'
        else:
            return '-'


    def __str__(self):
        return f'{self.date_created.date().isoformat() if self.date_created else ""} - {self.exercise.name}, Set {self.set_number or 0}: {self.weight or 0} x {self.actual_reps or 0}'




