from django.contrib import admin
from .models import IntervalGameStat, ChordGameStat

# Register your models here.
admin.site.register(IntervalGameStat)
admin.site.register(ChordGameStat)