import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import styles from './OpenSource.module.css'

const contributions = [
  {
    repo: 'google/mcp-security',
    lang: 'Python',
    status: 'merged',
    title: 'Fix SecOps rule detection arguments',
    description: 'MCP Security is Google\'s toolkit that lets AI assistants query Chronicle, its security operations platform. A function that fetched detections for a security rule passed its arguments in the wrong order, so a filter like “only alerting detections” landed in a date field and crashed the request. I corrected the call, exposed the time-range options it had been hiding, and added regression tests.',
    pr: 'https://github.com/google/mcp-security/pull/283',
    prNumber: '#283',
    additions: 86,
    deletions: 3,
    files: 2,
    commits: 1,
    merged: 'Aug 2026',
  },
  {
    repo: 'google/gvisor',
    lang: 'Go',
    status: 'merged',
    title: 'docs: select go branch for Go consumers',
    description: 'gVisor is Google\'s sandbox for safely running untrusted code, used in Google Cloud. Developers installing it as a Go library kept hitting a confusing build error, so I tracked down the cause and documented the correct install path in the README and setup guide.',
    pr: 'https://github.com/google/gvisor/pull/14144',
    prNumber: '#14144',
    files: 2,
    touched: ['README.md', 'quickstart.md'],
    merged: 'Aug 2026',
  },
  {
    repo: 'NVIDIA/cccl',
    lang: 'CUDA C++ / Python',
    title: '[libcu++] Improve cuda::mr::memory_resource debugger pretty-printers',
    description: 'CCCL is NVIDIA\'s core CUDA library, used by GPU developers worldwide. Debuggers showed almost no useful detail when inspecting GPU memory objects, so I rewrote that display logic and added tests covering 12 scenarios against real GDB and LLDB output.',
    pr: 'https://github.com/NVIDIA/cccl/pull/10790',
    prNumber: '#10790',
    additions: 319,
    deletions: 30,
    files: 6,
    commits: 6,
    merged: 'Aug 2026',
  },
  {
    repo: 'NVIDIA/cccl',
    lang: 'CUDA C++',
    title: '[cudax] Use _CCCL_NO_UNIQUE_ADDRESS instead of [[no_unique_address]]',
    description: 'A memory-saving optimization in NVIDIA\'s CUDA headers was written with syntax some compilers ignore, so it quietly did nothing on those platforms. I replaced it with the library\'s own portable macro so it applies everywhere.',
    pr: 'https://github.com/NVIDIA/cccl/pull/10881',
    prNumber: '#10881',
    files: 4,
    touched: ['execution_policy.cuh', 'parallel_for_scope.cuh', 'run_once.cuh', 'optionally_static.cuh'],
    merged: 'Aug 2026',
  },
  {
    repo: 'NVIDIA/cccl',
    lang: 'CUDA C++',
    status: 'approved',
    title: 'Error early when the CUDA backend is used without a CUDA compiler',
    description: 'Including a Thrust header without a CUDA compiler produced roughly 1,300 unrelated errors, none of which named the actual cause. I added a check that reports the real problem in one line and names the ways out, placed so it fires before the downstream noise begins. Review narrowed it further, so a host-only build still compiles as long as the CUDA toolkit headers are present.',
    pr: 'https://github.com/NVIDIA/cccl/pull/11059',
    prNumber: '#11059',
    additions: 9,
    deletions: 0,
    files: 1,
    commits: 5,
    touched: ['config.h'],
    merged: 'Sep 2026',
  },
  {
    repo: 'uber/NullAway',
    lang: 'Java',
    title: 'Migrate InitializationTests to addSourceLines',
    description: 'NullAway is Uber\'s tool that catches null-pointer crashes in Java before code ships. Its tests pulled sample code from scattered files, so I moved that code inline next to the tests that use it and deleted the obsolete files — same coverage, far easier to maintain.',
    pr: 'https://github.com/uber/NullAway/pull/1694',
    prNumber: '#1694',
    additions: 1020,
    deletions: 1049,
    files: 5,
    commits: 3,
    merged: 'Aug 2026',
  },
  {
    repo: 'uber/NullAway',
    lang: 'Java',
    title: 'Migrate FrameworkTests to addSourceLines',
    description: 'A follow-up applying the same cleanup to NullAway\'s largest test file, which covers its Android, RxJava, Java Streams, and Lombok support. I brought 8 fixture files\' worth of sample code inline so each test reads on its own, without changing what the suite verifies.',
    pr: 'https://github.com/uber/NullAway/pull/1712',
    prNumber: '#1712',
    additions: 1375,
    deletions: 1526,
    files: 9,
    commits: 2,
    merged: 'Aug 2026',
  },
  {
    repo: 'uber/NullAway',
    lang: 'Java',
    title: 'Migrate CoreTests to addSourceLines',
    description: 'The third and largest file in the same cleanup. Beyond moving the sample code inline, I found that one shared fixture could not simply be deleted: other test classes were quietly compiling it off the classpath by name, so removing it broke twelve of their tests. At the maintainer\'s suggestion I hoisted it into a shared constants class and pointed every consumer at it, which let the fixture directory be deleted entirely.',
    pr: 'https://github.com/uber/NullAway/pull/1765',
    prNumber: '#1765',
    additions: 2160,
    deletions: 2346,
    files: 14,
    commits: 3,
    merged: 'Sep 2026',
  },
  {
    repo: 'elastic/eui',
    lang: 'TypeScript / React',
    title: '[EuiQuickSelect] Migrate from class to function component',
    description: 'EUI is Elastic\'s design system, used throughout Kibana. I modernized the date picker\'s quick-select control from an older React pattern to current hooks, keeping its public API, behavior, and appearance identical so no product using it needs to change.',
    pr: 'https://github.com/elastic/eui/pull/9913',
    prNumber: '#9913',
    additions: 196,
    deletions: 196,
    files: 3,
    commits: 4,
    merged: 'Aug 2026',
  },
  {
    repo: 'elastic/eui',
    lang: 'TypeScript / React',
    title: '[EuiDataGridColumnResizer] Migrate from class to function component',
    description: 'A second EUI migration, this one with a wrinkle: the data grid\'s column-resize handle attaches its drag listeners to the browser window on mouse down, and the very same functions have to be there to unhook them on release. I moved it to hooks while preserving that, added cleanup on unmount, and rewrote the tests to drive real mouse events rather than calling the component\'s methods directly.',
    pr: 'https://github.com/elastic/eui/pull/9971',
    prNumber: '#9971',
    additions: 185,
    deletions: 161,
    files: 4,
    commits: 3,
    merged: 'Sep 2026',
  },
]

function MergeIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">
      <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM3.5 3.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.5 4.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
    </svg>
  )
}

function PullRequestIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">
      <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">
      <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm3.78-9.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018L6.75 9.19 5.28 7.72a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l2 2a.75.75 0 0 0 1.06 0Z" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L8.53 10.53a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" />
    </svg>
  )
}

const STATUSES = {
  merged: { label: 'Merged', icon: MergeIcon, cls: 'badgeMerged' },
  approved: { label: 'Approved', icon: CheckIcon, cls: 'badgeApproved' },
  open: { label: 'Open', icon: PullRequestIcon, cls: 'badgeOpen' },
}

function StatusBadge({ status = 'merged' }) {
  const { label, icon: Icon, cls } = STATUSES[status] ?? STATUSES.merged
  return (
    <span className={`${styles.badge} ${styles[cls]}`}>
      <Icon />
      {label}
    </span>
  )
}

// Five-block diff bar, GitHub-style: green blocks proportional to additions.
function DiffBar({ additions, deletions }) {
  const total = additions + deletions
  const greens = total === 0 ? 0 : Math.max(1, Math.min(5, Math.round((additions / total) * 5)))
  return (
    <span className={styles.diffBar} aria-hidden="true">
      {[0, 1, 2, 3, 4].map(i => (
        <span
          key={i}
          className={`${styles.diffBlock} ${i < greens ? styles.diffBlockAdd : styles.diffBlockDel}`}
        />
      ))}
    </span>
  )
}

function ContributionRow({ item }) {
  return (
    <a
      href={item.pr}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.row}
    >
      <div className={styles.header}>
        <StatusBadge status={item.status} />
        <span className={styles.repo}>
          {item.repo}
          <span className={styles.prNum}> {item.prNumber}</span>
        </span>
        <span className={styles.date}>{item.merged}</span>
      </div>

      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.description}>{item.description}</p>

      <div className={styles.stats}>
        {item.touched ? (
          <>
            <span className={styles.statMeta}>{item.files} {item.files === 1 ? 'file' : 'files'}</span>
            <span className={styles.fileList}>
              {item.touched.map(f => (
                <span key={f} className={styles.file}>{f}</span>
              ))}
            </span>
          </>
        ) : (
          <>
            <span className={styles.additions}>+{item.additions.toLocaleString()}</span>
            <span className={styles.deletions}>−{item.deletions.toLocaleString()}</span>
            <DiffBar additions={item.additions} deletions={item.deletions} />
            <span className={styles.statMeta}>
              {item.files} {item.files === 1 ? 'file' : 'files'} ·{' '}
              {item.commits} {item.commits === 1 ? 'commit' : 'commits'}
            </span>
          </>
        )}
        <span className={styles.lang}>{item.lang}</span>
      </div>
    </a>
  )
}

const ORG_NAMES = {
  google: 'Google',
  NVIDIA: 'NVIDIA',
  uber: 'Uber',
  elastic: 'Elastic',
}

// Group contributions by organisation, preserving first-appearance order.
const groups = (() => {
  const byOrg = new Map()
  for (const item of contributions) {
    const org = item.repo.split('/')[0]
    if (!byOrg.has(org)) byOrg.set(org, [])
    byOrg.get(org).push(item)
  }
  return [...byOrg.entries()].map(([org, prs]) => ({
    org,
    name: ORG_NAMES[org] ?? org,
    repos: [...new Set(prs.map(p => p.repo.split('/')[1]))],
    merged: prs.filter(p => (p.status ?? 'merged') === 'merged').length,
    approved: prs.filter(p => p.status === 'approved').length,
    prs,
  }))
})()

function OrgGroup({ group, open, onToggle }) {
  const panelId = `os-panel-${group.org}`
  const btnId = `os-btn-${group.org}`

  return (
    <div className={`${styles.group} ${open ? styles.groupOpen : ''}`}>
      <button
        id={btnId}
        type="button"
        className={styles.groupBtn}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className={styles.orgName}>{group.name}</span>
        <span className={styles.orgRepos}>{group.repos.join(' · ')}</span>
        <span className={styles.orgMeta}>
          <span className={styles.count}>
            {group.prs.length} {group.prs.length === 1 ? 'PR' : 'PRs'}
          </span>
          {group.merged > 0 && (
            <span className={`${styles.summaryPill} ${styles.summaryMerged}`}>
              <MergeIcon />
              {group.merged} merged
            </span>
          )}
          {group.approved > 0 && (
            <span className={`${styles.summaryPill} ${styles.summaryApproved}`}>
              <CheckIcon />
              {group.approved} approved
            </span>
          )}
          <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>
            <ChevronIcon />
          </span>
        </span>
      </button>

      {open && (
        <div id={panelId} role="region" aria-labelledby={btnId} className={styles.panel}>
          {group.prs.map(c => <ContributionRow key={c.pr} item={c} />)}
        </div>
      )}
    </div>
  )
}

export default function OpenSource({ embedded = false }) {
  const ref = useScrollReveal()
  const [openOrgs, setOpenOrgs] = useState(() => new Set([groups[0].org]))

  const toggle = org => setOpenOrgs(prev => {
    const next = new Set(prev)
    next.has(org) ? next.delete(org) : next.add(org)
    return next
  })

  const content = (
    <div className={styles.groups}>
      {groups.map(g => (
        <OrgGroup
          key={g.org}
          group={g}
          open={openOrgs.has(g.org)}
          onToggle={() => toggle(g.org)}
        />
      ))}
    </div>
  )

  if (embedded) return content

  return (
    <section id="open-source">
      <div className={`container reveal`} ref={ref}>
        <p className="section-label">Open Source</p>
        <h2 className="section-title">Contributions.</h2>
        {content}
      </div>
    </section>
  )
}
