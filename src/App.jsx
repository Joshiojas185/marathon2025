import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm.jsx';

function Home() {
  const [showStatus, setShowStatus] = useState(false);
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const bgUrl = (typeof window !== 'undefined' && window.localStorage.getItem('marathon_home_bg')) || '';

  const checkStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('https://codeup.in/dev/register/marathon/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, contact })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      setResult(json);
    } catch (err) {
      setResult({ error: 'Could not fetch status. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = () => {
    if (!result) return null;
    if (result.error) return <div className="status-msg error">{result.error}</div>;
    const s = (result.status || 'pending').toLowerCase();
    if (s === 'approved') return <div className="status-msg approved">You have been approved! 🎉</div>;
    if (s === 'rejected') return <div className="status-msg rejected">Sorry, your registration was rejected.</div>;
    return <div className="status-msg pending">Your registration is pending.</div>;
  };

  return (
    <div className="home-page" style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}>
      <div className="home-topbar">
        <button className="link-btn ghost" onClick={() => setShowStatus(true)}>Check Registration Status</button>
        <Link className="link-btn primary" to="/agrachetnamarathon2025">Go to Registration</Link>
      </div>
      <h1 className="home-title">Welcome</h1>

      {showStatus && (
        <div className="modal-overlay" onClick={() => setShowStatus(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Check Status</h3>
            <form onSubmit={checkStatus} className="status-form">
              <label>
                Full Name
                <input type="text" value={fullName} onChange={(e)=>setFullName(e.target.value)} required />
              </label>
              <label>
                Contact Number
                <input type="tel" value={contact} onChange={(e)=>setContact(e.target.value)} required pattern="[0-9]{10}" maxLength={10} />
              </label>
              <button type="submit" disabled={loading}>{loading ? 'Checking...' : 'Check'}</button>
            </form>
            {renderStatus()}
            <button className="modal-close" onClick={() => setShowStatus(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agrachetnamarathon2025" element={<RegistrationForm />} />
    </Routes>
  );
}

export default App;
