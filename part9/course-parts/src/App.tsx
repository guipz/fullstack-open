import "./App.css";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

interface CoursePartBasic extends CoursePartBase {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: "background";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header text={courseName} />
      <Content courseParts={courseParts} />
      <TotalExercises total={totalExercises} />
    </div>
  );
};

const Header = ({ text }: { text: string }) => {
  return <h2>{text}</h2>;
};

const TotalExercises = ({ total }: { total: number }) => {
  return <p>Number of exercises {total}</p>;
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return courseParts.map((part) => <Part coursePart={part} />);
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  return (
    <>
      <h3>
        {coursePart.name} {coursePart.exerciseCount}
      </h3>
      {"description" in coursePart && <p>{coursePart.description}</p>}
      {"groupProjectCount" in coursePart && (
        <p>Project exercises: {coursePart.groupProjectCount}</p>
      )}
      {"backgroundMaterial" in coursePart && (
        <p>submit to: {coursePart.backgroundMaterial}</p>
      )}
      {"requirements" in coursePart && (
        <p>Requirements: {coursePart.requirements.join(", ")}</p>
      )}
    </>
  );
};

export default App;
