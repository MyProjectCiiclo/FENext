import {
  About,
  Contact,
  GithubActivity,
  IntroSection,
  ProjectList,
  Skill,
  WorkExperience,
  RatingSection,
  Education,
} from "./components/sections";

export default function Home() {
  return (
    <main>
      <IntroSection />
      <About />
      <Education />
      <WorkExperience />
      <Skill />
      <GithubActivity />
      <ProjectList />
      <RatingSection />
      <Contact />
    </main>
  );
}
