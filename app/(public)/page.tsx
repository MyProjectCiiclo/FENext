import {
  About,
  Contact,
  GithubActivity,
  IntroSection,
  Skill,
  WorkExperience,
} from "./components/sections";

export default function Home() {
  return (
    <main>
      <IntroSection />
      <WorkExperience />
      <Skill />
      <GithubActivity />
      <About />
      <Contact />
    </main>
  );
}
