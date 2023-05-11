export const NOTES = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
];
  
export const DEFAULT_INTERVALS = [
    "Minor 2nd",
    "Major 2nd",
    "Minor 3rd",
    "Major 3rd",
    "Perfect 4th",
    "Tritone",
    "Perfect 5th",
    "Minor 6th",
    "Major 6th",
    "Minor 7th",
    "Major 7th",
    "Octave",
];

export const DEFAULT_INTERVALS_STAT_ASC_DESC = {
    'ascending': {
        "correct": 0, 
        "incorrect": 0,
    },
    'descending': {
        "correct": 0, 
        "incorrect": 0,
    },
    'harmonic': {
        "correct": 0, 
        "incorrect": 0,
    },
};

export const DEFAULT_INTERVALS_STAT = {
    "Minor 2nd": DEFAULT_INTERVALS_STAT_ASC_DESC,
    "Major 2nd": DEFAULT_INTERVALS_STAT_ASC_DESC,
    "Minor 3rd": DEFAULT_INTERVALS_STAT_ASC_DESC,
    "Major 3rd": DEFAULT_INTERVALS_STAT_ASC_DESC,
    "Perfect 4th": DEFAULT_INTERVALS_STAT_ASC_DESC,
    "Perfect 5th": DEFAULT_INTERVALS_STAT_ASC_DESC,
    "Tritone": DEFAULT_INTERVALS_STAT_ASC_DESC,
    "Minor 6th": DEFAULT_INTERVALS_STAT_ASC_DESC,
    "Major 6th": DEFAULT_INTERVALS_STAT_ASC_DESC,
    "Minor 7th": DEFAULT_INTERVALS_STAT_ASC_DESC,
    "Major 7th": DEFAULT_INTERVALS_STAT_ASC_DESC,
    "Octave": DEFAULT_INTERVALS_STAT_ASC_DESC,
};

export const NUMBER_TO_INTERVAL = {
    1: "Minor 2nd",
    2: "Major 2nd",
    3: "Minor 3rd",
    4: "Major 3rd",
    5: "Perfect 4th",
    6: "Tritone",
    7: "Perfect 5th",
    8: "Minor 6th",
    9: "Major 6th",
    10: "Minor 7th",
    11: "Major 7th",
    12: "Octave",
}

export const INTERVAL_TO_NUMBER = {
    "Minor 2nd": 1,
    "Major 2nd": 2,
    "Minor 3rd": 3,
    "Major 3rd": 4,
    "Perfect 4th": 5,
    "Tritone": 6,
    "Perfect 5th": 7,
    "Minor 6th": 8,
    "Major 6th": 9,
    "Minor 7th": 10,
    "Major 7th": 11,
    "Octave": 12,
};

export const DEFAULT_INTERVALS_OBJ = {
    "Minor 2nd": true,
    "Major 2nd": true,
    "Minor 3rd": true,
    "Major 3rd": true,
    "Perfect 4th": true,
    "Tritone": true,
    "Perfect 5th": true,
    "Minor 6th": true,
    "Major 6th": true,
    "Minor 7th": true,
    "Major 7th": true,
    "Octave": true,
}

export const CHORDS = [
    "Major", 
    "Minor",
]

export const updateStatsObject = (
    stats,
    interval,
    ascDescOrHarmonic,
    correctOrIncorrect
) => {
    return {
        ...stats,
        [interval]: {
            ...stats[interval],
            [ascDescOrHarmonic]: {
                ...stats[interval][ascDescOrHarmonic],
                [correctOrIncorrect]:
                    stats[interval][ascDescOrHarmonic][correctOrIncorrect] +
                    1,
            },
        },
    };
  };
  
  // Returns a random int, min-max inclusive
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomBool() {
    return Math.random() >= 0.5
}
  
// Returns the name of the musical interval between 2 Input notes (INTS)
export function getInterval(firstNote, secondNote) {
    return DEFAULT_INTERVALS[secondNote - firstNote - 1];
}

// Takes as input an int represending the 1st note of the interval
// Generates a random int from 0 to length of the current states intervals array
// Using random int, finds the number value that corresponds to the interval name
// The number is added to the input (1st note), and returned
export function generate2ndNote(noteInt, intervalsArray) {
    const randomIndex = getRandomInt(0, intervalsArray.length - 1)
    const randomInterval = intervalsArray[randomIndex]
    const intervalNumberValue = INTERVAL_TO_NUMBER[randomInterval]

    return (noteInt + intervalNumberValue)
}

  