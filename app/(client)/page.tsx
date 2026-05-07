import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import GithubActivity from "../components/Github/GithubActivity";
import IntroSection from "../components/Home/IntroSection";
import WorkExperience from "../components/Home/WorkExperience";
import Skill from "../components/Skill/Skill";

export default function Home(){
  return(
    <>
      <IntroSection />
      <WorkExperience />
      <Skill/>
      <GithubActivity/>
      <About />
      <Contact />
    </>
  )
}