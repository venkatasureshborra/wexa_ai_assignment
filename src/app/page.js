export default function HomePage() {
  return (
    <div className="container">
      {/* Header */}
      <header>
        <h1>Venkata Suresh</h1>
        <p className="subtitle">Cloud & DevOps Engineer</p>
        <p className="contact">
          Hyderabad,, TG, India •{" "}
          <a href="mailto:borrasuresh23@gmail.com">Mail</a>   {" "}
          <a href="https://www.linkedin.com/in/venkatasureshborra" target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </header>

      {/* Summary */}
      <section>
        <h2>Professional Summary</h2>
        <p>
          Cloud Engineer Trainee with hands-on experience in server management, cloud services, and DevOps tools.
          Skilled in troubleshooting, scaling, and monitoring servers, with practical knowledge in Docker, Kubernetes,
          and cloud infrastructure management. Eager to contribute to innovative DevOps and cloud projects.
        </p>
      </section>

      {/* Experience */}
      <section>
        <h2>Professional Experience</h2>
        <div className="experience">
          <h3>Cloud Engineer Trainee – TekkonnectPro IT Servers</h3>
          <span className="date">Dec 2023 - Dec 2024</span>
          <ul>
            <li>Troubleshot server issues and scaled up servers to meet business needs.</li>
            <li>Maintained licenses and resolved issues with Microsoft 365 services.</li>
            <li>Developed POCs to meet client requirements.</li>
            <li>Monitored web, application, and infrastructure servers using Site24x7.</li>
            <li>Collaborated with the team to optimize server performance and uptime.</li>
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2>DevOps & Cloud Skills</h2>
        <div className="skills">
          <div><strong>Containerization & Orchestration:</strong> Docker, Kubernetes</div>
          <div><strong>CI/CD & Automation:</strong> GitHub Actions, basic pipeline implementation</div>
          <div><strong>Cloud Platforms:</strong> Azure, AWS (hands-on)</div>
          <div><strong>Monitoring & Logging:</strong> Site24x7, basic experience with cloud monitoring tools</div>
          <div><strong>Scripting & Tools:</strong> Shell scripting, Linux administration</div>
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2>Projects / Practical Experience</h2>
        <ul>
          <li>Containerized applications using Docker and deployed on Kubernetes clusters.</li>
          <li>Built basic CI/CD pipelines for automated deployments.</li>
          <li>Hands-on experimentation with cloud infrastructure scaling and monitoring.</li>
        </ul>
      </section>

      {/* Education */}
      <section>
        <h2>Education</h2>
        <p>[B.Tech, CSE], [VElTech University], [2023]</p>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Venkata Suresh | Cloud & DevOps Engineer</p>
      </footer>
    </div>
  );
}
