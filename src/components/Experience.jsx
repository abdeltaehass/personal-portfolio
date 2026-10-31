import useScrollReveal from '../hooks/useScrollReveal'
import styles from './Experience.module.css'

const jobs = [
  {
    role: 'Storage Architect',
    company: 'California Department of Technology',
    period: 'Oct 2026 — Present',
    points: [
      'Support the architecture, operation, and reliability of enterprise zSystems storage infrastructure serving mission-critical California state applications.',
      'Plan, install, test, monitor, tune, and maintain storage hardware and software across z/OS environments.',
      'Support DASD, virtual tape, cloud storage, and SAN technologies with an emphasis on availability, performance, capacity, and operational resilience.',
      'Troubleshoot complex infrastructure incidents, perform root-cause analysis, and recommend long-term platform improvements.',
      'Contribute to storage architecture, technical standards, capacity planning, system upgrades, and disaster-recovery readiness.',
      'Collaborate with infrastructure teams, technical leadership, vendors, and state customers to translate operational requirements into reliable storage solutions.',
      'Produce technical documentation and communicate system risks, recommendations, and implementation plans to technical and nontechnical stakeholders.',
    ],
    tags: ['z/OS', 'zSystems', 'DASD', 'Virtual Tape', 'SAN', 'Cloud Storage', 'Storage Architecture', 'Capacity Planning', 'Disaster Recovery', 'Root-Cause Analysis'],
  },
  {
    role: 'AI Research Engineer',
    company: 'Medical AI Research',
    period: 'Aug 2025 — Present',
    points: [
      'Co-authored SpineFairBench, a counterfactual VLM evaluation suite auditing demographic bias across 7,996 paired spinal radiographs and a 9-model panel.',
      'Co-authored MedInsider, an LLM-agent evaluation suite spanning 840 clinical scenarios (420 matched pairs), 5 regulatory failure families, and 8 incentive conditions — with deterministic simulated-EHR tooling, action logging, and audit pipelines across a 9-model panel.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'California Department of Health Care Services',
    period: 'May 2025 — Sep 2026',
    points: [
      'Streamlined production monitoring, log processing, and reporting workflows — reduced manual operational work 40% and cut mean time to detection 50%.',
      'Reworked backend integration, validation, and alerting workflows, accelerating root-cause analysis 35% and reducing incident resolution time 30%.',
      'Improved real-time alerting accuracy 20% through automated log-processing and operational telemetry pipelines.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'District Hut',
    period: 'May 2024 — Jul 2025',
    points: [
      'Scaled distributed data pipelines processing 3 TB/week across cloud infrastructure, improving throughput and reliability under production load.',
      'Revamped SQL data-integrity checks — prevented 5 critical production data-corruption issues and automated 75% of validation tasks at 100% test coverage.',
    ],
  },
  {
    role: 'Student Assistant — IT Help Desk',
    company: 'CalHFA',
    period: 'Jun 2022 — May 2024',
    points: [
      'Resolved 50+ tickets/week across a 200-user environment with 95% first-contact resolution.',
    ],
  },
  {
    role: 'Real Estate Agent',
    company: 'Lyon Real Estate',
    period: 'Aug 2021 — Mar 2024',
    points: [
      'Licensed agent supporting residential sales — strong client-facing communication and transaction coordination.',
    ],
  },
  {
    role: 'Lifeguard / Pool Manager',
    company: 'Southgate',
    period: 'May 2019 — Aug 2022',
    points: [
      'Managed pool operations, supervised lifeguards, and led safety standards adherence in a fast-paced environment.',
    ],
  },
  {
    role: 'Soccer Referee',
    company: 'Davis',
    period: 'Jul 2016 — Jul 2019',
    points: [
      'Officiated youth matches — early conflict resolution and decision-making experience.',
    ],
  },
]

export default function Experience({ embedded = false }) {
  const ref = useScrollReveal()

  const content = (
    <ol className={styles.timeline}>
      {jobs.map((j, i) => (
        <li key={i} className={styles.item}>
          <span className={styles.dot} aria-hidden="true" />
          <div className={styles.content}>
            <div className={styles.period}>{j.period}</div>
            <h3 className={styles.role}>
              {j.role}
              <span className={styles.companySep}> · </span>
              <span className={styles.company}>{j.company}</span>
            </h3>
            <ul className={styles.points}>
              {j.points.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
            {j.tags && (
              <div className={styles.tags}>
                {j.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  )

  if (embedded) return content

  return (
    <section id="experience">
      <div className={`container reveal`} ref={ref}>
        <p className="section-label">Experience</p>
        <h2 className="section-title">Where I've worked.</h2>
        {content}
      </div>
    </section>
  )
}
