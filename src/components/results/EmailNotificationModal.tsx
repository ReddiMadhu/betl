import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, FileDown } from 'lucide-react';
import type { Recommendation } from '../../data/rationalizationData';

/* ─────────────────────────────────────────────────────────
 * EmailNotificationModal — editable email draft with PDF download
 *
 * Matches the reference BI Compass email modal pattern:
 * - Pre-filled To/Subject/Body
 * - Download PDF (via browser print)
 * - Send Email → toast callback
 * ───────────────────────────────────────────────────────── */

interface EmailDraft {
  to: string;
  subject: string;
  body: string;
  type: 'merge' | 'decommission';
}

interface Props {
  rec: Recommendation;
  type: 'merge' | 'decommission';
  onClose: () => void;
  onSend: (message: string) => void;
}

function buildEmailDraft(rec: Recommendation, type: 'merge' | 'decommission'): EmailDraft {
  if (type === 'merge') {
    return {
      to: 'governance-team@company.com',
      subject: `BI Rationalisation: Merge Recommendation — ${rec.title}`,
      body: `Dear Team,\n\nBased on the Rationalisation exercise, the asset '${rec.assets[0]?.name}' (${rec.assets[0]?.technology}) is recommended to be merged into '${rec.mergeTarget || rec.assets[1]?.name}' to reduce semantic duplication.\n\nRationale:\n- ${rec.rationale}\n\nOverlap: ${rec.overlapPct ?? 'N/A'}%\nBusiness Area: ${rec.businessArea}\nOwner: ${rec.owner || 'N/A'}\n\nAction Required:\n${rec.action}\n\nFor further details please refer to the attached rationalisation report.\n\nBest regards,\nBI Governance Steward`,
      type: 'merge',
    };
  }
  return {
    to: 'governance-team@company.com',
    subject: `BI Rationalisation: Decommission Recommendation — ${rec.title}`,
    body: `Dear Team,\n\nBased on the Rationalisation exercise, the asset '${rec.assets[0]?.name}' (${rec.assets[0]?.technology}) is recommended to be decommissioned.\n\nRationale:\n- ${rec.rationale}\n\nBusiness Area: ${rec.businessArea}\nOwner: ${rec.owner || 'N/A'}\nLast Viewed: ${rec.lastViewed || 'N/A'}\n\nAction Required:\n${rec.action}\n\nFor further details please refer to the attached rationalisation report.\n\nBest regards,\nBI Governance Steward`,
    type: 'decommission',
  };
}

function downloadPDF(rec: Recommendation, type: 'merge' | 'decommission') {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `<!DOCTYPE html>
<html><head><title>BI Rationalisation Report — ${rec.title}</title>
<style>
  body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; max-width: 800px; margin: 0 auto; }
  h1 { font-size: 22px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; color: #0f172a; }
  h2 { font-size: 16px; color: #334155; margin-top: 28px; }
  .meta { font-size: 12px; color: #64748b; margin-bottom: 20px; }
  .section { margin-bottom: 20px; }
  .label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
  .value { font-size: 14px; color: #334155; margin-top: 4px; }
  ul { padding-left: 20px; }
  li { font-size: 13px; color: #475569; margin-bottom: 4px; }
  .alert { background: #fef2f2; border: 1px solid #fecaca; padding: 12px; border-radius: 8px; font-size: 13px; color: #991b1b; margin-top: 16px; }
  @media print { body { padding: 20px; } }
</style></head><body>
<h1>BI Governance Rationalisation Report</h1>
<p class="meta">Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>

<h2>1. Recommendation Action</h2>
<div class="section">
  <div class="label">Dashboard / Asset Name</div>
  <div class="value">${rec.assets[0]?.name} (${rec.assets[0]?.technology})</div>
</div>
<div class="section">
  <div class="label">Action</div>
  <div class="value">${type === 'merge' ? `Merge into ${rec.mergeTarget || rec.assets[1]?.name}` : 'Decommission'}</div>
</div>

<h2>2. Governance Rationale</h2>
<div class="section">
  <div class="value">${rec.rationale}</div>
</div>

<h2>3. Affected Stakeholders</h2>
<div class="section">
  <div class="label">Owner</div>
  <div class="value">${rec.owner || 'N/A'}</div>
  <div class="label" style="margin-top:8px">User Groups</div>
  <div class="value">${rec.userGroups?.length ? rec.userGroups.join(', ') : 'No active user groups assigned'}</div>
</div>

<h2>4. KPIs & Data Lineage</h2>
<div class="section">
  <div class="label">Resolved KPIs</div>
  <ul>${(rec.kpis || []).map(k => `<li>${k}</li>`).join('') || '<li>No KPIs detected</li>'}</ul>
  <div class="label" style="margin-top:8px">Source Tables</div>
  <ul>${(rec.tables || []).map(t => `<li>${t}</li>`).join('') || '<li>No tables mapped</li>'}</ul>
</div>

${type === 'decommission' ? `<div class="alert"><strong>Governance Impact:</strong> This action will notify all active subscribers, disconnect datasource connections, and archive the metadata in the repository index.</div>` : ''}
</body></html>`;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => { printWindow.print(); }, 300);
}

export default function EmailNotificationModal({ rec, type, onClose, onSend }: Props) {
  const [draft, setDraft] = useState(() => buildEmailDraft(rec, type));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl border w-full max-w-2xl flex flex-col overflow-hidden"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-border-primary)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b shrink-0"
          style={{ borderColor: 'var(--color-border-primary)', backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          <h3 className="font-bold text-base flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <Sparkles size={16} style={{ color: '#60A5FA' }} /> BI Rationalisation Recommendation Email
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg cursor-pointer transition-colors"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Email form */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>To</label>
            <input
              type="text"
              value={draft.to}
              onChange={(e) => setDraft({ ...draft, to: e.target.value })}
              className="w-full rounded-lg px-3 py-2 text-sm outline-none border transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Subject</label>
            <input
              type="text"
              value={draft.subject}
              onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
              className="w-full rounded-lg px-3 py-2 text-sm outline-none border transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Body</label>
            <textarea
              rows={10}
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              className="w-full rounded-lg px-3 py-2 text-xs outline-none border transition-colors font-mono resize-none leading-relaxed"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-6 py-4 border-t shrink-0"
          style={{ borderColor: 'var(--color-border-primary)', backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          <button
            type="button"
            onClick={() => downloadPDF(rec, type)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors border"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border-primary)',
              color: '#60A5FA',
            }}
          >
            <FileDown size={14} /> Download Attached PDF
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors border"
              style={{ borderColor: 'var(--color-border-primary)', color: 'var(--color-text-secondary)' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                const msg = type === 'merge'
                  ? 'Merger email notification successfully sent!'
                  : 'Decommission email notice sent to team!';
                onSend(msg);
              }}
              className="px-5 py-2 rounded-lg text-sm font-bold cursor-pointer transition-all text-white"
              style={{ backgroundColor: '#3B82F6', boxShadow: '0 4px 12px rgba(59,130,246,0.3)', border: 'none' }}
            >
              Send Email
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
