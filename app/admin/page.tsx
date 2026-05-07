export default function Page() {
  const profile = {
    skills: [
      { id: 1, name: "React", percent: 80 },
      { id: 2, name: "TypeScript", percent: 70 },
      { id: 3, name: "PHP", percent: 75 },
    ],
  };

  return (
    <section className="about-section">
      {profile && (
        <div className="about-container">
          <div className="about-header">
            <div className="skills-header">
              <h1>About Me</h1>
            </div>

            <h2 className="about-role">Full-stack Developer Intern</h2>

            <p className="about-description">
              Final-year IT student at Passerelles Numériques Vietnam with a
              strong foundation in Full-stack Web Development.
            </p>
          </div>

          <div className="about-content">
            <div className="about-image-wrapper">
              <div className="about-image-box">
                <img
                  src=""
                  alt="profile"
                  className="about-image"
                />
              </div>
            </div>

            <div className="about-info">
              <div>
                <h2 className="about-title">
                  Transforming Ideas into Digital Reality
                </h2>

                <p className="about-text">
                  I use <span>React</span>, <span>TypeScript</span>,{" "}
                  <span>PHP</span> to build modern web applications.
                </p>
              </div>

              <div>
                <h3 className="section-title">Technical Proficiency</h3>

                {profile.skills.map((skill) => (
                  <div key={skill.id} className="skill-item">
                    <div className="skill-label">
                      <span>{skill.name}</span>
                      <span>{skill.percent}%</span>
                    </div>

                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ width: skill.percent + "%" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="section-title">What I Do</h3>

                <p className="about-subtext">
                  I develop frontend with React, backend with Laravel, and
                  design databases.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
