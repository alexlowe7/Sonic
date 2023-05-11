from django.contrib.auth.models import User
from django.db import models


class IntervalGameStats(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    total_correct = models.IntegerField(default=0)
    total_incorrect = models.IntegerField(default=0)
    stats = models.JSONField(default=dict)

    def __str__(self):
        return f"{self.user.username}'s Interval Game Session on {self.timestamp}"

