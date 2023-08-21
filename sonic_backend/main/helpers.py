def get_default_intervals_stat():
    default_intervals_stat_asc_desc = {
        'ascending': {"correct": 0, "incorrect": 0},
        'descending': {"correct": 0, "incorrect": 0},
        'harmonic': {"correct": 0, "incorrect": 0},
    }
    return {
        "Minor 2nd": default_intervals_stat_asc_desc,
        "Major 2nd": default_intervals_stat_asc_desc,
        "Minor 3rd": default_intervals_stat_asc_desc,
        "Major 3rd": default_intervals_stat_asc_desc,
        "Perfect 4th": default_intervals_stat_asc_desc,
        "Perfect 5th": default_intervals_stat_asc_desc,
        "Tritone": default_intervals_stat_asc_desc,
        "Minor 6th": default_intervals_stat_asc_desc,
        "Major 6th": default_intervals_stat_asc_desc,
        "Minor 7th": default_intervals_stat_asc_desc,
        "Major 7th": default_intervals_stat_asc_desc,
        "Octave": default_intervals_stat_asc_desc,
    }

def get_default_chords_stat():
    default_chords_stat = {
        "correct": 0,
        "incorrect": 0,
    }

    return {
        "Major": default_chords_stat,
        "Minor": default_chords_stat,
        "Diminished": default_chords_stat,
        "Augmented": default_chords_stat,
        "Major 6": default_chords_stat,
        "Minor 6": default_chords_stat,
        "Minor 7": default_chords_stat,
        "Major 7": default_chords_stat,
        "Dominant 7": default_chords_stat,
        "Minor 7b5": default_chords_stat,
        "Diminished 7": default_chords_stat,
        "7 sus4": default_chords_stat,
    }
