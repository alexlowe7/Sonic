from django.contrib.auth.models import User
from django.db import models
from main.helpers import get_default_intervals_stat, get_default_chords_stat

class IntervalGameStat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    total_correct = models.IntegerField(default=0)
    total_incorrect = models.IntegerField(default=0)
    stats = models.JSONField(default=get_default_intervals_stat)

    def __str__(self):
        return f"{self.user}'s Interval Game Session on {self.timestamp}"
    
class ChordGameStat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    total_correct = models.IntegerField(default=0)
    total_incorrect = models.IntegerField(default=0)
    stats = models.JSONField(default=get_default_chords_stat)

    def __str__(self):
        return f"{self.user}'s Chord Game Session on {self.timestamp}"
