# Generated by Django 4.1 on 2023-06-10 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_rename_intervalgamestats_intervalgamestat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='intervalgamestat',
            name='stats',
            field=models.JSONField(default={'Major 2nd': {'ascending': {'correct': 0, 'incorrect': 0}, 'descending': {'correct': 0, 'incorrect': 0}, 'harmonic': {'correct': 0, 'incorrect': 0}}, 'Major 3rd': {'ascending': {'correct': 0, 'incorrect': 0}, 'descending': {'correct': 0, 'incorrect': 0}, 'harmonic': {'correct': 0, 'incorrect': 0}}, 'Major 6th': {'ascending': {'correct': 0, 'incorrect': 0}, 'descending': {'correct': 0, 'incorrect': 0}, 'harmonic': {'correct': 0, 'incorrect': 0}}, 'Major 7th': {'ascending': {'correct': 0, 'incorrect': 0}, 'descending': {'correct': 0, 'incorrect': 0}, 'harmonic': {'correct': 0, 'incorrect': 0}}, 'Minor 2nd': {'ascending': {'correct': 0, 'incorrect': 0}, 'descending': {'correct': 0, 'incorrect': 0}, 'harmonic': {'correct': 0, 'incorrect': 0}}, 'Minor 3rd': {'ascending': {'correct': 0, 'incorrect': 0}, 'descending': {'correct': 0, 'incorrect': 0}, 'harmonic': {'correct': 0, 'incorrect': 0}}, 'Minor 6th': {'ascending': {'correct': 0, 'incorrect': 0}, 'descending': {'correct': 0, 'incorrect': 0}, 'harmonic': {'correct': 0, 'incorrect': 0}}, 'Minor 7th': {'ascending': {'correct': 0, 'incorrect': 0}, 'descending': {'correct': 0, 'incorrect': 0}, 'harmonic': {'correct': 0, 'incorrect': 0}}, 'Octave': {'ascending': {'correct': 0, 'incorrect': 0}, 'descending': {'correct': 0, 'incorrect': 0}, 'harmonic': {'correct': 0, 'incorrect': 0}}, 'Perfect 4th': {'ascending': {'correct': 0, 'incorrect': 0}, 'descending': {'correct': 0, 'incorrect': 0}, 'harmonic': {'correct': 0, 'incorrect': 0}}, 'Perfect 5th': {'ascending': {'correct': 0, 'incorrect': 0}, 'descending': {'correct': 0, 'incorrect': 0}, 'harmonic': {'correct': 0, 'incorrect': 0}}, 'Tritone': {'ascending': {'correct': 0, 'incorrect': 0}, 'descending': {'correct': 0, 'incorrect': 0}, 'harmonic': {'correct': 0, 'incorrect': 0}}}),
        ),
    ]
