interface RatingResult {
  rating: number;
  ratingDescription: string;
}

const getRating = (days: number[]): RatingResult => {
  const rating: number =
    3 - (days.filter(d => d === 0).length / days.length) * 3;
  let ratingDescription: string;
  if (rating <= 1.5) {
    ratingDescription = "You're taking way too much rest days.";
  } else if (rating <= 2.0) {
    ratingDescription = "You should take rest days a litte less.";
  } else {
    ratingDescription = "You're doing great, keep it up!";
  }
  return {
    rating,
    ratingDescription,
  };
};

export interface CalculateExercisesResult {
  numberOfDays: number;
  numberOfTrainingDays: number;
  targetDailyAverage: number;
  calculatedDailyAverage: number;
  reachedGoal: boolean;
  rating: number;
  ratingDescription: string;
}

export interface CalculateExercisesValues {
  days: number[];
  targetDailyAverage: number;
}

export const calculateExercises = ({
  days,
  targetDailyAverage,
}: CalculateExercisesValues): CalculateExercisesResult => {
  const calculatedDailyAverage: number =
    days.reduce((sum, a) => sum + a) / days.length;
  return {
    numberOfDays: days.length,
    numberOfTrainingDays: days.filter(d => d !== 0).length,
    targetDailyAverage: targetDailyAverage,
    calculatedDailyAverage: calculatedDailyAverage,
    reachedGoal: calculatedDailyAverage >= targetDailyAverage,
    ...getRating(days),
  };
};

const parseArgumentsExercise = (args: string[]): CalculateExercisesValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (args.slice(2).find(a => isNaN(Number(a)))) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    days: args.slice(2, args.length - 1).map(n => Number(n)),
    targetDailyAverage: Number(args[args.length - 1]),
  };
};

if (process.argv[1].includes("exercise-calculator")) {
  try {
    const args: CalculateExercisesValues = parseArgumentsExercise(process.argv);
    console.log(`These are your results:`);
    console.log(calculateExercises(args));
  } catch (error) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
