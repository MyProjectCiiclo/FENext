import {
  About,
  Contact,
  GithubActivity,
  IntroSection,
  ProjectList,
  Skill,
  WorkExperience,
  RatingSection,
} from "./components/sections";

export default function Home() {
  return (
    <main>
      <IntroSection />
      <About />
      <WorkExperience />
      <Skill />
      <GithubActivity />
      <ProjectList />
      <RatingSection />
      <Contact />
    </main>
  );
}
