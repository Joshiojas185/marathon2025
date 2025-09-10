import { useState } from 'react';
import '../App.css';
import logo from './logo.png';

const constituencyOptions = [
  { value: 'Vidhyadhar nagar', hi: 'विद्याधर नगर', en: 'Vidhyadhar nagar' },
  { value: 'Jhotwara', hi: 'झोटवाड़ा', en: 'Jhotwara' },
  { value: 'Kishanpole', hi: 'किशनपोल', en: 'Kishanpole' },
  { value: 'Aamer', hi: 'आमेर', en: 'Amer' },
  { value: 'Bagru', hi: 'बागरू', en: 'Bagru' },
  { value: 'Sanganer', hi: 'सांगानेर', en: 'Sanganer' },
  { value: 'Malviya Nagar', hi: 'मालवीय नगर', en: 'Malviya Nagar' },
  { value: 'Adarsh nagar', hi: 'आदर्श नगर', en: 'Adarsh nagar' },
  { value: 'Hawa Mahal', hi: 'हवा महल', en: 'Hawa Mahal' },
  { value: 'Civil lines', hi: 'सिविल लाइन्स', en: 'Civil lines' }
];
const tshirtSizes = [
  { value: 'S', hi: 'छोटा (S)', en: 'Small (S)' },
  { value: 'M', hi: 'मध्यम (M)', en: 'Medium (M)' },
  { value: 'L', hi: 'बड़ा (L)', en: 'Large (L)' },
  { value: 'XL', hi: 'एक्स्ट्रा बड़ा (XL)', en: 'X-Large (XL)' },
  { value: 'XXL', hi: 'डबल एक्स्ट्रा बड़ा (XXL)', en: 'XX-Large (XXL)' },
];

const i18n = {
  hi: {
    title: 'अग्रचेतना मैराथॉन 2025',
    subtitle: 'अग्रचेतना मैराथॉन 21 अक्टूबर 2025 सुबह 6 :00  बजे जय क्लब से शुरू होकर अग्रवाल कॉलेज जाएगी ',
    fullName: 'पूरा नाम *',
    contact: 'संपर्क नंबर *',
    age : 'उम्र *',
    gender: 'लिंग *',
    male: 'पुरुष',
    female: 'महिला',
    other: 'अन्य',
    constituency: 'विधानसभा',
    gotra: 'गोत्र *',
    tshirt: 'टी-शर्ट साइज *',
    submit: 'रजिस्टर करें',
    thankYou: 'पंजीकरण करने के लिए धन्यवाद!',
    already: 'आप इस डिवाइस से पहले ही पंजीकरण कर चुके हैं।',
    select: 'चुनें'
  },
  en: {
    title: 'अग्रचेतना मैराथॉन 2025',
    subtitle: 'अग्रचेतना मैराथॉन 21 अक्टूबर 2025 सुबह 6 :00  बजे जय क्लब से शुरू होकर अग्रवाल कॉलेज जाएगी ',
    fullName: 'Full Name *',
    age : 'Age *',
    contact: 'Contact Number *',
    gender: 'Gender *',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    constituency: 'विधानसभा',
    gotra: 'Gotra *',
    tshirt: 'T-shirt size *',
    submit: 'Register',
    thankYou: 'Thank you for registering!',
    already: 'You have already registered from this device.',
    select: 'Select'
  }
};

export default function RegistrationForm() {
  const [lang, setLang] = useState('hi');
  const t = i18n[lang];

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    age : '',
    gender: '',
    constituency: '',
    gotra: '',
    tshirt: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [tickets, setTickets] = useState(() => {
    try {
      // Migrate older single-ticket storage to an array
      const single = window.localStorage.getItem('marathon_ticket');
      const list = window.localStorage.getItem('marathon_tickets');
      let parsedList = list ? JSON.parse(list) : [];
      if ((!list || parsedList.length === 0) && single) {
        const t = JSON.parse(single);
        parsedList = Array.isArray(t) ? t : [t];
        window.localStorage.setItem('marathon_tickets', JSON.stringify(parsedList));
        window.localStorage.removeItem('marathon_ticket');
      }
      return Array.isArray(parsedList) ? parsedList : [];
    } catch {
      return [];
    }
  });
  const [latestTicket, setLatestTicket] = useState(null);
  const [showTicket, setShowTicket] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (submitting) return;
    setSubmitting(true);
    e.preventDefault();
    setError('');
    try {
      const payload = {
        ...form,
        fullName: `${form.firstName} ${form.lastName}`.trim(),
      };
      delete payload.firstName;
      delete payload.lastName;
      const res = await fetch('https://codeup.in/dev/register-marathon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error && data.error.includes('maximum')) {
          setError(lang === 'hi' ? 'एक संपर्क नंबर से अधिकतम 2 पंजीकरण हो सकते हैं।' : 'Maximum 2 registrations allowed per contact number.');
        } else {
          throw new Error(data.error || 'Submission failed');
        }
        return;
      }
      setSubmitted(true);
      if (data.ticket) {
        setLatestTicket(data.ticket);
        setTickets((prev) => {
          const exists = prev.some((t) => String(t.id) === String(data.ticket.id));
          const updated = exists ? prev : [...prev, data.ticket];
          window.localStorage.setItem('marathon_tickets', JSON.stringify(updated));
          return updated;
        });
      } else {
        setLatestTicket(null);
      }
    } catch (err) {
      setError(lang === 'hi' ? 'पंजीकरण विफल हुआ। कृपया पुनः प्रयास करें।' : 'Registration failed. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="reg-form-container">
      <div className="reg-form-header">
        <img src={logo} alt="Logo" className="form-logo-img" />
        <h2>{t.title}</h2>
        <marquee>{t.subtitle}</marquee>
        <div className="lang-toggle">
          <button type="button" className={`lang-btn ${lang==='hi' ? 'selected' : ''}`} onClick={() => setLang('hi')}>
            हिन्दी
          </button>
          <button type="button" className={`lang-btn ${lang==='en' ? 'selected' : ''}`} onClick={() => setLang('en')}>
            English
          </button>
        </div>
        {tickets && tickets.length > 0 && (
          <button
            className="ticket-icon-btn"
            title="View Tickets"
            style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setShowTicket(true)}
          >
            <svg width="32" height="20" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="8" width="60" height="24" rx="8" fill="#1976d2" stroke="#fff" strokeWidth="2"/>
              <circle cx="10" cy="20" r="3" fill="#fff"/>
              <circle cx="54" cy="20" r="3" fill="#fff"/>
              <rect x="18" y="14" width="28" height="12" rx="4" fill="#fff"/>
              <rect x="18" y="14" width="28" height="12" rx="4" fill="#1976d2" fillOpacity="0.15"/>
            </svg>
          </button>
        )}
      </div>
      {showTicket && (
        <div className="modal-overlay" onClick={() => setShowTicket(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 460, padding: 16, overflow: 'visible' }}>
            {tickets && tickets.length > 0 ? (
              <div>
                <h3 style={{ color: '#1976d2', margin: '4px 0 12px' }}>🎟️ Your Tickets</h3>
                <div style={{ display: 'grid', gap: 12 }}>
                  {tickets.map((t) => (
                    <div key={t.id} style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e8f3ff 100%)', borderRadius: 14, boxShadow: '0 6px 20px rgba(25,118,210,0.12)', padding: 16, position: 'relative', overflow: 'hidden', border: '1px solid #d6e4ff' }}>
                      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 120, width: 1, borderLeft: '2px dashed #bbd2ff' }} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'center' }}>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: 12, color: '#5a7bb8', fontWeight: 700, letterSpacing: 1 }}>TICKET ID</div>
                          <div style={{ fontWeight: 800, fontSize: 22, color: '#0d47a1' }}>{formatTicketId(t.id)}</div>
                          <div style={{ marginTop: 6, fontWeight: 700, color: '#0d47a1' }}>{t.name}</div>
                          <div style={{ color: '#1e88e5', fontWeight: 600, marginTop: 4 }}>Contact: <span style={{ color: '#134c9c' }}>{t.contact}</span></div>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ color: '#134c9c', fontWeight: 600 }}>Constituency: <span style={{ color: '#0d47a1' }}>{t.constituency}</span></div>
                          <div style={{ color: '#134c9c', fontWeight: 600, marginTop: 4 }}>Gotra: <span style={{ color: '#0d47a1' }}>{t.gotra}</span></div>
                          <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            <button onClick={() => downloadTicket(t)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '0.55em 1.1em', fontWeight: 700, cursor: 'pointer' }}>Download</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="modal-close" onClick={() => setShowTicket(false)} style={{ marginTop: 12, width: '100%' }}>Close</button>
              </div>
            ) : (
              <div style={{ padding: 32, textAlign: 'center' }}>No ticket found.</div>
            )}
          </div>
        </div>
      )}
      {submitted ? (
        <div>
          {latestTicket && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
              <button
                type="button"
                onClick={() => downloadTicket(latestTicket)}
                title={lang === 'hi' ? 'टिकट डाउनलोड करें' : 'Download Ticket'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#1976d2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  padding: '0.6rem 1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(25,118,210,0.18)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                {lang === 'hi' ? 'टिकट डाउनलोड करें' : 'Download Ticket'}
              </button>
            </div>
          )}
          <div className="success-msg">{t.thankYou}</div>
        </div>
      ) : (
        <form className="reg-form" onSubmit={handleSubmit} autoComplete="off">
          
            <input type="text" name="firstName" placeholder={lang === 'hi' ? 'पहला नाम *' : 'First Name *'} value={form.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder={lang === 'hi' ? 'अंतिम नाम *' : 'Last Name *'} value={form.lastName} onChange={handleChange} required />
            <input type="text" name="gotra" value={form.gotra} onChange={handleChange} required placeholder={t.gotra} autoComplete="off" />
            <input type="tel" name="contact" placeholder={t.contact} value={form.contact} onChange={handleChange} required pattern="[6-9][0-9]{9}" maxLength={10} autoComplete="off" />
            <input type="tel" name="age" placeholder={t.age} value={form.age} onChange={handleChange} required pattern="[0-9]{2}" maxLength={2} autoComplete="off" />
          
            <div className="radio-label">
              {t.gender}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label><input type="radio" name="gender" value="Male" checked={form.gender === 'Male'} onChange={handleChange} required /> {t.male}</label>
              <label><input type="radio" name="gender" value="Female" checked={form.gender === 'Female'} onChange={handleChange} /> {t.female}</label>
            </div>
          
            <select name="constituency" value={form.constituency} onChange={handleChange} required>
              <option value={""} disabled hidden selected>{t.constituency}</option>
              {constituencyOptions.map((c) => (
                <option key={c.value} value={c.value}>{lang === 'hi' ? c.hi : c.en}</option>
              ))}
            </select>
          
            <select name="tshirt" value={form.tshirt} onChange={handleChange} required>
              <option value={""} disabled hidden selected>{t.tshirt}</option>
              {tshirtSizes.map((s) => (
                <option key={s.value} value={s.value}>{lang === 'hi' ? s.hi : s.en}</option>
              ))}
            </select>
          {error && <div className="error-msg">{error}</div>}
          <button disabled={submitting} type="submit">{t.submit}</button>
        </form>
      )}
    </div>
  );
}

function formatTicketId(id) {
  const str = String(id || '');
  return str.padStart(4, '0');
}

function downloadTicket(ticket) {
  const paddedId = formatTicketId(ticket.id);
  // Enhanced ticket SVG design
  const svg = `<svg width='640' height='280' xmlns='http://www.w3.org/2000/svg'>
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#1976d2'/>
        <stop offset='100%' stop-color='#42a5f5'/>
      </linearGradient>
      <filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'>
        <feDropShadow dx='0' dy='4' stdDeviation='6' flood-color='rgba(0,0,0,0.25)'/>
      </filter>
      <pattern id='dots' width='6' height='6' patternUnits='userSpaceOnUse'>
        <circle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.15)' />
      </pattern>
    </defs>
    <rect width='640' height='280' rx='28' fill='url(#bg)' filter='url(#shadow)' />
    <rect x='10' y='10' width='620' height='260' rx='22' fill='#ffffff' />
    <rect x='10' y='10' width='620' height='260' rx='22' fill='url(#dots)' />
    <circle cx='140' cy='140' r='10' fill='#e3f2fd' />
    <circle cx='500' cy='140' r='10' fill='#e3f2fd' />
    <line x1='140' y1='30' x2='140' y2='250' stroke='#bbdefb' stroke-width='3' stroke-dasharray='6 8' />
    <text x='90' y='64' text-anchor='middle' font-size='14' font-family='Montserrat,sans-serif' fill='#5a7bb8' font-weight='700' letter-spacing='2'>TICKET</text>
    <text x='90' y='92' text-anchor='middle' font-size='28' font-family='Montserrat,sans-serif' fill='#0d47a1' font-weight='800'>${paddedId}</text>
    <text x='180' y='80' font-size='20' font-family='Montserrat,sans-serif' fill='#0d47a1' font-weight='800'>${escapeXml(ticket.name)}</text>
    <text x='180' y='112' font-size='16' font-family='Montserrat,sans-serif' fill='#1e88e5' font-weight='600'>Contact: <tspan fill='#134c9c'>${escapeXml(ticket.contact)}</tspan></text>
    <text x='180' y='144' font-size='16' font-family='Montserrat,sans-serif' fill='#1e88e5' font-weight='600'>Constituency: <tspan fill='#134c9c'>${escapeXml(ticket.constituency)}</tspan></text>
    <text x='180' y='176' font-size='16' font-family='Montserrat,sans-serif' fill='#1e88e5' font-weight='600'>Gotra: <tspan fill='#134c9c'>${escapeXml(ticket.gotra)}</tspan></text>
    <text x='320' y='228' text-anchor='middle' font-size='14' font-family='Montserrat,sans-serif' fill='#5a7bb8' font-weight='700'>अग्रचेतना मैराथॉन 2025</text>
  </svg>`;
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const img = new window.Image();
  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 280;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    canvas.toBlob(function(blob) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `marathon_ticket_${paddedId}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };
  img.src = url;
}

function escapeXml(unsafe) {
  if (unsafe == null) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
