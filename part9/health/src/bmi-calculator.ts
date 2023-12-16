export interface CalculateBMIValues {
  heightInMeters: number;
  weightInKilos: number;
}

export const calculateBmi = ({
  heightInMeters,
  weightInKilos,
}: CalculateBMIValues): string => {
  const bmi: number = weightInKilos / heightInMeters ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

const parseArgumentsBMI = (args: string[]): CalculateBMIValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightInMeters: Number(args[2]),
      weightInKilos: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};


if (process.argv[1].includes("bmi-calculator")) {
  try {
    const args: CalculateBMIValues = parseArgumentsBMI(process.argv);
    console.log(`Your BMI is classified as ${calculateBmi(args)}`);
  } catch (error) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}