import { useRef } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import TechIcon from './TechIcon'
import styles from './Projects.module.css'

const projects = [
  {
    name: 'pilotfish — Packet Analyzer from Scratch',
    badge: 'In Progress',
    description: 'Wireshark-style packet analyzer for macOS written from scratch in Python, with no packet libraries: live capture runs through a hand-written ctypes binding to libpcap (or straight from /dev/bpf), and every file reader and protocol decoder is standard-library code. Capture filters compile to BPF and run in the kernel, with a custom BPF interpreter applying the same filters to saved pcap/pcapng files. Decodes 442 fields under Wireshark\'s own field names across Ethernet, IPv4/IPv6, ICMP, TCP/UDP, DNS, DHCP, HTTP, TLS (JA3/JA3S fingerprints), and SSH (HASSH), including Wireshark\'s TCP retransmission, out-of-order, and duplicate-ACK analysis. Verified field by field against tshark output on ~47,000 values, and fuzzed with Hypothesis so a malformed packet is flagged instead of crashing the decoder. Building next: stream reassembly, then a PySide6 desktop GUI.',
    tags: ['Python', 'libpcap', 'ctypes', 'BPF', 'TCP/IP', 'Hypothesis'],
    github: 'https://github.com/abdeltaehass/WireShark_Replica',
    live: null,
  },
  {
    name: 'APEX — Arrhythmia Pattern Explainer',
    description: 'End-to-end ECG decision-support system classifying 71 diagnostic categories, hitting 0.920 macro-AUROC on PTB-XL\'s held-out test split — matching published benchmarks with a compact 1D CNN, served via FastAPI at 6 ms inference. Engineered a reliability layer that flags the model\'s own untrustworthy output: per-lead Grad-CAM grounding plus four consistency and confidence checks, documented in a Hugging Face model card with a measured sex-performance disparity (0.925 vs 0.906 AUROC). Reduced Expected Calibration Error from 0.079 to 0.002 (97%) via per-label vector scaling with AUROC unchanged, cutting spurious findings 93% (5.09 → 0.35 per record).',
    tags: ['Python', 'PyTorch', 'FastAPI', '1D CNN', 'Grad-CAM', 'Hugging Face'],
    github: 'https://github.com/abdeltaehass/apex-arrhythmia-explainer',
    live: null,
  },
  {
    name: 'Al-Manar — Production iOS App',
    description: 'Shipped a production iOS application to the App Store, owning the full software lifecycle from UI/UX design through automated distribution via Xcode Cloud CI/CD. Built a custom background audio framework extending BaseAudioHandler for uninterrupted playback with system-level media controls, persistent state, and optimized memory handling across long sessions. Integrated the Google Places API with Haversine geospatial calculations to deliver GPS-accurate prayer times and nearby masjid discovery, localized for a global user base across 9 languages.',
    tags: ['Flutter', 'Dart', 'iOS', 'Xcode Cloud', 'Google Places API', 'CI/CD'],
    github: 'https://github.com/abdeltaehass/Fajr',
    live: 'https://apps.apple.com/us/app/al-manar/id6759625182',
  },
  {
    name: 'SENTRY — Vision-Language Incident Report Generator',
    description: 'LoRA-adapted vision-language reporting pipeline that generates security-incident reports from camera frames, shipped as a production FastAPI service with Docker, API-key authentication, rate limiting, GitHub Actions CI/CD, and 143 passing tests. Evaluated 10,000 manually reviewed outputs and reduced ungrounded claims by 35% through systematic hallucination measurement and reliability-focused iteration, with per-sentence Grad-CAM grounding that visualizes which pixels drove each generated claim.',
    tags: ['Python', 'PyTorch', 'FastAPI', 'LoRA', 'Docker', 'CI/CD'],
    github: 'https://github.com/abdeltaehass/SENTRY',
    live: null,
  },
  {
    name: 'AutoApply',
    description: 'Full-stack job-application toolkit that scrapes CalCareers (and external boards), calls the Claude API to generate tailored resumes, cover letters, and SOQs per posting, scores fit on a 0–100 scale, and tracks every application through a local web dashboard — with a human-in-the-loop review step.',
    tags: ['Python', 'Claude API', 'Web Scraping', 'Flask'],
    github: 'https://github.com/abdeltaehass/AutoApply',
    live: null,
  },
  {
    name: 'S.A.I.N.T. — Network Intrusion Detection System',
    description: 'Anomaly detection reasoning engine for network threats, reaching 89% accuracy on NSL-KDD (125K+ samples) via feature engineering across 41 traffic-flow features (protocol stats, TCP flag distributions, temporal patterns). Low-latency inference agent built with Flask + Redis + Plotly, processing 50–100 network connections/sec with an interactive agent-in-the-loop dashboard for analyst review.',
    tags: ['Python', 'PyTorch', 'Flask', 'Redis', 'NumPy'],
    github: 'https://github.com/abdeltaehass/S.A.I.N.T.',
    live: null,
  },
  {
    name: 'StockPulse — Autonomous Stock & Crypto Monitoring Platform',
    description: 'Full-stack autonomous trading monitor integrating 2 live market APIs (Alpaca equities, Binance crypto) with real-time crash detection, ML-based price prediction, and unified portfolio tracking across both asset classes. Multi-agent alert pipeline with Telegram notifications and a job scheduler enables 24/7 market surveillance and automated daily reporting. Containerized with Docker for sub-second live model inference.',
    tags: ['Python', 'Flask', 'Docker', 'Alpaca API', 'Binance API', 'Telegram'],
    github: 'https://github.com/abdeltaehass/stockpulse',
    live: 'http://138.2.225.107:8080',
  },
  {
    name: 'PingVault — Network Observability Agent',
    description: 'Production-grade network monitoring tool spanning 3 protocols (ICMP ping, SNMP polling, TCP/UDP port health checks) with agent-based metrics collection and a real-time HTML observability dashboard. Modular architecture with Alembic database migrations and structured config management — mirroring enterprise SRE tooling patterns for scalability and maintainability.',
    tags: ['Python', 'ICMP', 'SNMP', 'PostgreSQL', 'Alembic'],
    github: 'https://github.com/abdeltaehass/PingVault',
    live: null,
  },
  {
    name: 'GovCon',
    description: 'A web platform that helps government contractors stay organized — tracking contracts, deadlines, and documentation in one place.',
    tags: ['Python', 'HTML', 'CSS'],
    github: 'https://github.com/abdeltaehass/GovCon',
    live: 'https://abdeltaehass.pythonanywhere.com/bids',
  },
]

function ProjectCard({ project }) {
  const cardRef = useRef(null)

  const handleMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-3px)`
  }

  const handleLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = ''
  }

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className={styles.cardTop}>
        {project.badge ? (
          <span className={styles.badge}>{project.badge}</span>
        ) : (
          <svg className={styles.folderIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v8.25A2.25 2.25 0 004.5 16.5h15a2.25 2.25 0 002.25-2.25V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>
        )}
        <div className={styles.cardLinks}>
          {project.paper && (
            <a href={project.paper} target="_blank" rel="noopener noreferrer" title="Paper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </a>
          )}
          {project.dataset && (
            <a href={project.dataset} target="_blank" rel="noopener noreferrer" title="Dataset">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <ellipse cx="12" cy="5" rx="8" ry="2.5" />
                <path strokeLinecap="round" d="M4 5v6c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5V5M4 11v6c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5v-6" />
              </svg>
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" title="Live demo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" title="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}
        </div>
      </div>
      <h3 className={styles.projectName}>{project.name}</h3>
      <p className={styles.projectDesc}>{project.description}</p>
      <div className={styles.tags}>
        {project.tags.map(t => <TechIcon key={t} label={t} />)}
      </div>
    </div>
  )
}

export default function Projects({ embedded = false }) {
  const ref = useScrollReveal()

  const content = (
    <>
      <div className={styles.grid}>
        {projects.map(p => <ProjectCard key={p.name} project={p} />)}
      </div>
      <div className={styles.more}>
        <a
          href="https://github.com/abdeltaehass"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.moreLink}
        >
          See more on GitHub ↗
        </a>
      </div>
    </>
  )

  if (embedded) return content

  return (
    <section id="projects">
      <div className={`container reveal`} ref={ref}>
        <p className="section-label">Selected Work</p>
        <h2 className="section-title">Projects.</h2>
        <p className="section-subtitle">
          A selection of recent work — autonomous AI agents, data pipelines,
          and production mobile apps.
        </p>
        {content}
      </div>
    </section>
  )
}
