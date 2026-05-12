import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import GithubActivity from "./components/sections/GithubActivity";
import IntroSection from "./components/sections/IntroSection";
import Skill from "./components/sections/Skill";
import WorkExperience from "./components/sections/WorkExperience";


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