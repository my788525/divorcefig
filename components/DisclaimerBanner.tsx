// Visible disclaimer banner shown on every page (YMYL compliance).
export default function DisclaimerBanner() {
  return (
    <div className="disclaimer-banner" role="note" aria-label="Legal disclaimer">
      <span className="db-icon" aria-hidden="true">⚠</span>
      <span>
        <strong>This site provides general information only and is not legal advice.</strong>{' '}
        Consult a licensed attorney in your state.
      </span>
    </div>
  );
}
