from django.contrib import admin
from . import models


class ExerciseSetInline(admin.TabularInline):
    model = models.ExerciseSet
    extra = 0


class WorkOutAdmin(admin.ModelAdmin):
    inlines = [ExerciseSetInline]


admin.site.register(models.ExerciseSet)
admin.site.register(models.Exercise)
admin.site.register(models.Workout, WorkOutAdmin)
admin.site.register(models.MuscleGroup)

