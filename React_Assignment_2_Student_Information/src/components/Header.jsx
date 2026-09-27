function Header() {
  return (
    <header className="site-header">
      <div className="brand-lockup">
        <span className="brand-mark" aria-hidden="true">C</span>
        <div>
          <div className="brand-name">Campus</div>
          <div className="brand-caption">STUDENT DIRECTORY</div>
        </div>
      </div>
      <div className="semester-status"><span className="status-dot" /> Spring semester</div>
    </header>
  );
}

export default Header;